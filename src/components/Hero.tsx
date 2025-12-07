import { Download, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePipeline } from '../context/PipelineContext';
import { motion } from 'framer-motion';

export function Hero() {
  const { isCss, isJs, isHighFi } = usePipeline();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only animate on mount if JS is enabled
    if (isJs) setIsVisible(true);
  }, [isJs]);

  const scrollToProjects = () => {
    if (!isJs) return; // JS Disable: Button does nothing
    const element = document.getElementById('projects');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // --- STAGE 0: RAW HTML VIEW ---
  if (!isCss) {
    return (
      <section id="home" style={{ padding: '20px', fontFamily: 'Times New Roman' }}>
        <div style={{ border: '1px solid black', padding: '10px', display: 'inline-block', marginBottom: '20px' }}>
          Available for freelance work
        </div>
        <h1>Hi, I'm Rubayet - Front-End Engineer</h1>
        <p>I build modern, fast, elegant web apps with React, TypeScript, and AI.</p>
        <br />
        <button onClick={() => alert("Enable JS to scroll")}>View Projects (Button)</button>
        <br /><br />
        <a href="/resume.pdf">Download Resume (Link)</a>
        <hr style={{ marginTop: '50px' }} />
        <small>Scroll to explore</small>
      </section>
    );
  }

  // --- STAGE 1+: STYLED VIEW ---
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* High-Fi: Background Blobs */}
      {isHighFi && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-3xl" />
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }} className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-300/30 dark:bg-cyan-600/20 rounded-full blur-3xl" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <div
          className={`transition-all duration-1000 ${
            (isVisible || !isJs) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-6 px-6 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Available for freelance work
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-gray-900 dark:text-white">Hi, I'm Rubayet</span>
            <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Front-End Engineer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            I build modern, fast, elegant web apps with React, TypeScript, and AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={scrollToProjects}
              className={`
                group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-semibold shadow-xl flex items-center gap-3
                ${isJs ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : 'cursor-not-allowed'}
              `}
            >
              View Projects
              <ArrowDown size={20} className={isHighFi ? "group-hover:translate-y-1 transition-transform" : ""} />
            </button>

            <a
              href="/resume.pdf"
              download
              className={`
                group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white rounded-2xl font-semibold shadow-xl border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-3
                ${isJs ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : ''}
              `}
            >
              Download Resume
              <Download size={20} className={isHighFi ? "group-hover:translate-y-1 transition-transform" : ""} />
            </a>
          </div>
        </div>

        {isHighFi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-24"
          >
            <div className="inline-flex items-center gap-3 text-gray-500 dark:text-gray-400">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
              <span className="text-sm font-medium">Scroll to explore</span>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}