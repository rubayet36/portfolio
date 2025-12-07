import { Award, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePipeline } from '../context/PipelineContext';

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  link: string;
}

const achievements: Achievement[] = [
  {
    title: 'Bug Bounty Hunting With Burp Suite',
    issuer: 'Frontend Masters',
    date: '2024',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Advanced patterns including compound components, render props, and custom hooks',
    link: 'https://udemy-certificate.s3.amazonaws.com/image/UC-58d1af6d-a486-4942-b3e4-ab97f1f9cb54.jpg?v=1692452806000'
  },
  {
    title: 'TypeScript Advanced Concepts',
    issuer: 'Udemy',
    date: '2024',
    image: 'https://images.pexels.com/photos/4974920/pexels-photo-4974920.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Deep dive into TypeScript type system, generics, and advanced type patterns',
    link: '#'
  },
  {
    title: 'CERTIFICATE OF CYBER SECURITY',
    issuer: 'Vercel',
    date: '2024',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sql Injection,XSS,Zero Day Vulnerability,LFI Vulnerability ',
    link: 'https://drive.google.com/file/d/19P4HQbaM4VmLxfaDWkU7LBRf9g8OkVAe/view'
  },
  {
    title: 'Full-Stack Web Developer with just ONE course',
    issuer: 'W3C',
    date: '2023',
    image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Frontend + Backend development, APIs, Authentication, PostgreSQL, and 30+ deployed projects.',
    link: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-88278f6e-c3a2-457e-944c-9cd81bd3fa39.pdf'
  }
];

export function Achievements() {
  const { isCss, isJs, isHighFi } = usePipeline();
  const [visibleAchievements, setVisibleAchievements] = useState<Set<number>>(new Set());
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

  // --- RAW HTML MODE ---
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

  // --- STYLED MODE ---
  return (
    <section
      id="achievements"
      className="py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {isHighFi && (
        <>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-300/20 dark:bg-cyan-600/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-6 shadow-xl">
            <Award className="text-white" size={32} />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Achievements & <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Continuous learning and professional development milestones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              ref={(el) => (achievementRefs.current[index] = el)}
              className={`
                group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-700/50
                ${isJs ? 'hover:shadow-2xl transition-all duration-500' : ''}
                ${(visibleAchievements.has(index) || !isJs) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: isJs ? `${index * 100}ms` : '0ms' }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className={`w-full h-full object-cover ${isJs ? 'group-hover:scale-110 transition-transform duration-500' : ''}`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <Award className="text-blue-600" size={24} />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-blue-600 dark:text-cyan-400">
                    {achievement.issuer}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {achievement.date}
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-3 text-gray-900 dark:text-white ${isJs ? 'group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors' : ''}`}>
                  {achievement.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {achievement.description}
                </p>

                <a
                  href={achievement.link}
                  className={`inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-semibold ${isJs ? 'hover:gap-3 transition-all duration-200' : ''}`}
                >
                  View Certificate
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}