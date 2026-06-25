import { ThemeProvider } from './hooks/useTheme.jsx';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import HowItWorks from './components/HowItWorks';
import ModelPerformance from './components/ModelPerformance';
import FeaturesSection from './components/FeaturesSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <UploadSection />
        <HowItWorks />
        <ModelPerformance />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
