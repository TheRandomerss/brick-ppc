import React from 'react';
import { Target, Zap, Shield, Crosshair } from 'lucide-react';

const HowToPlay: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            HOW TO PLAY
          </h2>
          <p className="text-xl text-cyan-300">
            Master the art of neon barrier destruction
          </p>
        </div>

        <div className="space-y-12">
          {/* Basic Gameplay */}
          <section className="neon-card">
            <h3 className="text-3xl font-bold text-pink-400 mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3" />
              BASIC GAMEPLAY
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">OBJECTIVE</h4>
                <ul className="space-y-2 text-cyan-300">
                  <li>• Break all the neon blocks to advance to the next level</li>
                  <li>• Keep the ball in play using your paddle</li>
                  <li>• Achieve the highest score possible</li>
                  <li>• Survive through all levels with your limited lives</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">CONTROLS</h4>
                <ul className="space-y-2 text-cyan-300">
                  <li>• <strong>Arrow Keys:</strong> Move paddle left/right</li>
                  <li>• <strong>Spacebar:</strong> Launch ball or pause game</li>
                  <li>• <strong>Mouse/Touch:</strong> Tap and drag to move paddle</li>
                  <li>• <strong>ESC:</strong> Reset the current game</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Power-ups */}
          <section className="neon-card">
            <h3 className="text-3xl font-bold text-pink-400 mb-6 flex items-center">
              <Zap className="w-8 h-8 mr-3" />
              POWER-UPS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="power-up-card">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">WIDER PADDLE</h4>
                <p className="text-cyan-300 text-sm">Expands your paddle size, making it easier to keep the ball in play.</p>
              </div>
              <div className="power-up-card">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">MULTI-BALL</h4>
                <p className="text-cyan-300 text-sm">Splits the ball into multiple balls, increasing your breaking power.</p>
              </div>
              <div className="power-up-card">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Crosshair className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-cyan-400 mb-2">LASER PADDLE</h4>
                <p className="text-cyan-300 text-sm">Equips your paddle with lasers to shoot and destroy blocks directly.</p>
              </div>
            </div>
          </section>

          {/* Difficulty Levels */}
          <section className="neon-card">
            <h3 className="text-3xl font-bold text-pink-400 mb-6">DIFFICULTY LEVELS</h3>
            <div className="space-y-4">
              <div className="difficulty-card easy">
                <h4 className="text-xl font-bold text-green-400">EASY MODE</h4>
                <p className="text-cyan-300">Slower ball speed, more lives, and frequent power-ups. Perfect for beginners.</p>
              </div>
              <div className="difficulty-card medium">
                <h4 className="text-xl font-bold text-yellow-400">MEDIUM MODE</h4>
                <p className="text-cyan-300">Balanced gameplay with moderate speed and standard power-up frequency.</p>
              </div>
              <div className="difficulty-card hard">
                <h4 className="text-xl font-bold text-red-400">HARD MODE</h4>
                <p className="text-cyan-300">Maximum challenge with fast ball speed, fewer lives, and rare power-ups.</p>
              </div>
            </div>
          </section>

          {/* Scoring */}
          <section className="neon-card">
            <h3 className="text-3xl font-bold text-pink-400 mb-6">SCORING SYSTEM</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">BLOCK VALUES</h4>
                <ul className="space-y-2 text-cyan-300">
                  <li>• <span className="text-yellow-400">Yellow Blocks:</span> 10 points</li>
                  <li>• <span className="text-orange-400">Orange Blocks:</span> 20 points</li>
                  <li>• <span className="text-red-400">Red Blocks:</span> 30 points</li>
                  <li>• <span className="text-purple-400">Purple Blocks:</span> 50 points</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">BONUS POINTS</h4>
                <ul className="space-y-2 text-cyan-300">
                  <li>• Level completion: 500 points</li>
                  <li>• Power-up collection: 100 points</li>
                  <li>• Multi-ball destruction: 2x multiplier</li>
                  <li>• Speed bonus: Up to 200 points</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="neon-card">
            <h3 className="text-3xl font-bold text-pink-400 mb-6">PRO TIPS</h3>
            <ul className="space-y-3 text-cyan-300">
              <li>• Aim for the corners and edges of blocks to create better ball angles</li>
              <li>• Use the sides of your paddle to control ball direction</li>
              <li>• Prioritize collecting power-ups, especially in higher levels</li>
              <li>• Save multi-ball power-ups for levels with many blocks</li>
              <li>• Watch the ball's trajectory and position your paddle early</li>
              <li>• Don't panic when the ball speeds up - stay focused!</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;