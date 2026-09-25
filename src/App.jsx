import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import BrandStatement from './components/sections/BrandStatement';
import Showcase from './components/sections/Showcase';
import Capabilities from './components/sections/Capabilities';
import Process from './components/sections/Process';
import FeaturedWork from './components/sections/FeaturedWork';
import Impact from './components/sections/Impact';
import Clients from './components/sections/Clients';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-burgundy focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <BrandStatement />
        <Showcase />
        <Capabilities />
        <Process />
        <FeaturedWork />
        <Impact />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
