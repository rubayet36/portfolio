import { ThemeProvider } from './context/ThemeContext';
import { PipelineProvider, usePipeline } from './context/PipelineContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero'; // Fixed: Named import
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnimatedCursor } from './components/AnimatedCursor'; // Fixed: Named import
import { PipelineHUD } from './components/PipelineHUD';

// Wrapper to consume the Pipeline Context
function PortfolioContent() {
  const { isCss } = usePipeline();

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        isCss 
          ? 'bg-white dark:bg-gray-900 font-sans'
          : 'bg-white text-black font-serif'
      }`}
    >
      <AnimatedCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <PipelineHUD /> 
    </div>
  );
}

function App() {
  return (
    <PipelineProvider>
      <ThemeProvider>
        <PortfolioContent />
      </ThemeProvider>
    </PipelineProvider>
  );
}

export default App;