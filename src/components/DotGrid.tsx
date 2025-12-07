import { useRef, useEffect } from 'react';

interface DotGridProps {
  className?: string;
}

export function DotGrid({ className }: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- CONFIGURATION ---
    const DOT_SIZE = 2;       // Radius of dots
    const GAP = 15;           // Space between dots
    const MOUSE_RADIUS = 100; // Radius of mouse influence
    const FRICTION = 0.90;    // 0.9 = slippery, 0.5 = sticky
    const TENSION = 0.05;     // Speed of snapping back
    
    // Colors
    const COLOR_BASE = '#94a3b8';   // Slate-400
    const COLOR_ACTIVE = '#06b6d4'; // Cyan-500

    let dots: any[] = [];
    let mouse = { x: -1000, y: -1000 };
    let width = 0;
    let height = 0;
    let animationFrameId: number;

    // --- SETUP ---
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        
        // Handle High DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        initDots();
      }
    };

    const initDots = () => {
      dots = [];
      const cols = Math.floor(width / GAP);
      const rows = Math.floor(height / GAP);
      
      // Center the grid
      const offsetX = (width - cols * GAP) / 2;
      const offsetY = (height - rows * GAP) / 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          dots.push({
            originX: offsetX + x * GAP,
            originY: offsetY + y * GAP,
            x: offsetX + x * GAP,
            y: offsetY + y * GAP,
            vx: 0,
            vy: 0,
            color: COLOR_BASE
          });
        }
      }
    };

    // --- PHYSICS LOOP ---
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach(dot => {
        // 1. Calculate distance to mouse
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 2. Interaction (Mouse Repulsion)
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force * 15; // Push strength
          const pushY = Math.sin(angle) * force * 15;
          
          dot.vx -= pushX;
          dot.vy -= pushY;
          dot.color = COLOR_ACTIVE;
        } else {
          // Fade back to base color slowly could be added here, 
          // but instant switch is more performant
          dot.color = COLOR_BASE; 
        }

        // 3. Spring Physics (Return to Origin)
        const springX = (dot.originX - dot.x) * TENSION;
        const springY = (dot.originY - dot.y) * TENSION;

        dot.vx += springX;
        dot.vy += springY;

        // 4. Apply Friction (Damping)
        dot.vx *= FRICTION;
        dot.vy *= FRICTION;

        // 5. Update Position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // 6. Draw
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, DOT_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    // --- EVENT LISTENERS ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Start
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}