import { Code, FileCode, Zap, Sparkles } from 'lucide-react';
import { usePipeline } from '../context/PipelineContext';
import { motion } from 'framer-motion';
import ShinyText from './ShinyText'; // <--- Import the new component

export function PipelineHUD() {
  const { stage, setStage } = usePipeline();

  const levels = [
    { level: 0, label: 'HTML', icon: Code, color: 'bg-gray-500' },
    { level: 1, label: 'CSS', icon: FileCode, color: 'bg-blue-500' },
    { level: 2, label: 'JS', icon: Zap, color: 'bg-yellow-500' },
    { level: 3, label: 'High-Fi', icon: Sparkles, color: 'bg-purple-500' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
       {/* Instruction Tooltip with Shiny Text */}
      <div className="bg-black/80 text-white text-xs px-3 py-1 rounded mb-2 backdrop-blur-md border border-white/10 shadow-lg">
        <ShinyText text="See my skills in action" speed={3} className="font-semibold text-white/90" />
      </div>
      
      <motion.div 
        layout
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-2 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl flex gap-1"
      >
        {levels.map((item) => {
          const isActive = stage >= item.level;
          const isCurrent = stage === item.level;
          
          return (
            <button
              key={item.level}
              onClick={() => setStage(item.level as 0 | 1 | 2 | 3)}
              className={`
                relative flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300
                ${isActive ? 'text-white' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}
                ${isCurrent ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-900' : ''}
              `}
            >
              {/* Background fill for active state */}
              {isActive && (
                <motion.div
                  layoutId="activeBackground"
                  className={`absolute inset-0 rounded-xl ${item.color} -z-10`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <item.icon size={18} />
              <span className="font-bold text-sm hidden sm:block">{item.label}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}