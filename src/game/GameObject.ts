export class Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  speed: number;

  constructor(x: number, y: number, speed: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = 8;
    
    // Random initial direction
    const angle = (Math.random() - 0.5) * Math.PI / 4 - Math.PI / 2;
    this.vx = Math.sin(angle) * speed;
    this.vy = Math.cos(angle) * speed;
  }

  update(deltaTime: number) {
    this.x += this.vx * (deltaTime / 16);
    this.y += this.vy * (deltaTime / 16);
  }
}

export class Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;

  constructor(x: number, y: number) {
    this.x = x - 50; // Center the paddle
    this.y = y;
    this.width = 100;
    this.height = 15;
    this.speed = 8;
  }
}

export class Block {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  strength: number;
  maxStrength: number;

  constructor(x: number, y: number, width: number, height: number, color: string, strength: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.strength = strength;
    this.maxStrength = strength;
  }

  hit(): boolean {
    this.strength--;
    return this.strength <= 0;
  }

  getScore(): number {
    return (this.maxStrength - this.strength + 1) * 10;
  }
}

export class PowerUp {
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  color: string;
  vy: number;

  constructor(x: number, y: number, type: string) {
    this.x = x - 15;
    this.y = y;
    this.width = 30;
    this.height = 15;
    this.type = type;
    this.vy = 2;
    
    // Set color based on type
    switch (type) {
      case 'wider':
        this.color = '#00F5FF';
        break;
      case 'multiball':
        this.color = '#FF1B8D';
        break;
      case 'laser':
        this.color = '#F97316';
        break;
      default:
        this.color = '#8B5CF6';
    }
  }

  update(deltaTime: number) {
    this.y += this.vy * (deltaTime / 16);
  }
}