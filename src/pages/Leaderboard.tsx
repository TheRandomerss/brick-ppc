import React, { useState } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { getTopScores, clearScores } from '../utils/LocalStorage';

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState(getTopScores(10));

  const handleClearScores = () => {
    if (confirm('Are you sure you want to clear all scores?')) {
      clearScores();
      setScores([]);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-300" />;
      case 3:
        return <Award className="w-8 h-8 text-yellow-600" />;
      default:
        return <span className="w-8 h-8 flex items-center justify-center text-2xl font-bold text-cyan-400">#{rank}</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            HALL OF FAME
          </h2>
          <p className="text-xl text-cyan-300">
            The greatest Zylox warriors who broke through the neon barriers
          </p>
        </div>

        <div className="neon-card">
          {scores.length === 0 ? (
            <div className="text-center py-16">
              <Trophy className="w-24 h-24 text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-400 mb-4">NO SCORES YET</h3>
              <p className="text-cyan-300">Be the first to make your mark on the leaderboard!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {scores.map((score, index) => {
                  const rank = index + 1;
                  return (
                    <div
                      key={index}
                      className={`leaderboard-entry ${rank <= 3 ? 'top-three' : ''}`}
                    >
                      <div className="flex items-center">
                        {getRankIcon(rank)}
                        <div className="ml-4 flex-1">
                          <div className="font-bold text-xl text-cyan-300">{score.name}</div>
                          <div className="text-sm text-gray-400">
                            Level {score.level} • {new Date(score.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-pink-400">
                          {score.score.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <button
                  onClick={handleClearScores}
                  className="text-red-400 hover:text-red-300 transition-colors duration-300 underline"
                >
                  Clear All Scores
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;