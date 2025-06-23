class GameState {
  score: number = 0;
  level: number = 1;
  lives: number = 3;
  difficulty: 'easy' | 'medium' | 'hard';

  constructor(difficulty: 'easy' | 'medium' | 'hard') {
    this.difficulty = difficulty;
    this.setInitialLives();
  }

  private setInitialLives() {
    switch (this.difficulty) {
      case 'easy':
        this.lives = 5;
        break;
      case 'medium':
        this.lives = 3;
        break;
      case 'hard':
        this.lives = 2;
        break;
    }
  }

  addScore(points: number) {
    this.score += points;
  }

  loseLife() {
    this.lives = Math.max(0, this.lives - 1);
  }

  nextLevel() {
    this.level++;
  }

  getBallSpeed(): number {
    const baseSpeed = 4;
    const levelMultiplier = 1 + (this.level - 1) * 0.1;
    const difficultyMultiplier = this.getDifficultyMultiplier();
    
    return baseSpeed * levelMultiplier * difficultyMultiplier;
  }

  private getDifficultyMultiplier(): number {
    switch (this.difficulty) {
      case 'easy':
        return 0.8;
      case 'medium':
        return 1.0;
      case 'hard':
        return 1.3;
      default:
        return 1.0;
    }
  }

  reset() {
    this.score = 0;
    this.level = 1;
    this.setInitialLives();
  }
}

export default GameState;