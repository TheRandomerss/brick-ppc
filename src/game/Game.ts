import GameState from './GameState';
import { Ball, Paddle, Block, PowerUp } from './GameObject';
import SoundManager from './SoundManager';
import { saveScore } from '../utils/LocalStorage';

interface GameConfig {
  soundEnabled: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  onScoreUpdate: (score: number) => void;
  onLevelUpdate: (level: number) => void;
  onLivesUpdate: (lives: number) => void;
  onGameOver: () => void;
}

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private gameState: GameState;
  private soundManager: SoundManager;
  private config: GameConfig;
  
  private animationId: number = 0;
  private lastTime: number = 0;
  private isRunning: boolean = false;
  
  // Game objects
  private balls: Ball[] = [];
  private paddle: Paddle;
  private blocks: Block[] = [];
  private powerUps: PowerUp[] = [];
  
  // Input handling
  private keys: { [key: string]: boolean } = {};
  private mouseX: number = 0;
  private touchX: number = 0;

  constructor(canvas: HTMLCanvasElement, config: GameConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.config = config;
    this.gameState = new GameState(config.difficulty);
    this.soundManager = new SoundManager(config.soundEnabled);
    
    this.paddle = new Paddle(canvas.width / 2, canvas.height - 30);
    this.setupEventListeners();
    this.initializeLevel();
  }

  private setupEventListeners() {
    // Keyboard events
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'Space') {
        e.preventDefault();
        this.handleSpaceKey();
      }
      if (e.code === 'Escape') {
        e.preventDefault();
        this.reset();
      }
    });

    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Mouse events
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
    });

    this.canvas.addEventListener('click', () => {
      if (!this.isRunning || this.balls.length === 0) {
        this.launchBall();
      }
    });

    // Touch events
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      this.touchX = e.touches[0].clientX - rect.left;
    });

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (!this.isRunning || this.balls.length === 0) {
        this.launchBall();
      }
    });
  }

  private handleSpaceKey() {
    if (!this.isRunning) {
      this.launchBall();
    } else {
      this.pause();
    }
  }

  private initializeLevel() {
    this.blocks = [];
    const rows = 6;
    const cols = 10;
    const blockWidth = (this.canvas.width - 60) / cols;
    const blockHeight = 20;
    const colors = ['#FF1B8D', '#00F5FF', '#8B5CF6', '#F97316', '#EF4444'];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = 30 + col * blockWidth;
        const y = 60 + row * (blockHeight + 5);
        const color = colors[row % colors.length];
        const strength = Math.min(row + 1, 3);
        this.blocks.push(new Block(x, y, blockWidth - 2, blockHeight, color, strength));
      }
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.launchBall();
      this.gameLoop();
    }
  }

  pause() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      this.gameLoop();
    } else {
      cancelAnimationFrame(this.animationId);
    }
  }

  resume() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.gameLoop();
    }
  }

  reset() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationId);
    this.gameState.reset();
    this.balls = [];
    this.powerUps = [];
    this.paddle = new Paddle(this.canvas.width / 2, this.canvas.height - 30);
    this.initializeLevel();
    this.updateUI();
  }

  setSoundEnabled(enabled: boolean) {
    this.soundManager.setEnabled(enabled);
  }

  private launchBall() {
    if (this.balls.length === 0) {
      const ball = new Ball(
        this.paddle.x + this.paddle.width / 2,
        this.paddle.y - 10,
        this.gameState.getBallSpeed()
      );
      this.balls.push(ball);
    }
  }

  private gameLoop() {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    this.animationId = requestAnimationFrame(() => this.gameLoop());
  }

  private update(deltaTime: number) {
    this.handleInput();
    this.updateBalls(deltaTime);
    this.updatePowerUps(deltaTime);
    this.checkCollisions();
    this.cleanupObjects();
    this.checkGameState();
  }

  private handleInput() {
    let targetX = this.paddle.x;

    // Keyboard input
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
      targetX -= this.paddle.speed;
    }
    if (this.keys['ArrowRight'] || this.keys['KeyD']) {
      targetX += this.paddle.speed;
    }

    // Mouse input
    if (this.mouseX > 0) {
      targetX = this.mouseX - this.paddle.width / 2;
    }

    // Touch input
    if (this.touchX > 0) {
      targetX = this.touchX - this.paddle.width / 2;
    }

    // Clamp paddle position
    this.paddle.x = Math.max(0, Math.min(targetX, this.canvas.width - this.paddle.width));
  }

  private updateBalls(deltaTime: number) {
    this.balls.forEach(ball => {
      ball.update(deltaTime);
      
      // Wall collisions
      if (ball.x <= ball.radius || ball.x >= this.canvas.width - ball.radius) {
        ball.vx = -ball.vx;
        this.soundManager.playBounce();
      }
      if (ball.y <= ball.radius) {
        ball.vy = -ball.vy;
        this.soundManager.playBounce();
      }
    });
  }

  private updatePowerUps(deltaTime: number) {
    this.powerUps.forEach(powerUp => {
      powerUp.update(deltaTime);
    });
  }

  private checkCollisions() {
    // Ball-paddle collisions
    this.balls.forEach(ball => {
      if (this.checkBallPaddleCollision(ball, this.paddle)) {
        this.handleBallPaddleCollision(ball, this.paddle);
        this.soundManager.playPaddle();
      }
    });

    // Ball-block collisions
    this.balls.forEach(ball => {
      this.blocks.forEach((block, blockIndex) => {
        if (this.checkBallBlockCollision(ball, block)) {
          this.handleBallBlockCollision(ball, block);
          this.gameState.addScore(block.getScore());
          
          if (block.hit()) {
            this.blocks.splice(blockIndex, 1);
            this.soundManager.playBlockBreak();
            
            // Chance to spawn power-up
            if (Math.random() < 0.15) {
              this.spawnPowerUp(block.x + block.width / 2, block.y + block.height / 2);
            }
          } else {
            this.soundManager.playBlockHit();
          }
        }
      });
    });

    // Paddle-power-up collisions
    this.powerUps.forEach((powerUp, index) => {
      if (this.checkPaddlePowerUpCollision(this.paddle, powerUp)) {
        this.applyPowerUp(powerUp);
        this.powerUps.splice(index, 1);
        this.soundManager.playPowerUp();
      }
    });
  }

  private checkBallPaddleCollision(ball: Ball, paddle: Paddle): boolean {
    return ball.x + ball.radius > paddle.x &&
           ball.x - ball.radius < paddle.x + paddle.width &&
           ball.y + ball.radius > paddle.y &&
           ball.y - ball.radius < paddle.y + paddle.height &&
           ball.vy > 0;
  }

  private handleBallPaddleCollision(ball: Ball, paddle: Paddle) {
    const hitPos = (ball.x - paddle.x) / paddle.width;
    const angle = (hitPos - 0.5) * Math.PI / 3;
    const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
    
    ball.vx = Math.sin(angle) * speed;
    ball.vy = -Math.abs(Math.cos(angle) * speed);
    ball.y = paddle.y - ball.radius;
  }

  private checkBallBlockCollision(ball: Ball, block: Block): boolean {
    return ball.x + ball.radius > block.x &&
           ball.x - ball.radius < block.x + block.width &&
           ball.y + ball.radius > block.y &&
           ball.y - ball.radius < block.y + block.height;
  }

  private handleBallBlockCollision(ball: Ball, block: Block) {
    const ballCenterX = ball.x;
    const ballCenterY = ball.y;
    const blockCenterX = block.x + block.width / 2;
    const blockCenterY = block.y + block.height / 2;
    
    const dx = ballCenterX - blockCenterX;
    const dy = ballCenterY - blockCenterY;
    
    if (Math.abs(dx / block.width) > Math.abs(dy / block.height)) {
      ball.vx = -ball.vx;
    } else {
      ball.vy = -ball.vy;
    }
  }

  private checkPaddlePowerUpCollision(paddle: Paddle, powerUp: PowerUp): boolean {
    return powerUp.x + powerUp.width > paddle.x &&
           powerUp.x < paddle.x + paddle.width &&
           powerUp.y + powerUp.height > paddle.y &&
           powerUp.y < paddle.y + paddle.height;
  }

  private spawnPowerUp(x: number, y: number) {
    const types = ['wider', 'multiball', 'laser'];
    const type = types[Math.floor(Math.random() * types.length)];
    this.powerUps.push(new PowerUp(x, y, type));
  }

  private applyPowerUp(powerUp: PowerUp) {
    this.gameState.addScore(100);
    
    switch (powerUp.type) {
      case 'wider':
        this.paddle.width = Math.min(this.paddle.width * 1.5, 200);
        break;
      case 'multiball':
        if (this.balls.length === 1) {
          const originalBall = this.balls[0];
          for (let i = 0; i < 2; i++) {
            const newBall = new Ball(originalBall.x, originalBall.y, originalBall.speed);
            newBall.vx = originalBall.vx + (Math.random() - 0.5) * 2;
            newBall.vy = originalBall.vy;
            this.balls.push(newBall);
          }
        }
        break;
      case 'laser':
        // Laser functionality would be implemented here
        break;
    }
  }

  private cleanupObjects() {
    // Remove balls that fell off screen
    const ballsBefore = this.balls.length;
    this.balls = this.balls.filter(ball => ball.y < this.canvas.height + ball.radius);
    
    if (this.balls.length < ballsBefore) {
      this.gameState.loseLife();
      if (this.gameState.lives > 0 && this.balls.length === 0) {
        setTimeout(() => this.launchBall(), 1000);
      }
    }

    // Remove power-ups that fell off screen
    this.powerUps = this.powerUps.filter(powerUp => powerUp.y < this.canvas.height);
  }

  private checkGameState() {
    // Check for level completion
    if (this.blocks.length === 0) {
      this.gameState.nextLevel();
      this.gameState.addScore(500); // Level completion bonus
      this.initializeLevel();
      this.balls = [];
      setTimeout(() => this.launchBall(), 1000);
    }

    // Check for game over
    if (this.gameState.lives <= 0) {
      this.gameOver();
    }

    this.updateUI();
  }

  private updateUI() {
    this.config.onScoreUpdate(this.gameState.score);
    this.config.onLevelUpdate(this.gameState.level);
    this.config.onLivesUpdate(this.gameState.lives);
  }

  private gameOver() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationId);
    
    const playerName = prompt('Game Over! Enter your name for the leaderboard:') || 'Anonymous';
    saveScore({
      name: playerName,
      score: this.gameState.score,
      level: this.gameState.level,
      date: Date.now()
    });
    
    this.config.onGameOver();
  }

  private render() {
    // Clear canvas with gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render game objects
    this.renderBlocks();
    this.renderBalls();
    this.renderPaddle();
    this.renderPowerUps();
    
    if (!this.isRunning && this.balls.length === 0) {
      this.renderStartMessage();
    }
  }

  private renderBlocks() {
    this.blocks.forEach(block => {
      this.ctx.fillStyle = block.color;
      this.ctx.fillRect(block.x, block.y, block.width, block.height);
      
      // Add glow effect
      this.ctx.shadowColor = block.color;
      this.ctx.shadowBlur = 10;
      this.ctx.fillRect(block.x, block.y, block.width, block.height);
      this.ctx.shadowBlur = 0;
    });
  }

  private renderBalls() {
    this.balls.forEach(ball => {
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = '#00F5FF';
      this.ctx.fill();
      
      // Add glow effect
      this.ctx.shadowColor = '#00F5FF';
      this.ctx.shadowBlur = 15;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }

  private renderPaddle() {
    this.ctx.fillStyle = '#FF1B8D';
    this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    
    // Add glow effect
    this.ctx.shadowColor = '#FF1B8D';
    this.ctx.shadowBlur = 10;
    this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    this.ctx.shadowBlur = 0;
  }

  private renderPowerUps() {
    this.powerUps.forEach(powerUp => {
      this.ctx.fillStyle = powerUp.color;
      this.ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
      
      // Add glow effect
      this.ctx.shadowColor = powerUp.color;
      this.ctx.shadowBlur = 8;
      this.ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
      this.ctx.shadowBlur = 0;
    });
  }

  private renderStartMessage() {
    this.ctx.fillStyle = '#00F5FF';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Click or Press SPACE to Launch Ball', this.canvas.width / 2, this.canvas.height / 2);
  }
}

export default Game;