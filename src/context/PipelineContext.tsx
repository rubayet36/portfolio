import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type PipelineStage = 0 | 1 | 2 | 3;

interface PipelineContextType {
  stage: PipelineStage;
  setStage: (stage: PipelineStage) => void;
  isHtml: boolean;
  isCss: boolean;
  isJs: boolean;
  isHighFi: boolean;
}

const PipelineContext = createContext<PipelineContextType | undefined>(undefined);

export function PipelineProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<PipelineStage>(0); 

  // --- AUTOMATIC BOOT SEQUENCE ---
  useEffect(() => {
    // Timeline configuration (in milliseconds)
    const delayBeforeCss = 1500; // Stay on Raw HTML for 1.5s
    const delayBeforeJs = 1500;  // Stay on CSS for 1.5s
    const delayBeforeHighFi = 1500; // Stay on JS for 1.5s

    // Step 1: Switch to CSS (Stage 1)
    const timer1 = setTimeout(() => {
      setStage(1);
    }, delayBeforeCss);

    // Step 2: Switch to JS (Stage 2)
    const timer2 = setTimeout(() => {
      setStage(2);
    }, delayBeforeCss + delayBeforeJs);

    // Step 3: Switch to High-Fi (Stage 3) - Final Destination
    const timer3 = setTimeout(() => {
      setStage(3);
    }, delayBeforeCss + delayBeforeJs + delayBeforeHighFi);

    // Cleanup timers if the user leaves the page immediately
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const value = {
    stage,
    setStage,
    isHtml: stage >= 0,
    isCss: stage >= 1,
    isJs: stage >= 2,
    isHighFi: stage >= 3,
  };

  return (
    <PipelineContext.Provider value={value}>
      {children}
    </PipelineContext.Provider>
  );
}

export function usePipeline() {
  const context = useContext(PipelineContext);
  if (context === undefined) {
    throw new Error('usePipeline must be used within a PipelineProvider');
  }
  return context;
}