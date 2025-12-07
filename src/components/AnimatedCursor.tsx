import { useEffect, useState } from 'react';
import { usePipeline } from '../context/PipelineContext';

export function AnimatedCursor() {
  const { isHighFi } = usePipeline();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (!isHighFi) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, [isHighFi]);

  if (!isHighFi) return null;

  return (
    <>
      {/* INNER DOT: Restored (w-6 h-6) */}
      <div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'white', 
          transition: 'transform 0.1s ease-out',
          ...(isPointer && { transform: 'translate(-50%, -50%) scale(1.5)' })
        }}
      />
      
      {/* OUTER RING */}
      <div
        className="fixed w-12 h-12 rounded-full border-2 border-white/30 pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.2s ease-out',
          ...(isPointer && { transform: 'translate(-50%, -50%) scale(1.5)' })
        }}
      />
    </>
  );
}