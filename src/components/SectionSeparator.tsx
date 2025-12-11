import { usePipeline } from '../context/PipelineContext';

export function SectionSeparator() {
  const { isCss, isHighFi } = usePipeline();

  // If we are in Raw HTML mode, return nothing (just a straight line)
  if (!isCss) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
      <svg
        className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px] fill-white dark:fill-slate-950 transition-colors duration-700"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        {/* This path creates the "Hill" or "Lens" curve.
          It fills the bottom area with the color of the 'About' section,
          creating a curved boundary with the Hero section above.
        */}
        <path 
          d="M0,120V60c150-30,400-60,600-60s450,30,600,60V120Z" 
          className={isHighFi ? "animate-pulse" : ""}
          style={{ animationDuration: '8s' }}
        />
      </svg>
    </div>
  );
}