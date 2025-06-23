import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw } from 'lucide-react';
import Game from '../game/Game';

const PlayGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  useEffect(() => {
    if (canvasRef.current && !gameRef.current) {
      gameRef.current = new Game(canvasRef.current, {
        soundEnabled,
        difficulty,
        onScoreUpdate: setScore,
        onLevelUpdate: setLevel,
        onLivesUpdate: setLives,
        onGameOver: () => setIsGameRunning(false),
      });
    }
  }, [soundEnabled, difficulty]);

  const startGame = () => {
    if (gameRef.current) {
      gameRef.current.start();
      setIsGameRunning(true);
      setIsPaused(false);
    }
  };

  const pauseGame = () => {
    if (gameRef.current) {
      if (isPaused) {
        gameRef.current.resume();
      } else {
        gameRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const resetGame = () => {
    if (gameRef.current) {
      gameRef.current.reset();
      setIsGameRunning(false);
      setIsPaused(false);
      setScore(0);
      setLevel(1);
      setLives(3);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (gameRef.current) {
      gameRef.current.setSoundEnabled(!soundEnabled);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Game Controls */}
        <div className="neon-card mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{score.toLocaleString()}</div>
              <div className="text-sm text-cyan-300">SCORE</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{level}</div>
              <div className="text-sm text-cyan-300">LEVEL</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">{lives}</div>
              <div className="text-sm text-cyan-300">LIVES</div>
            </div>
            <div className="text-center">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                className="bg-gray-800 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded"
                disabled={isGameRunning}
              >
                <option value="easy">EASY</option>
                <option value="medium">MEDIUM</option>
                <option value="hard">HARD</option>
              </select>
              <div className="text-sm text-cyan-300 mt-1">DIFFICULTY</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {!isGameRunning ? (
              <button onClick={startGame} className="game-button">
                <Play className="w-5 h-5 mr-2" />
                START GAME
              </button>
            ) : (
              <button onClick={pauseGame} className="game-button">
                {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
                {isPaused ? 'RESUME' : 'PAUSE'}
              </button>
            )}
            
            <button onClick={resetGame} className="game-button">
              <RotateCcw className="w-5 h-5 mr-2" />
              RESET
            </button>
            
            <button onClick={toggleSound} className="game-button">
              {soundEnabled ? <Volume2 className="w-5 h-5 mr-2" /> : <VolumeX className="w-5 h-5 mr-2" />}
              SOUND
            </button>
          </div>
        </div>

        {/* Game Canvas */}
        <div className="game-container">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="game-canvas"
          />
        </div>

        {/* Instructions */}
        <div className="neon-card mt-8">
          <h3 className="text-2xl font-bold text-pink-400 mb-4 text-center">CONTROLS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">KEYBOARD</h4>
              <ul className="space-y-1 text-cyan-300">
                <li>← → Arrow Keys: Move paddle</li>
                <li>SPACE: Launch ball / Pause</li>
                <li>ESC: Reset game</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">TOUCH</h4>
              <ul className="space-y-1 text-cyan-300">
                <li>Tap/drag: Move paddle</li>
                <li>Tap canvas: Launch ball</li>
                <li>Use control buttons above</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayGame;