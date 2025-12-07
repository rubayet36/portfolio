import { Download, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePipeline } from '../context/PipelineContext';
import { DotGrid } from './DotGrid';
import { ShapeBlur } from './ShapeBlur';
import TextPressure from './TextPressure';
import GradientText from './GradientText'; // <--- Import the new component

export function Hero() {
  const { isCss, isJs, isHighFi } = usePipeline();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isJs) setIsVisible(true);
  }, [isJs]);

  const scrollToProjects = () => {
    if (!isJs) return;
    const element = document.getElementById('projects');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // --- RAW HTML MODE ---
  if (!isCss) {
    return (
      <section id="home" style={{ padding: '20px', fontFamily: 'Times New Roman' }}>
        <div style={{ border: '1px solid black', padding: '10px', display: 'inline-block', marginBottom: '20px' }}>
          Available for freelance work
        </div>
        <h1>Hi, I'm</h1>
        <h2>Front-End Engineer</h2>
        <p>I build modern, fast, elegant web apps with React, TypeScript, and AI.</p>
        <button onClick={() => alert("Enable JS to scroll")}>View Projects</button>
      </section>
    );
  }

  // --- STYLED MODE ---
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {isHighFi && <DotGrid className="opacity-100" />}
      {isHighFi && <ShapeBlur />}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center pointer-events-none">
        
        <div
          className={`pointer-events-auto transition-all duration-1000 ${
            (isVisible || !isJs) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Status Badge */}
          <div className="inline-block mb-6 px-6 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Available for freelance work
            </span>
          </div>

          <div className="mb-6 leading-tight">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-4 ${isHighFi ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              Hi, I'm
            </h1>
            
            <div className="h-24 md:h-32 w-full max-w-6xl mx-auto relative z-20">
              {isJs ? (
                <TextPressure 
                  text="Front-End Engineer" 
                  flex={true} 
                  alpha={false} 
                  stroke={false} 
                  width={true} 
                  weight={true} 
                  italic={true} 
                  textColor={isHighFi ? "#22d3ee" : "#2563eb"} 
                  minFontSize={36}
                />
              ) : (
                <span className="block text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  Front-End Engineer
                </span>
              )}
            </div>
          </div>

          {/* REPLACED STATIC PARAGRAPH WITH GRADIENT TEXT */}
          <div className="mb-12 max-w-3xl mx-auto">
             {/* Only animate if JS is enabled, otherwise show static text */}
            {isJs ? (
              <GradientText
                colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']} // Teal/Blue gradient
                animationSpeed={6}
                showBorder={false}
                className="text-xl md:text-2xl"
              >
                I build modern, fast, elegant web apps with React, TypeScript, and AI.
              </GradientText>
            ) : (
              <p className={`text-xl md:text-2xl leading-relaxed ${isHighFi ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'}`}>
                I build modern, fast, elegant web apps with React, TypeScript, and AI.
              </p>
            )}
          </div>

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
                group px-8 py-4 backdrop-blur-sm rounded-2xl font-semibold shadow-xl border flex items-center gap-3
                ${isHighFi 
                   ? 'bg-gray-800/80 text-white border-gray-700/50' 
                   : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border-gray-200/50 dark:border-gray-700/50'}
                ${isJs ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : ''}
              `}
            >
              Download Resume
              <Download size={20} className={isHighFi ? "group-hover:translate-y-1 transition-transform" : ""} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}