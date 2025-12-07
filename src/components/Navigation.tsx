import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePipeline } from '../context/PipelineContext';
import { useState, useEffect } from 'react';

export function Navigation() {
  const { isDark, toggleTheme } = useTheme();
  const { isCss, isJs, isHighFi } = usePipeline();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isJs) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isJs]);

  const scrollToSection = (id: string) => {
    if (!isJs) return; 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Projects', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' }
  ];

  // --- RAW HTML MODE ---
  if (!isCss) {
    return (
      <nav style={{ padding: '10px', borderBottom: '1px solid black' }}>
        <strong>Rubayet's Portfolio</strong>
        <br />
        {navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`} style={{ marginRight: '10px', color: 'blue', textDecoration: 'underline' }}>
            {link.label}
          </a>
        ))}
      </nav>
    );
  }

  // --- STYLED MODE ---
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        // LOGIC: If High-Fi, always apply Glass Effect. If Scrolled (in CSS/JS mode), apply solid/glass background.
        isHighFi
          ? 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-b border-white/10 dark:border-gray-800/10 shadow-sm'
          : isScrolled
            ? 'bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm'
            : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Rubayet
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors ${
                  isHighFi 
                    ? 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            <button
              onClick={isJs ? toggleTheme : undefined}
              className={`p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800 ${isJs ? 'hover:scale-110 transition-transform' : 'cursor-default'}`}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
            </button>
          </div>

          {/* MOBILE MENU CONTROLS */}
          <div className="md:hidden flex items-center gap-4">
             {/* 1. MOBILE THEME TOGGLE (Added) */}
             <button
              onClick={isJs ? toggleTheme : undefined}
              className={`p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 ${isJs ? 'active:scale-95 transition-transform' : ''}`}
            >
              {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
            </button>

             {/* 2. MOBILE HAMBURGER MENU */}
            <button
              onClick={() => isJs && setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-800 dark:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* MOBILE DROPDOWN */}
        {isMobileMenuOpen && isJs && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 p-4 shadow-xl">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}