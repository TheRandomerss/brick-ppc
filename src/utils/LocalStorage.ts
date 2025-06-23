export interface ScoreEntry {
  name: string;
  score: number;
  level: number;
  date: number;
}

const STORAGE_KEY = 'zylox-scores';

export function saveScore(entry: ScoreEntry): void {
  try {
    const scores = getScores();
    scores.push(entry);
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error('Failed to save score:', error);
  }
}

export function getScores(): ScoreEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load scores:', error);
    return [];
  }
}

export function getTopScores(limit: number = 10): ScoreEntry[] {
  return getScores().slice(0, limit);
}

export function clearScores(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear scores:', error);
  }
}

export function isHighScore(score: number): boolean {
  const scores = getScores();
  return scores.length < 10 || score > scores[scores.length - 1]?.score || 0;
}