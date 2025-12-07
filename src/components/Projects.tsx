import { ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePipeline } from '../context/PipelineContext';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: 'Jatri_Ovijiog ',
    description: 'Jatri Ovijog is a modern, AI-assisted safety and complaint-management platform.',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['Java Script', 'TypeScript', 'Tailwind', 'OpenAI', 'HTML/CSS'],
    liveUrl: 'https://vortex-cafe.vercel.app/menu.html',
    githubUrl: '#'
  },
  {
    title: 'Restaurant management',
    description: 'Full-featured e-commerce platform with stripe integration.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    tech: ['Java Script', 'TypeScript', 'PostgreSQL', 'Supabase'],
    liveUrl: 'vortex-fitness.vercel.app',
    githubUrl: '#'
  },
];

export function Projects() {
  const { isCss, isJs, isHighFi } = usePipeline();
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isJs) return; // JS Observer Logic only works if JS is on
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = projectRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleProjects((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isJs]);

  // --- RAW HTML MODE ---
  if (!isCss) {
    return (
      <section id="projects" style={{ padding: '20px' }}>
        <h2>Featured Projects</h2>
        <ul>
          {projects.map((project, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p><strong>Tech:</strong> {project.tech.join(', ')}</p>
              <a href={project.liveUrl}>Live Demo</a> | <a href={project.githubUrl}>GitHub</a>
            </li>
          ))}
        </ul>
        <hr />
      </section>
    );
  }

  // --- STYLED MODE ---
  return (
    <section
      id="projects"
      className="py-32 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {isHighFi && <div className="absolute inset-0 bg-grid-pattern opacity-5" />}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Featured <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectRefs.current[index] = el)}
              className={`
                group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-700/50
                ${isJs ? 'hover:shadow-2xl transition-all duration-500' : ''}
                ${(visibleProjects.has(index) || !isJs) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              // Only apply transition delay if JS/Animations enabled
              style={{ transitionDelay: isJs ? `${index * 100}ms` : '0ms' }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover ${isJs ? 'group-hover:scale-110 transition-transform duration-500' : ''}`}
                  loading="lazy"
                />
                {isHighFi && <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
              </div>

              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-3 text-gray-900 dark:text-white ${isJs ? 'group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors' : ''}`}>
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href={project.liveUrl} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold ${isJs ? 'hover:scale-105 transition-transform' : ''}`}>
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                  <a href={project.githubUrl} className={`px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold ${isJs ? 'hover:scale-105 transition-transform' : ''}`}>
                    <Github size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}