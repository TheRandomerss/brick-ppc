import React from 'react';
import { Play, Trophy, Zap } from 'lucide-react';
import { getTopScores } from '../utils/LocalStorage';

interface HomeProps {
  onPlayClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onPlayClick }) => {
  const topScores = getTopScores(3);

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <div className="neon-card max-w-4xl mx-auto p-8 md:p-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            WELCOME TO THE NEON DIMENSION
          </h2>
          <p className="text-xl md:text-2xl text-cyan-300 mb-8 leading-relaxed">
            Break through digital barriers in this retro-futuristic brick breaker experience. 
            Power-ups, neon graphics, and endless challenges await!
          </p>
          <button
            onClick={onPlayClick}
            className="cta-button text-2xl px-12 py-4 font-bold tracking-wide"
          >
            <Play className="w-8 h-8 mr-3" />
            START PLAYING
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="feature-card">
          <div className="icon-wrapper">
            <Zap className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold mb-4">POWER-UPS</h3>
          <p className="text-cyan-300">
            Collect amazing power-ups including multi-ball, laser paddle, and barrier expansion!
          </p>
        </div>

        <div className="feature-card">
          <div className="icon-wrapper">
            <Trophy className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold mb-4">LEADERBOARDS</h3>
          <p className="text-cyan-300">
            Compete for the highest scores and become a Zylox legend!
          </p>
        </div>

        <div className="feature-card">
          <div className="icon-wrapper">
            <Play className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold mb-4">MULTIPLE LEVELS</h3>
          <p className="text-cyan-300">
            Challenge yourself with increasing difficulty and unique level designs!
          </p>
        </div>
      </section>

      {topScores.length > 0 && (
        <section className="neon-card max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-pink-400">
            TOP SCORES
          </h3>
          <div className="space-y-4">
            {topScores.map((score, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg border border-cyan-500/30">
                <span className="text-xl font-semibold text-cyan-300">
                  #{index + 1} {score.name}
                </span>
                <span className="text-2xl font-bold text-pink-400">
                  {score.score.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;