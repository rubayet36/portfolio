import { Code, Palette, Wrench, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePipeline } from '../context/PipelineContext';

interface SkillCategory {
  title: string;
  icon: typeof Code;
  color: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code,
    color: 'from-blue-600 to-cyan-600',
    skills: ['Java Script', 'TypeScript', 'Tailwind CSS', 'React']
  },
  {
    title: 'Tools',
    icon: Wrench,
    color: 'from-cyan-600 to-teal-600',
    skills: ['Vercel', 'Git', 'GitHub', 'Figma', 'VS Code', 'npm', 'Webpack', 'Vite', 'Supabase']
  },
  {
    title: 'Design',
    icon: Palette,
    color: 'from-teal-600 to-green-600',
    skills: ['UI/UX Design', 'Responsive Design', 'Design Systems', 'Accessibility', 'Animation', 'Typography']
  },
  {
    title: 'Extra Skills',
    icon: Sparkles,
    color: 'from-green-600 to-emerald-600',
    skills: ['AI-Assisted Development', 'Prompt Engineering', 'AI Integration in Web Apps', 'Ethical Hacking / Security']
  }
];

export function Skills() {
  const { isCss, isJs, isHighFi } = usePipeline();
  const [visibleCategories, setVisibleCategories] = useState<Set<number>>(new Set());
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isJs) return; // No observer if JS is disabled

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = categoryRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCategories((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 }
    );

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isJs]);

  // --- RAW HTML MODE ---
  if (!isCss) {
    return (
      <section id="skills" style={{ padding: '20px', borderBottom: '2px solid black' }}>
        <h2>Skills & Expertise</h2>
        <ul>
          {skillCategories.map((category, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <strong>{category.title}</strong>: {category.skills.join(', ')}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  // --- STYLED MODE ---
  return (
    <section
      id="skills"
      className="py-32 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* High-Fi: Background Blur Blobs */}
      {isHighFi && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-300/20 dark:bg-cyan-600/10 rounded-full blur-3xl" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Skills & <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern web experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              ref={(el) => (categoryRefs.current[index] = el)}
              className={`
                group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50
                ${isJs ? 'hover:shadow-2xl transition-all duration-500' : ''}
                ${(visibleCategories.has(index) || !isJs) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: isJs ? `${index * 100}ms` : '0ms' }}
            >
              {isHighFi && (
                <div 
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-3xl blur-2xl group-hover:opacity-20 transition-opacity"
                  style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} 
                />
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className={`
                  w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg
                  ${isJs ? 'group-hover:scale-110 transition-transform duration-300' : ''}
                `}>
                  <category.icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`
                      px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-sm font-semibold shadow-sm border border-gray-200 dark:border-gray-600
                      ${isJs ? 'hover:shadow-md hover:scale-105 transition-all duration-200' : ''}
                    `}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-xl">
            <p className="text-white font-semibold text-lg">
              Always learning, always growing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}