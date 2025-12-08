import { useEffect, useRef, useState } from 'react';
import { Code2, Sparkles, Zap } from 'lucide-react';
import { usePipeline } from '../context/PipelineContext';

export function About() {
  const { isCss, isJs, isHighFi } = usePipeline();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run observer if JS is enabled
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
    {
      icon: Code2,
      title: '5+ Years',
      description: 'Building modern web applications',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Sparkles,
      title: 'Creative',
      description: 'Design-focused development approach',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimized for speed and efficiency',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const coreValues = ['Clean Code', 'User-Centric Design', 'Continuous Learning', 'Collaborative Spirit'];

  // --- STAGE 0: RAW HTML MODE ---
  if (!isCss) {
    return (
      <section id="about" style={{ padding: '20px', borderBottom: '2px solid black' }}>
        <h2>About Me</h2>
        <p>
          I'm a passionate Frontend Engineer with a keen eye for detail and a love for creating seamless user experiences.
        </p>
        
        <h3>Core Values</h3>
        <ul>
          {coreValues.map(val => <li key={val}>{val}</li>)}
        </ul>

        <h3>Highlights</h3>
        <ul>
          {highlights.map(item => (
            <li key={item.title}><strong>{item.title}</strong>: {item.description}</li>
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
      className="min-h-screen flex items-center py-20 bg-white dark:bg-slate-950 transition-colors duration-700 relative overflow-hidden"
    >
      {/* High-Fi Mode: Background Blobs */}
      {isHighFi && (
        <>
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Container Animation */}
          <div
            className={`transform transition-all duration-1000 ${
              (isVisible || !isJs) ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-12 text-slate-900 dark:text-white">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Text Content */}
              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  I'm a passionate Frontend Engineer with a keen eye for detail and a love for creating
                  seamless user experiences. My journey in web development started with a curiosity
                  about how things work on the web, and it has evolved into a career focused on
                  building innovative, accessible, and performant applications.
                </p>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  I specialize in modern JavaScript frameworks, responsive design, and interactive
                  animations that bring websites to life. Every project is an opportunity to push
                  the boundaries of what's possible on the web.
                </p>
              </div>

              {/* Core Values Card */}
              <div className="relative group">
                {isHighFi && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                )}
                <div className="relative h-full bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                  <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Core Values</h3>
                  <ul className="space-y-4">
                    {coreValues.map((value, index) => (
                      <li
                        key={value}
                        className={`flex items-center gap-3 text-slate-700 dark:text-slate-300 transition-all duration-500`}
                        // Manual Stagger Logic using CSS variables or inline styles
                        style={{
                          transform: (isVisible || !isJs) ? 'translateX(0)' : 'translateX(20px)',
                          opacity: (isVisible || !isJs) ? 1 : 0,
                          transitionDelay: `${index * 100}ms`
                        }}
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-transparent transition-all duration-500 hover:scale-105"
                    style={{
                      transform: (isVisible || !isJs) ? 'translateY(0)' : 'translateY(40px)',
                      opacity: (isVisible || !isJs) ? 1 : 0,
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    {isJs && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    )}
                    <div className="relative">
                      <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}