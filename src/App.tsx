import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import PlayGame from './pages/PlayGame';
import Leaderboard from './pages/Leaderboard';
import HowToPlay from './pages/HowToPlay';
import About from './pages/About';
import './styles/globals.css';

type Page = 'home' | 'play' | 'leaderboard' | 'howtoplay' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPlayClick={() => setCurrentPage('play')} />;
      case 'play':
        return <PlayGame />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'howtoplay':
        return <HowToPlay />;
      case 'about':
        return <About />;
      default:
        return <Home onPlayClick={() => setCurrentPage('play')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <div className="retro-grid-bg"></div>
      <Header />
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="relative z-10">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;