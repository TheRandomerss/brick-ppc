import React from 'react';
import { Gamepad2, Code, Palette, Music } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            ABOUT ZYLOX
          </h2>
          <p className="text-xl text-cyan-300">
            The story behind the neon revolution
          </p>
        </div>

        <div className="space-y-12">
          {/* Game Story */}
          <section className="neon-card">
            <h3 className="text-3xl font-bold text-pink-400 mb-6">THE LEGEND</h3>
            <p className="text-lg text-cyan-300 leading-relaxed mb-6">
              In the year 2087, digital barriers began forming throughout cyberspace, threatening to fragment 
              the interconnected world we knew. You are a data warrior armed with the legendary Zylox paddle, 
              the only tool capable of breaking through these neon barriers and restoring digital harmony.
            </p>
            <p className="text-lg text-cyan-300 leading-relaxed">
              Each barrier you break weakens the digital corruption, but beware - the barriers fight back 
              with increasing intensity. Only the most skilled warriors can achieve legendary status and 
              save cyberspace from eternal fragmentation.
            </p>
          </section>

          {/* Development */}
          <section className="neon-card">
            <h3 className="text-3xl font-bold text-pink-400 mb-6 flex items-center">
              <Code className="w-8 h-8 mr-3" />
              DEVELOPMENT
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">TECHNOLOGY</h4>
                <ul className="space-y-2 text-cyan-300">
                  <li>• HTML5 Canvas for smooth 60fps gameplay</li>
                  <li>• Vanilla JavaScript for lightweight performance</li>
                  <li>• CSS3 animations for stunning visual effects</li>
                  <li>• Local Storage for persistent score tracking</li>
                  <li>• Responsive design for all devices</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">FEATURES</h4>
                <ul className="space-y-2 text-cyan-300">
                  <li>• Advanced collision detection system</li>
                  <li>• Dynamic difficulty scaling</li>
                  <li>• Comprehensive power-up system</li>
                  <li>• Touch and keyboard controls</li>
                  <li>• Retro synthwave aesthetic</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Design Philosophy */}
          <section className="neon-card">
            <h3 className="text-3xl font-bold text-pink-400 mb-6 flex items-center">
              <Palette className="w-8 h-8 mr-3" />
              DESIGN PHILOSOPHY
            </h3>
            <p className="text-lg text-cyan-300 leading-relaxed mb-6">
              Zylox draws inspiration from the golden age of arcade gaming combined with modern synthwave 
              aesthetics. Every visual element is crafted to transport players into a retro-futuristic 
              dimension where neon lights pulse with digital energy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mx-auto mb-4"></div>
                <h4 className="text-lg font-bold text-cyan-400">NEON BLUES</h4>
                <p className="text-cyan-300 text-sm">Cool, calming energy that guides the player's focus</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg mx-auto mb-4"></div>
                <h4 className="text-lg font-bold text-pink-400">ELECTRIC PINKS</h4>
                <p className="text-cyan-300 text-sm">High-energy accents that create excitement and urgency</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg mx-auto mb-4"></div>
                <h4 className="text-lg font-bold text-purple-400">DEEP PURPLES</h4>
                <p className="text-cyan-300 text-sm">Mysterious depths that add sophistication and mystery</p>
              </div>
            </div>
          </section>

          {/* Credits */}
          <section className="neon-card">
            <h3 className="text-3xl font-bold text-pink-400 mb-6">CREDITS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">DEVELOPMENT TEAM</h4>
                <ul className="space-y-2 text-cyan-300">
                  <li>• <strong>Game Design:</strong> Zylox Studios</li>
                  <li>• <strong>Programming:</strong> Digital Architects</li>
                  <li>• <strong>Visual Design:</strong> Neon Dreamers</li>
                  <li>• <strong>Sound Design:</strong> Synthwave Masters</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">SPECIAL THANKS</h4>
                <ul className="space-y-2 text-cyan-300">
                  <li>• The retro gaming community</li>
                  <li>• Synthwave music producers</li>
                  <li>• Beta testers and early adopters</li>
                  <li>• Everyone who believes in the power of neon</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Version Info */}
          <section className="neon-card text-center">
            <h3 className="text-2xl font-bold text-pink-400 mb-4">VERSION INFORMATION</h3>
            <p className="text-cyan-300 mb-2">Zylox Version 1.0.0</p>
            <p className="text-cyan-300 mb-2">Released: 2025</p>
            <p className="text-cyan-300">Built with passion for retro gaming</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;