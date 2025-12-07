import { Code2, Sparkles, Heart, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePipeline } from '../context/PipelineContext';

export function About() {
  // 1. Hook into the pipeline context
  const { isCss, isJs, isHighFi } = usePipeline();
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 2. Only run animations if JS is enabled
    if (!isJs) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isJs]);

  const highlights = [
    { icon: Code2, text: 'Clean, maintainable code', color: 'from-blue-500 to-cyan-500' },
    { icon: Sparkles, text: 'Smooth animations', color: 'from-cyan-500 to-teal-500' },
    { icon: Heart, text: 'User-centered design', color: 'from-teal-500 to-green-500' },
    { icon: Zap, text: 'High performance', color: 'from-green-500 to-emerald-500' }
  ];

  // --- STAGE 0: RAW HTML MODE ---
  // If CSS is NOT enabled, return this raw structure
  if (!isCss) {
    return (
      <section id="about" style={{ padding: '20px', borderBottom: '2px solid black' }}>
        <h2>About Me</h2>
        {/* Simple image without styling */}
        <img
          src="https://i.ibb.co.com/Kx5Jzfgp/DSC-8043-2-NEF.jpg"
          alt="Profile"
          width="200"
          style={{ display: 'block', margin: '20px 0' }}
        />
        <div style={{ marginBottom: '20px' }}>
          <strong>2+ Years Experience</strong>
        </div>
        
        <p>
          Front-End Engineer obsessed with clean UI, smooth animations, and building products people love.
          Skilled in React, Next.js, TypeScript, Tailwind, and design systems.
        </p>
        <p>
          I love creating interactive experiences and AI-enhanced web apps that push the boundaries
          of what's possible on the web. Every project is an opportunity to craft something beautiful and functional.
        </p>
        
        <h3>Highlights</h3>
        <ul>
          {highlights.map((item, index) => (
            <li key={index}>
              {item.text}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  // --- STAGE 1+: STYLED MODE ---
  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* High-Fi: Ambient Background Blobs */}
      {isHighFi && (
        <>
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-cyan-300/20 dark:bg-cyan-600/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Column */}
          <div
            className={`transition-all duration-1000 ${
              // If JS is off, show immediately. If JS is on, wait for observer.
              (isVisible || !isJs) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative">
              {isHighFi && <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl blur-2xl opacity-20" />}
              
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-2 shadow-2xl">
                <img
                  src="https://i.ibb.co.com/Kx5Jzfgp/DSC-8043-2-NEF.jpg"
                  alt="Profile"
                  className="w-full h-auto rounded-2xl object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white text-4xl font-bold">5+</span>
              </div>
              <div className="absolute -top-6 -left-6 px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div
            className={`transition-all duration-1000 delay-300 ${
               // If JS is off, show immediately. If JS is on, wait for observer.
              (isVisible || !isJs) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              About <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Me</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Front-End Engineer obsessed with clean UI, smooth animations, and building products people love.
                Skilled in <span className="font-semibold text-gray-900 dark:text-white">React, Next.js, TypeScript, Tailwind</span>, and design systems.
              </p>
              <p>
                I love creating interactive experiences and AI-enhanced web apps that push the boundaries
                of what's possible on the web. Every project is an opportunity to craft something beautiful and functional.
              </p>
              <p>
                When I'm not coding, I'm exploring the latest web technologies, contributing to open-source projects,
                or mentoring aspiring developers in the community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-12">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`
                    group p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50
                    ${isJs ? 'hover:shadow-xl hover:scale-105 transition-all duration-300' : ''}
                  `}
                >
                  <div className={`
                    w-12 h-12 mb-4 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center 
                    ${isJs ? 'group-hover:scale-110 transition-transform duration-300' : ''}
                  `}>
                    <item.icon className="text-white" size={24} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}