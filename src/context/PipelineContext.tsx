import { createContext, useContext, useState, ReactNode } from 'react';

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
  // CHANGE: Default set to 0 (HTML Mode) instead of 3
  const [stage, setStage] = useState<PipelineStage>(0); 

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