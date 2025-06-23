class SoundManager {
  private enabled: boolean;
  private context: AudioContext | null = null;

  constructor(enabled: boolean) {
    this.enabled = enabled;
    if (this.enabled) {
      try {
        this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
        this.enabled = false;
      }
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.enabled || !this.context) return;

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + duration);
  }

  playBounce() {
    this.playTone(800, 0.1, 'square');
  }

  playPaddle() {
    this.playTone(400, 0.15, 'sawtooth');
  }

  playBlockHit() {
    this.playTone(600, 0.1, 'triangle');
  }

  playBlockBreak() {
    this.playTone(1000, 0.2, 'sawtooth');
  }

  playPowerUp() {
    // Play a rising tone
    if (!this.enabled || !this.context) return;

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.frequency.setValueAtTime(400, this.context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, this.context.currentTime + 0.3);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.15, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.3);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + 0.3);
  }

  playGameOver() {
    // Play a descending tone
    if (!this.enabled || !this.context) return;

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.frequency.setValueAtTime(800, this.context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, this.context.currentTime + 0.5);
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0.2, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.5);

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + 0.5);
  }
}

export default SoundManager;