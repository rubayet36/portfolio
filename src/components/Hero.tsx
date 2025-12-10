import { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight, Mail } from 'lucide-react';
import { usePipeline } from '../context/PipelineContext';

export function Hero() {
  const { isCss, isJs, isHighFi } = usePipeline();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only trigger entrance animations if JS is enabled
    if (isJs) setIsVisible(true);
  }, [isJs]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only run parallax math in High-Fi mode to save performance otherwise
    if (!isHighFi) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  const scrollToSection = (id: string) => {
    if (!isJs) return;
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // --- STAGE 0: RAW HTML MODE ---
  if (!isCss) {
    return (
      <section id="home" style={{ padding: '20px', fontFamily: 'Times New Roman' }}>
        <div style={{ border: '1px solid black', padding: '10px', display: 'inline-block', marginBottom: '20px' }}>
          Available for freelance work
        </div>
        <h1>Hello, I'm Rubayet Khan</h1>
        <h2>Front-End Engineer</h2>
        <p>I build modern, fast, elegant web apps with React, TypeScript, and AI.</p>
        <button onClick={() => alert("Enable JS to scroll")}>View My Work</button>
        <button onClick={() => alert("Enable JS to scroll")}>Get In Touch</button>
        
      </section>
    );
  }

  // --- STAGE 1+: STYLED MODE (The New Design) ---
  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 transition-colors duration-1000"
      onMouseMove={handleMouseMove}
    >
      {/* Background Particles (Only in High-Fi Mode) */}
      {isHighFi && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 dark:bg-cyan-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <div
          className="text-center space-y-8 transition-all duration-700"
          style={{
            // Apply Parallax only if High-Fi is on
            transform: isHighFi ? `translate(${mousePosition.x}px, ${mousePosition.y}px)` : 'none',
            // If JS is off, opacity is 1 by default (no fade in)
            opacity: (isVisible || !isJs) ? 1 : 0, 
          }}
        >
          <div className="space-y-2">
            <h2
              className={`text-xl md:text-2xl font-light text-slate-600 dark:text-slate-400 tracking-wide transition-all duration-1000 delay-200 ${
                (isVisible || !isJs) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Hello, I'm
            </h2>
            
            <h1
              className={`text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 bg-clip-text text-transparent transition-all duration-1000 delay-300 ${
                (isVisible || !isJs) ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
              }`}
            >
              Rubayet Khan
            </h1>
          </div>

          <p
            className={`text-2xl md:text-4xl font-light text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              (isVisible || !isJs) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">Frontend</span>{' '}
            <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">Engineer</span>{' '}
            <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">crafting</span>{' '}
            <span className="inline-block hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent font-semibold cursor-default">immersive</span>{' '}
            <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">web</span>{' '}
            <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">experiences</span>
          </p>

          <div
            className={`flex flex-wrap gap-4 justify-center transition-all duration-1000 delay-700 ${
              (isVisible || !isJs) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <button
              onClick={() => scrollToSection('projects')}
              className={`group px-8 py-4 bg-blue-600 dark:bg-cyan-500 text-white rounded-full font-semibold relative overflow-hidden transition-all duration-300 ${
                isJs ? 'hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-cyan-500/50' : ''
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work <ArrowRight size={20} />
              </span>
              {isJs && <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-blue-600 dark:to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-4 border-2 border-blue-600 dark:border-cyan-500 text-blue-600 dark:text-cyan-500 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 ${
                isJs ? 'hover:scale-110 hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-900 hover:shadow-2xl' : ''
              }`}
            >
              <Mail size={20} />
              Get In Touch
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all duration-1000 delay-1000 ${
            isJs ? 'animate-bounce' : ''
          } ${
            (isVisible || !isJs) ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ChevronDown size={48} />
        </button>
      </div>
    </section>
  );
}