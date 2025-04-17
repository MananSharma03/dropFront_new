import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const HomePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effect values for subtle animations
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-white">
      <Header />
      
      {/* Light grid background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-10">
        <div className="w-full h-full grid grid-cols-6 gap-[1px]">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border border-gray-200"></div>
          ))}
        </div>
      </div>
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-dropbox-blue font-bold text-6xl max-w-4xl mx-auto mb-12"
            >
              At Dropbox, our Brand Guidelines help us infuse everything we make with identity.
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex justify-center"
            >
              <img src="/assets/logo.svg" alt="Dropbox Logo" className="w-16 h-16 text-dropbox-blue" />
            </motion.div>
          </div>
        </section>
        
        {/* Brand Elements Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {/* Framework Card */}
              <motion.div 
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-[#2D3748] text-white aspect-square p-8 rounded-lg flex flex-col justify-between"
              >
                <h3 className="text-3xl font-bold">Framework</h3>
                <div className="flex items-center justify-center h-full">
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="6" fill="white" />
                    <circle cx="100" cy="60" r="6" fill="white" />
                    <circle cx="20" cy="100" r="6" fill="white" />
                    <line x1="20" y1="20" x2="100" y2="60" stroke="white" strokeWidth="2" />
                    <line x1="100" y1="60" x2="20" y2="100" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
              </motion.div>
              
              {/* Voice & Tone Card */}
              <motion.div 
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-[#FFCC02] text-[#553611] aspect-square p-8 rounded-lg flex flex-col justify-between"
              >
                <h3 className="text-3xl font-bold">Voice & Tone</h3>
                <div className="flex items-center justify-between h-full">
                  <span className="text-9xl font-serif">"</span>
                  <span className="text-9xl font-serif self-end">"</span>
                </div>
              </motion.div>
              
              {/* Logo Card */}
              <motion.div 
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-[#4ABFED] text-white aspect-square p-8 rounded-lg flex flex-col justify-between"
              >
                <h3 className="text-3xl font-bold">Logo</h3>
                <div className="flex items-center justify-center h-full">
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.5 7.5L7.5 37.5V75L37.5 45V7.5Z" />
                    <path d="M82.5 7.5L112.5 37.5V75L82.5 45V7.5Z" />
                    <path d="M37.5 112.5L7.5 82.5V45L37.5 75V112.5Z" />
                    <path d="M82.5 112.5L112.5 82.5V45L82.5 75V112.5Z" />
                  </svg>
                </div>
              </motion.div>
              
              {/* Iconography Card */}
              <motion.div 
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-[#A2CD3A] text-[#2D3748] aspect-square p-8 rounded-lg flex flex-col justify-between"
              >
                <h3 className="text-3xl font-bold">Iconography</h3>
                <div className="flex items-center justify-center h-full">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="20" width="60" height="50" rx="5" strokeWidth="5" stroke="currentColor" fill="none" />
                    <rect x="40" y="45" width="20" height="25" rx="2" fill="currentColor" />
                    <path d="M50 40 A10 10 0 1 0 60 50" stroke="currentColor" strokeWidth="5" fill="none" />
                  </svg>
                </div>
              </motion.div>
              
              {/* Color Card */}
              <motion.div 
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-[#FF7F32] text-[#4A2400] aspect-square p-8 rounded-lg flex flex-col justify-between col-span-1 md:col-span-2 md:row-span-2"
              >
                <h3 className="text-3xl font-bold">Color</h3>
                <div className="flex items-end justify-end h-full">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#c05c2e] rounded-lg w-16 h-16"></div>
                    <div className="bg-[#a84c26] rounded-lg w-16 h-16"></div>
                  </div>
                </div>
              </motion.div>
              
              {/* Typography Card */}
              <motion.div 
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-[#FF5D52] text-[#4A1A16] aspect-square p-8 rounded-lg flex flex-col justify-between"
              >
                <h3 className="text-3xl font-bold">Typography</h3>
                <div className="flex items-center justify-center h-full">
                  <span className="text-8xl font-serif">Aa</span>
                </div>
              </motion.div>
              
              {/* Motion Card */}
              <motion.div 
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-[#C881F2] text-[#3F185C] aspect-square p-8 rounded-lg flex flex-col justify-between"
              >
                <h3 className="text-3xl font-bold">Motion</h3>
                <div className="flex items-center justify-center h-full">
                  <motion.svg 
                    width="120" 
                    height="120" 
                    viewBox="0 0 120 120" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ 
                      y: [0, -10, 0], 
                      pathLength: [0, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                  >
                    <circle cx="20" cy="20" r="6" fill="currentColor" />
                    <circle cx="100" cy="20" r="6" fill="currentColor" />
                    <circle cx="60" cy="60" r="6" fill="currentColor" />
                    <circle cx="20" cy="100" r="6" fill="currentColor" />
                    <circle cx="100" cy="100" r="6" fill="currentColor" />
                    <motion.path 
                      d="M20,20 Q60,0 100,20 Q120,60 100,100 Q60,120 20,100 Q0,60 20,20" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </motion.svg>
                </div>
              </motion.div>
              
              {/* Imagery Card */}
              <motion.div 
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-[#9C366B] text-white aspect-square p-8 rounded-lg flex flex-col justify-between"
              >
                <h3 className="text-3xl font-bold">Imagery</h3>
                <div className="flex items-end justify-end h-full">
                  <div className="bg-[#D8A0BA] w-32 h-24 rounded-lg relative overflow-hidden">
                    <div className="absolute left-4 top-4 w-4 h-4 rounded-full bg-[#E54E9A]"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#E54E9A] rounded-t-full"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
