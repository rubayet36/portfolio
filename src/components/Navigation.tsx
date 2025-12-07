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
    if (!isJs) return; // Links don't smooth scroll without JS
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
        isScrolled && isHighFi
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('home')}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
          >
            Rubayet
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-gray-700 dark:text-gray-300 font-medium ${isJs ? 'hover:text-blue-600 dark:hover:text-cyan-400 transition-colors' : ''}`}
              >
                {link.label}
              </button>
            ))}
            
            {/* Theme Toggle only works if JS is enabled */}
            <button
              onClick={isJs ? toggleTheme : undefined}
              className={`p-2 rounded-full bg-gray-200 dark:bg-gray-800 ${isJs ? 'hover:scale-110 transition-transform' : 'cursor-default'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             {/* Mobile Menu logic only works if JS is enabled */}
            <button
              onClick={() => isJs && setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && isJs && (
          <div className="md:hidden mt-4 pb-4 space-y-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}