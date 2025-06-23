import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative z-20 py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="neon-logo text-6xl md:text-8xl font-bold tracking-wider mb-4">
          ZYLOX
        </h1>
        <div className="neon-underline mx-auto"></div>
        <p className="text-cyan-300 text-xl md:text-2xl mt-4 font-light tracking-wide">
          BREAK THE NEON BARRIERS
        </p>
      </div>
    </header>
  );
};

export default Header;