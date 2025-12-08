import { Award, Calendar, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePipeline } from '../context/PipelineContext';

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  link: string;
  color: string; // Added for the gradient effect
}

const achievements: Achievement[] = [
  {
    title: 'Bug Bounty Hunting With Burp Suite',
    issuer: 'Frontend Masters',
    date: '2023',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Advanced patterns including compound components, render props, and custom hooks.',
    link: 'https://udemy-certificate.s3.amazonaws.com/image/UC-58d1af6d-a486-4942-b3e4-ab97f1f9cb54.jpg?v=1692452806000',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'TypeScript Advanced Concepts',
    issuer: 'Udemy',
    date: '2025',
    image: 'https://images.pexels.com/photos/4974920/pexels-photo-4974920.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Deep dive into TypeScript type system, generics, and advanced type patterns.',
    link: '#',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'CERTIFICATE OF CYBER SECURITY',
    issuer: 'Vercel',
    date: '2023',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sql Injection, XSS, Zero Day Vulnerability, LFI Vulnerability mitigation strategies.',
    link: 'https://drive.google.com/file/d/19P4HQbaM4VmLxfaDWkU7LBRf9g8OkVAe/view',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Full-Stack Web Developer',
    issuer: 'W3C',
    date: '2025',
    image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Frontend + Backend development, APIs, Authentication, PostgreSQL, and 30+ deployed projects.',
    link: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-88278f6e-c3a2-457e-944c-9cd81bd3fa39.pdf',
    color: 'from-orange-500 to-red-500',
  }
];

export function Achievements() {
  const { isCss, isJs, isHighFi } = usePipeline();
  const [visibleAchievements, setVisibleAchievements] = useState<Set<number>>(new Set());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const achievementRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isJs) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = achievementRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleAchievements((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 }
    );

    achievementRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isJs]);

  // --- STAGE 0: RAW HTML MODE ---
  if (!isCss) {
    return (
      <section id="achievements" style={{ padding: '20px', borderBottom: '2px solid black' }}>
        <h2>Achievements & Certifications</h2>
        {achievements.map((item, index) => (
          <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
             <h3>{item.title}</h3>
             <p>Issued by: {item.issuer} ({item.date})</p>
             <p>{item.description}</p>
             <a href={item.link}>View Certificate</a>
          </div>
        ))}
      </section>
    );
  }

  // --- STAGE 1+: STYLED TIMELINE MODE ---
  return (
    <section
      id="achievements"
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 transition-colors duration-1000 relative overflow-hidden"
    >
      {/* High-Fi Background Effects */}
      {isHighFi && (
        <>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className={`text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-20 text-center transition-all duration-1000`}>
          My <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">Achievements</span>
        </h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          {isJs && (
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500" />
          )}

          {achievements.map((achievement, index) => (
            <div
              key={index}
              ref={(el) => (achievementRefs.current[index] = el)}
              className={`relative mb-16 transition-all duration-1000 ${
                (visibleAchievements.has(index) || !isJs)
                  ? 'translate-x-0 opacity-100' 
                  : index % 2 === 0 ? '-translate-x-20 opacity-0' : 'translate-x-20 opacity-0'
              }`}
              style={{ transitionDelay: isJs ? `${index * 200}ms` : '0ms' }}
              onMouseEnter={() => isJs && setActiveIndex(index)}
              onMouseLeave={() => isJs && setActiveIndex(null)}
            >
              <div className={`md:flex md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Spacer for layout balance */}
                <div className="md:w-1/2" />

                {/* Center Connector Dot */}
                {isJs && (
                  <div 
                    className="absolute left-8 md:left-1/2 w-6 h-6 -ml-3 rounded-full border-4 border-white dark:border-slate-900 bg-gradient-to-br shadow-lg transition-all duration-300 z-10"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${activeIndex === index ? 'rgb(59, 130, 246), rgb(147, 51, 234)' : 'rgb(148, 163, 184), rgb(100, 116, 139)'})`,
                      transform: activeIndex === index ? 'scale(1.5)' : 'scale(1)',
                    }}
                  />
                )}

                {/* Content Card */}
                <div className={`md:w-1/2 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                  <div 
                    className={`
                      group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-800
                      ${isJs ? 'hover:shadow-2xl hover:scale-105 transition-all duration-500' : ''}
                      ${activeIndex === index && isJs ? 'border-blue-500 dark:border-cyan-500' : ''}
                    `}
                  >
                    {/* Hover Glow Effect */}
                    {isHighFi && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                    )}

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className={`w-6 h-6 text-blue-600 dark:text-cyan-400 transition-transform duration-300 ${activeIndex === index && isJs ? 'scale-125 rotate-12' : ''}`} />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                          {achievement.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mb-4 text-sm">
                        <span className="font-semibold text-blue-600 dark:text-cyan-400">
                          {achievement.issuer}
                        </span>
                        <span className="text-slate-400">•</span>
                        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <Calendar size={14} />
                          <span>{achievement.date}</span>
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-sm">
                        {achievement.description}
                      </p>

                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`
                          inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-cyan-400
                          ${isJs ? 'hover:gap-3 transition-all duration-200' : ''}
                        `}
                      >
                        View Certificate
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}