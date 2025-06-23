import React from 'react';

type Page = 'home' | 'play' | 'leaderboard' | 'howtoplay' | 'about';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home' as Page, label: 'HOME' },
    { id: 'play' as Page, label: 'PLAY GAME' },
    { id: 'leaderboard' as Page, label: 'LEADERBOARD' },
    { id: 'howtoplay' as Page, label: 'HOW TO PLAY' },
    { id: 'about' as Page, label: 'ABOUT' },
  ];

  return (
    <nav className="sticky top-0 z-30 backdrop-blur-md bg-gray-900/80 border-b border-cyan-500/30">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center gap-2 md:gap-8 py-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`nav-button px-4 py-2 text-sm md:text-base font-semibold tracking-wide transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-pink-400 neon-text-glow'
                    : 'text-cyan-300 hover:text-pink-400'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;