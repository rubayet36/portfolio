import { 
  Folder, 
  FileCode, 
  Layout, 
  Code2, 
  ExternalLink, 
  Github, 
  ChevronDown,
  X,
  Globe, // New Icon
  Loader2 // New Icon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePipeline } from '../context/PipelineContext';

interface Project {
  id: string;
  title: string;
  fileName: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  codeSnippet: string;
}

const projects: Project[] = [
  {
    id: 'gym',
    title: 'Vortex Fitness',
    fileName: 'VortexFitness.tsx',
    description: 'A modern, fully responsive gym website template with smooth animations and AI features.',
    image: 'https://i.postimg.cc/c4q6Qqgb/8b7bffd7-eb2a-4453-bde9-88136054bd04.jpg',
    tech: ['React', 'Tailwind', 'Framer Motion', 'AI Integration'],
    liveUrl: 'https://vortexfitnessclub.netlify.app/',
    githubUrl: '#',
    codeSnippet: `import { motion } from 'framer-motion';
import { AIPlanner } from './features/ai';

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Video Layer */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover opacity-40">
        <source src="/gym-bg.mp4" type="video/mp4" />
      </video>

      <div className="z-10 container mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-bold text-white mb-6"
        >
          FORGE YOUR <span className="text-red-500">LEGACY</span>
        </motion.h1>
        
        <AIPlanner mode="hypertrophy" />
      </div>
    </section>
  );
};`
  },
  {
    id: 'jatri',
    title: 'Jatri_Ovijiog',
    fileName: 'JatriOvijog.tsx',
    description: 'AI-assisted safety and complaint-management platform for public transport.',
    image: 'https://i.postimg.cc/T34zDxhy/ce70b9d4-6b8b-4986-a0a2-5e5f9ae521f5.jpg',
    tech: ['React', 'TypeScript', 'Tailwind', 'OpenAI'],
    liveUrl: 'https://jatri-ovijog.vercel.app/dashboard.html',
    githubUrl: '#',
    codeSnippet: `import { OpenAI } from 'ai-sdk';
import { Safety } from '@jatri/core';

export const JatriOvijog = () => {
  // AI-powered complaint analysis
  const analyzeComplaint = async (input: string) => {
    const sentiment = await OpenAI.analyze(input);
    return sentiment.score > 0.8 ? 'URGENT' : 'NORMAL';
  };

  return (
    <div className="safety-dashboard">
      <LiveTracker source="dhaka-metro" />
      <ComplaintForm onSubmit={analyzeComplaint} />
    </div>
  );
};`
  },
  {
    id: 'rest',
    title: 'Restaurant OS',
    fileName: 'VortexKitchen.ts',
    description: 'Full-featured e-commerce platform with real-time order sync and Stripe integration.',
    image: 'https://i.postimg.cc/VkphNFHm/9bc05100-554d-4bd2-8c8d-60e683bb68f9.jpg',
    tech: ['Next.js', 'Redux', 'Stripe', 'Supabase'],
    liveUrl: 'https://vortexclub.netlify.app/menu.html',
    githubUrl: '#',
    codeSnippet: `import { Stripe } from '@stripe/stripe-js';
import { OrderQueue } from './realtime';

interface Order {
  id: string;
  items: MenuItem[];
  status: 'pending' | 'cooking' | 'served';
}

// Real-time kitchen management sync
export function KitchenDisplay() {
  const orders = useSubscription(OrderQueue);
  
  return orders.map(order => (
    <Ticket key={order.id} data={order} />
  ));
}`
  },
];

export function Projects() {
  const { isCss, isJs, isHighFi } = usePipeline();
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [isLive, setIsLive] = useState(false); // NEW: Toggle between Image and Iframe
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true); // NEW: Loading state

  useEffect(() => {
    if (!isJs) {
      setActiveProject(projects[0]);
      setViewMode('preview');
      setIsLive(false);
    }
  }, [isJs]);

  // Reset loading state when project changes
  useEffect(() => {
    setIframeLoading(true);
    setIsLive(false); // Reset to image view when switching projects for better UX
  }, [activeProject]);

  // --- STAGE 0: RAW HTML MODE ---
  if (!isCss) {
    return (
      <section id="projects" style={{ padding: '20px', borderBottom: '2px solid black' }}>
        <h2>Projects (File Explorer)</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.id} style={{ marginBottom: '20px' }}>
              <h3>{project.fileName}</h3>
              <p>{project.description}</p>
              <a href={project.liveUrl}>Live Demo</a> | <a href={project.githubUrl}>Source Code</a>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  // --- STAGE 1+: VIRTUAL IDE INTERFACE ---
  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Selected <span className="text-blue-600 dark:text-cyan-400">Works</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore my code and designs in this interactive workspace.
          </p>
        </div>

        {/* --- THE VIRTUAL IDE WINDOW --- */}
        <div className={`
          relative w-full h-[600px] md:h-[700px] bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col
          ${isHighFi ? 'shadow-blue-500/10 dark:shadow-cyan-500/10 backdrop-blur-sm' : ''}
        `}>
          
          {/* 1. Window Title Bar */}
          <div className="h-10 bg-slate-100 dark:bg-[#252526] border-b border-slate-200 dark:border-black flex items-center justify-between px-4 select-none">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            <div className="text-xs text-slate-500 font-mono hidden md:block">
              rubayet-portfolio — {activeProject.fileName}
            </div>
            <div className="w-10" />
          </div>

          {/* 2. Main Workspace Area */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* A. Sidebar (File Explorer) */}
            <div className={`
              w-64 bg-slate-50 dark:bg-[#252526] border-r border-slate-200 dark:border-black flex flex-col transition-all duration-300 absolute md:relative z-20 h-full
              ${isExplorerOpen ? 'translate-x-0 shadow-xl md:shadow-none' : '-translate-x-full md:hidden'}
            `}>
              <div className="p-2 text-xs font-bold text-slate-500 dark:text-slate-400 pl-4 pt-4 mb-2">EXPLORER</div>
              
              <button 
                onClick={() => isJs && setIsExplorerOpen(!isExplorerOpen)}
                className="flex items-center px-2 py-1 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2a2d2e] cursor-pointer"
              >
                <ChevronDown size={16} className="mr-1" />
                <span className="text-sm font-semibold">PORTFOLIO</span>
              </button>

              <div className="ml-4 mt-1 border-l border-slate-300 dark:border-slate-700 pl-2">
                <div className="flex items-center px-2 py-1 text-slate-600 dark:text-slate-400 text-sm">
                  <Folder size={14} className="mr-2 text-blue-500" />
                  src
                </div>
                <div className="ml-4 border-l border-slate-300 dark:border-slate-700 pl-2">
                  <div className="flex items-center px-2 py-1 text-slate-600 dark:text-slate-400 text-sm">
                    <Folder size={14} className="mr-2 text-orange-500" />
                    components
                  </div>
                  
                  {/* Project Files List */}
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => {
                        if (isJs) {
                          setActiveProject(project);
                          if (window.innerWidth < 768) setIsExplorerOpen(false); // Auto close on mobile
                        }
                      }}
                      className={`
                        w-full flex items-center px-2 py-1.5 text-sm rounded-sm transition-colors
                        ${activeProject.id === project.id 
                          ? 'bg-blue-100 text-blue-700 dark:bg-[#37373d] dark:text-white' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-[#2a2d2e]'}
                        ${!isJs ? 'cursor-default' : 'cursor-pointer'}
                      `}
                    >
                      <FileCode size={14} className={`mr-2 ${activeProject.id === project.id ? 'text-blue-500 dark:text-cyan-400' : 'text-slate-400'}`} />
                      {project.fileName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* B. Editor Area (Preview Window) */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e] relative">
              
              {/* Tabs */}
              <div className="flex h-9 bg-slate-100 dark:bg-[#252526] border-b border-slate-200 dark:border-black overflow-x-auto">
                <div className="flex items-center px-3 py-1 bg-white dark:bg-[#1e1e1e] border-r border-slate-200 dark:border-black min-w-[120px] justify-between group">
                  <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-yellow-100">
                    <FileCode size={14} className="text-blue-500 dark:text-yellow-400" />
                    {activeProject.fileName}
                  </div>
                  <X size={12} className="text-slate-400 opacity-0 group-hover:opacity-100 cursor-pointer" />
                </div>
              </div>

              {/* Toolbar */}
              <div className="h-12 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 bg-white dark:bg-[#1e1e1e]">
                <button 
                  onClick={() => setIsExplorerOpen(!isExplorerOpen)}
                  className="md:hidden p-1 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400"
                >
                  <Folder size={18} />
                </button>

                <div className="hidden md:flex items-center gap-2">
                  <span className="text-xs text-slate-400">path:</span>
                  <span className="text-sm text-slate-600 dark:text-slate-300 font-mono">src/components/{activeProject.fileName}</span>
                </div>

                <div className="flex bg-slate-100 dark:bg-black rounded-lg p-1 gap-1">
                  {/* Preview / Code Toggle */}
                  <button
                    onClick={() => isJs && setViewMode('preview')}
                    className={`
                      flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-all
                      ${viewMode === 'preview' 
                        ? 'bg-white dark:bg-[#333] text-blue-600 dark:text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}
                    `}
                  >
                    <Layout size={14} />
                    UI
                  </button>
                  <button
                    onClick={() => isJs && setViewMode('code')}
                    className={`
                      flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-all
                      ${viewMode === 'code' 
                        ? 'bg-white dark:bg-[#333] text-blue-600 dark:text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}
                    `}
                  >
                    <Code2 size={14} />
                    Code
                  </button>

                  {/* Live Site Toggle (Only visible in Preview Mode) */}
                  {viewMode === 'preview' && (
                    <button
                      onClick={() => isJs && setIsLive(!isLive)}
                      className={`
                        flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-all ml-2
                        ${isLive 
                          ? 'bg-red-500 text-white shadow-sm animate-pulse' 
                          : 'bg-slate-200 dark:bg-[#333] text-slate-600 dark:text-slate-300'}
                      `}
                      title={isLive ? "Stop Live Preview" : "Start Live Preview"}
                    >
                      <Globe size={14} />
                      {isLive ? 'LIVE' : 'Static'}
                    </button>
                  )}
                </div>
              </div>

              {/* CONTENT VIEWPORT */}
              <div className="flex-1 overflow-y-auto relative bg-slate-50 dark:bg-[#1e1e1e]">
                
                {/* 1. PREVIEW MODE */}
                {viewMode === 'preview' && (
                  <div className="h-full flex flex-col">
                    <div className="relative group flex-1 m-4 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-black">
                      
                      {/* A. LIVE IFRAME VIEW */}
                      {isLive ? (
                        <>
                          {iframeLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-[#1e1e1e] z-10">
                              <Loader2 className="animate-spin text-blue-500" size={32} />
                              <span className="ml-2 text-sm text-slate-500">Connecting to server...</span>
                            </div>
                          )}
                          <iframe
                            src={activeProject.liveUrl}
                            className="w-full h-full border-none"
                            title={activeProject.title}
                            onLoad={() => setIframeLoading(false)}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                          />
                        </>
                      ) : (
                        /* B. STATIC IMAGE VIEW */
                        <>
                          <img 
                            src={activeProject.image} 
                            alt={activeProject.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          
                          {/* Overlay CTA */}
                          {isJs && (
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                              <h3 className="text-white text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {activeProject.title}
                              </h3>
                              <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                <button 
                                  onClick={() => setIsLive(true)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                                >
                                  <Globe size={16} /> Live Preview
                                </button>
                                <a 
                                  href={activeProject.liveUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-lg flex items-center gap-2 hover:bg-white/20 transition-colors"
                                >
                                  <ExternalLink size={16} /> New Tab
                                </a>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="px-6 pb-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{activeProject.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{activeProject.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map(t => (
                          <span key={t} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md border border-blue-200 dark:border-blue-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CODE MODE */}
                {viewMode === 'code' && (
                  <div className="p-6 font-mono text-sm overflow-auto h-full">
                    <pre className="text-slate-800 dark:text-[#d4d4d4]">
                      <code>
                        {activeProject.codeSnippet.split('\n').map((line, i) => (
                          <div key={i} className="table-row">
                            <span className="table-cell text-right pr-4 text-slate-400 dark:text-[#858585] select-none w-8">
                              {i + 1}
                            </span>
                            <span className="table-cell">
                              {/* Simple syntax highlighting logic */}
                              {line.split(/(\s+)/).map((token, j) => {
                                if (token.match(/^(import|export|const|return|function|interface|async|await)/)) 
                                  return <span key={j} className="text-purple-600 dark:text-[#c586c0]">{token}</span>;
                                if (token.match(/^('.*')/)) 
                                  return <span key={j} className="text-green-600 dark:text-[#ce9178]">{token}</span>;
                                if (token.match(/^[A-Z][a-zA-Z]*/)) 
                                  return <span key={j} className="text-yellow-600 dark:text-[#4ec9b0]">{token}</span>;
                                if (token.match(/\/\//))
                                  return <span key={j} className="text-slate-400 dark:text-[#6a9955]">{token}</span>;
                                return <span key={j}>{token}</span>;
                              })}
                            </span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>
                )}

              </div>
            </div>
          </div>
          
          {/* 3. Status Bar */}
          <div className="h-6 bg-blue-600 dark:bg-blue-900 flex items-center px-3 text-[10px] text-white select-none justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Github size={10} />
                <span>main*</span>
              </div>
              <div className="flex items-center gap-1">
                <X size={10} />
                <span>0</span>
                <span className="ml-1 opacity-70">0</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span>Ln {activeProject.codeSnippet.split('\n').length}, Col 1</span>
              <span>UTF-8</span>
              <span>TypeScript React</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}