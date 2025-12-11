import { useEffect, useRef, useState } from 'react';
import { Code2, Sparkles, Zap, User, Send } from 'lucide-react';
import { usePipeline } from '../context/PipelineContext';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIG ---
const profileImgUrl = 'https://i.postimg.cc/3wC2NKpH/DSC-8043-2-NEF.jpg';

// --- CHAT DATA ---
const chatHistory = [
  {
    id: 1,
    sender: 'visitor',
    type: 'text',
    content: "Hi! Tell me a bit about yourself. 👋"
  },
  {
    id: 2,
    sender: 'me',
    type: 'text',
    content: "Hey there! I'm Rubayet. I'm a Front-End Engineer obsessed with clean UI, smooth animations, and building products people love.",
    delay: 1000
  },
  {
    id: 3,
    sender: 'me',
    type: 'text',
    content: "I specialize in React, Next.js, TypeScript, and crafting robust design systems.",
    delay: 2000
  },
  {
    id: 4,
    sender: 'visitor',
    type: 'text',
    content: "That sounds cool! What are your core values? 💡"
  },
  {
    id: 5,
    sender: 'me',
    type: 'tags',
    content: ['Clean Code', 'User-Centric Design', 'Continuous Learning', 'Collaborative Spirit'],
    delay: 1500
  },
  {
    id: 6,
    sender: 'visitor',
    type: 'text',
    content: "And your experience? 🚀"
  },
  {
    id: 7,
    sender: 'me',
    type: 'cards',
    content: [
      { icon: Code2, title: '5+ Years', desc: 'Dev Experience', color: 'bg-blue-500' },
      { icon: Sparkles, title: 'Creative', desc: 'Design First', color: 'bg-purple-500' },
      { icon: Zap, title: 'Fast', desc: 'Optimized', color: 'bg-orange-500' }
    ],
    delay: 1500
  }
];

export function About() {
  const { isCss, isJs, isHighFi } = usePipeline();
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasStartedRef = useRef(false);

  // --- ANIMATION LOGIC (JS MODE) ---
  useEffect(() => {
    if (!isJs) {
      // If JS is off, show all messages immediately
      setVisibleMessages(chatHistory.map(m => m.id));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          playConversation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isJs]);

  const playConversation = async () => {
    let currentDelay = 0;

    for (const msg of chatHistory) {
      // 1. If it's MY message, show typing indicator first
      if (msg.sender === 'me') {
        setTimeout(() => setIsTyping(true), currentDelay);
        currentDelay += 1000; // Typing duration
      }

      // 2. Reveal the message
      setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, msg.id]);
      }, currentDelay);

      // 3. Wait a bit before next message (reading time)
      currentDelay += msg.sender === 'visitor' ? 800 : 1200;
    }
  };

  // --- RAW HTML MODE ---
  if (!isCss) {
    return (
      <section id="about" style={{ padding: '20px', borderBottom: '2px solid black' }}>
        <h2>About Me (Chat Log)</h2>
        {chatHistory.map(msg => (
          <div key={msg.id} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender === 'me' ? 'Rubayet' : 'Visitor'}: </strong>
            {msg.type === 'text' ? msg.content : '[Rich Content]'}
          </div>
        ))}
      </section>
    );
  }

  // --- STYLED CHAT MODE ---
  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background Decor */}
      {isHighFi && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* CHANGED: Increased max-width from 3xl to 6xl for a wider chat window */}
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              About <span className="text-blue-600 dark:text-cyan-400">Me</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400">Let's have a quick chat</p>
          </div>

          {/* Chat Window Container */}
          <div className={`
            bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[600px] flex flex-col
            ${isHighFi ? 'backdrop-blur-sm bg-white/80 dark:bg-slate-900/80' : ''}
          `}>
            
            {/* Window Header */}
            <div className="bg-slate-100 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
              <div className="relative">
                {/* CHANGED: Used profile image */}
                <img 
                  src={profileImgUrl} 
                  alt="Rubayet" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-800"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Rubayet Khan</h3>
                <p className="text-xs text-blue-600 dark:text-cyan-400 font-medium">Online</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              <AnimatePresence mode='popLayout'>
                {chatHistory.map((msg) => {
                  if (!visibleMessages.includes(msg.id)) return null;

                  const isMe = msg.sender === 'me';

                  return (
                    <motion.div
                      key={msg.id}
                      initial={isJs ? { opacity: 0, y: 20, scale: 0.9 } : { opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[85%] md:max-w-[70%] ${isMe ? 'flex-row' : 'flex-row-reverse'}`}>
                        
                        {/* Avatar Display */}
                        {isMe ? (
                          // CHANGED: Used profile image for 'me'
                          <img 
                            src={profileImgUrl} 
                            alt="Me" 
                            className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                          />
                        ) : (
                          // Visitor icon
                          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                             <User size={14} />
                          </div>
                        )}

                        {/* Bubble Content */}
                        <div className={`
                          p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed
                          ${isMe 
                            ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700' 
                            : 'bg-blue-600 text-white rounded-br-none'}
                        `}>
                          {/* TEXT MESSAGE */}
                          {msg.type === 'text' && <p>{msg.content}</p>}

                          {/* TAGS MESSAGE (Core Values) */}
                          {msg.type === 'tags' && Array.isArray(msg.content) && (
                            <div className="flex flex-wrap gap-2">
                              {msg.content.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-600">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* CARDS MESSAGE (Highlights) */}
                          {msg.type === 'cards' && Array.isArray(msg.content) && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                              {msg.content.map((card: any) => (
                                <div key={card.title} className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center gap-2">
                                  <div className={`w-8 h-8 rounded-full ${card.color} flex items-center justify-center text-white`}>
                                    <card.icon size={14} />
                                  </div>
                                  <div>
                                    <div className="font-bold text-slate-900 dark:text-white text-xs">{card.title}</div>
                                    <div className="text-[10px] text-slate-500 uppercase font-semibold">{card.desc}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && isJs && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-end gap-2">
                       {/* CHANGED: Used profile image for typing indicator */}
                      <img 
                        src={profileImgUrl} 
                        alt="Typing..." 
                        className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                      />
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-700 shadow-sm flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area (Decorative) */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <div className="flex gap-2">
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-3 text-sm text-slate-400 cursor-not-allowed">
                  Reply to Rubayet...
                </div>
                <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform">
                  <Send size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}