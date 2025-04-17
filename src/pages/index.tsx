import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Hero/Hero';
import AboutSection from '@/components/AboutSection/AboutSection';
import ProductsSection from '@/components/ProductsSection/ProductsSection';
import ResourcesSection from '@/components/ResourcesSection/ResourcesSection';
import GuidelinesSection from '@/components/GuidelinesSection/GuidelinesSection';

const HomePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effect values
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Initialize GSAP for specific animations
  useEffect(() => {
    // Load GSAP from CDN if needed for specific animations
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <Header />
      
      {/* Background shapes - animated with framer-motion */}
      <motion.div 
        className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.05]"
        style={{ y: backgroundY }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="0" y="0" width="100%" height="100%" fill="#0061FF" />
          <circle cx="25" cy="25" r="20" fill="#FF5D52" />
          <rect x="60" y="60" width="30" height="30" fill="#FFCC02" />
          <circle cx="80" cy="20" r="15" fill="#8AD220" />
        </svg>
      </motion.div>
      
      <main>
        <Hero />
        <AboutSection />
        <ProductsSection />
        <ResourcesSection />
        <GuidelinesSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
