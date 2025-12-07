import { useEffect, useState } from 'react';
import { usePipeline } from '../context/PipelineContext';

export function AnimatedCursor() {
  const { isHighFi } = usePipeline(); // Access Context
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Optimization: Don't attach listeners unless HighFi
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

  // If not High Fidelity, return null (No custom cursor)
  if (!isHighFi) return null;

  return (
    <>
      <div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'white',
          transition: 'transform 0.15s ease-out',
          ...(isPointer && { transform: 'translate(-50%, -50%) scale(1.5)' })
        }}
      />
      <div
        className="fixed w-8 h-8 rounded-full border-2 border-white/30 pointer-events-none z-50 mix-blend-difference hidden lg:block"
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