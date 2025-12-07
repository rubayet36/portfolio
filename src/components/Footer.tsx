import { Heart, Code } from 'lucide-react';
import { usePipeline } from '../context/PipelineContext';

export function Footer() {
  const { isCss } = usePipeline();
  const currentYear = new Date().getFullYear();

  // --- RAW HTML MODE ---
  if (!isCss) {
    return (
      <footer style={{ padding: '20px', borderTop: '2px solid black', marginTop: '50px' }}>
        <p>© {currentYear} Rubayet. All rights reserved.</p>
        <small>Built with React (Simulating HTML)</small>
      </footer>
    );
  }

  // --- STYLED MODE ---
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center gap-2 text-gray-300">
            <span>Crafted with</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>and</span>
            <Code size={16} className="text-blue-500" />
            <span>by Rubayet</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-gray-400">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors duration-200"
            >
              Back to Top
            </button>
            <span>|</span>
            <span>© {currentYear} All rights reserved</span>
          </div>

          <div className="text-xs text-gray-500">
            Built with React, TypeScript & Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}