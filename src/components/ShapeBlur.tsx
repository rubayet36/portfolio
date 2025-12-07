import { motion } from 'framer-motion';
import { usePipeline } from '../context/PipelineContext';

export function ShapeBlur() {
  const { isHighFi } = usePipeline();

  // If not High-Fi, don't render (saves performance)
  if (!isHighFi) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Container for the blur effect */}
      <div className="absolute inset-0 opacity-60 dark:opacity-40 filter blur-[100px]">
        
        {/* Blob 1: Purple */}
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70"
        />

        {/* Blob 2: Blue/Cyan */}
        <motion.div
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 100, -100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-70"
        />

        {/* Blob 3: White/Bright highlight */}
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-white/50 dark:bg-cyan-300/30 rounded-full mix-blend-overlay opacity-50"
        />
      </div>
    </div>
  );
}