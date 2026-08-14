import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import HowItWorks from './components/HowItWorks';
import ModelPerformance from './components/ModelPerformance';
import FeaturesSection from './components/FeaturesSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-canvas)',
        color: 'var(--color-ink)',
        fontFamily: 'var(--font-sans)',
      }}
    >
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
