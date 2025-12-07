import { ThemeProvider } from './context/ThemeContext';
import { PipelineProvider, usePipeline } from './context/PipelineContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnimatedCursor } from './components/AnimatedCursor';
import { PipelineHUD } from './components/PipelineHUD';

// Create a wrapper component to consume the hook (since App uses the Provider)
function PortfolioContent() {
  const { isCss, isJs } = usePipeline();

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        isCss 
          ? 'bg-white dark:bg-gray-900 font-sans' // CSS Mode: Modern Font + Dark Mode support
          : 'bg-white text-black font-serif'      // HTML Mode: Times New Roman + Pure White + Black Text
      }`}
    >
      {/* Only show Custom Cursor in High-Fi mode (handled inside the component) */}
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
      
      {/* Footer is styled in its own file, but relies on isCss check inside it too */}
      <Footer />
      
      {/* HUD needs to be visible always so you can switch modes */}
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