import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Mission } from './components/Mission';
import { Process } from './components/Process';
import { Initiatives } from './components/Initiatives';
import { Stats } from './components/Stats';
import { IdeasSection } from './components/IdeasFeed';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Process />
        <Initiatives />
        <Stats />
        <IdeasSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}