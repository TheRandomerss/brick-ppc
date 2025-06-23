import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-20 mt-16 py-8 border-t border-cyan-500/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-pink-400 mb-4">ZYLOX</h3>
            <p className="text-cyan-300 text-sm">
              The ultimate retro brick breaker experience. Break through neon barriers and achieve legendary scores.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">CONTACT</h4>
            <p className="text-cyan-300 text-sm mb-2">support@zylox.game</p>
            <p className="text-cyan-300 text-sm">© 2025 Zylox Games</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">FOLLOW US</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="social-icon">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="social-icon">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="social-icon">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;