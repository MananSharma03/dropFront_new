import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentViewIndex, setCurrentViewIndex] = useState(2); // Start with final grid to debug positioning
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  
  // For keyboard navigation
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 400);
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        setCurrentViewIndex(prev => Math.min(prev + 1, 2));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        setCurrentViewIndex(prev => Math.max(prev - 1, 0));
      }
    };
    
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [isScrolling]);

  return (
    <div className="relative bg-white h-screen overflow-hidden" ref={containerRef}>
      <Header />
      
      <main className="h-screen w-screen">
        {/* Final Brand Grid */}
        <AnimatePresence>
          {currentViewIndex === 2 && (
            <motion.section
              className="absolute inset-0 h-screen w-screen overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-screen w-screen absolute inset-0" 
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1fr 1fr",
                  gridTemplateRows: "1fr 1fr 1fr 1fr",
                  gridTemplateAreas: `
                    "framework voice voice logo"
                    "framework color color typography"
                    "iconography color color motion"
                    "iconography imagery imagery imagery"
                  `,
                  gap: "12px",
                  padding: "12px",
                  backgroundColor: "#ffffff"
                }}>
                
                {/* Framework Card */}
                <Link href="/#framework" className="block" style={{ gridArea: "framework" }}>
                  <motion.div 
                    className="bg-[#2D3748] text-white h-full w-full p-6 flex flex-col rounded-lg"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold">Framework</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <svg width="100" height="100" viewBox="0 0 100 100" stroke="white" strokeWidth="1" fill="none">
                        <circle cx="20" cy="20" r="4" fill="white" />
                        <circle cx="50" cy="50" r="4" fill="white" />
                        <circle cx="20" cy="80" r="4" fill="white" />
                        <line x1="20" y1="20" x2="50" y2="50" />
                        <line x1="50" y1="50" x2="20" y2="80" />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
                
                {/* Voice & Tone Card */}
                <Link href="/#voice-tone" className="block" style={{ gridArea: "voice" }}>
                  <motion.div 
                    className="bg-[#FFCC02] text-[#553611] h-full w-full p-6 flex flex-col rounded-lg"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold">Voice & Tone</h3>
                    <div className="flex-1 flex items-center justify-between">
                      <span className="text-8xl font-serif">"</span>
                      <span className="text-8xl font-serif self-end">"</span>
                    </div>
                  </motion.div>
                </Link>
                
                {/* Logo Card */}
                <Link href="/#logo" className="block" style={{ gridArea: "logo" }}>
                  <motion.div 
                    className="bg-[#4ABFED] text-white h-full w-full p-6 flex flex-col rounded-lg"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold">Logo</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                        <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
                        <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
                        <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
                        <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
                
                {/* Color Card */}
                <Link href="/#color" className="block" style={{ gridArea: "color" }}>
                  <motion.div 
                    className="bg-[#FF7F32] text-[#4A2400] h-full w-full p-6 flex flex-col rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold">Color</h3>
                    <div className="flex-1 flex items-end justify-end">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#c05c2e] w-16 h-16 rounded"></div>
                        <div className="bg-[#a84c26] w-16 h-16 rounded"></div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
                
                {/* Typography Card */}
                <Link href="/#typography" className="block" style={{ gridArea: "typography" }}>
                  <motion.div 
                    className="bg-[#FF5D52] text-[#4A1A16] h-full w-full p-6 flex flex-col rounded-lg"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold">Typography</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-7xl font-serif">Aa</span>
                    </div>
                  </motion.div>
                </Link>
                
                {/* Iconography Card */}
                <Link href="/#iconography" className="block" style={{ gridArea: "iconography" }}>
                  <motion.div 
                    className="bg-[#A2CD3A] text-[#2D3748] h-full w-full p-6 flex flex-col rounded-lg"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold">Iconography</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <svg viewBox="0 0 60 60" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="15" y="15" width="30" height="30" rx="2" />
                        <path d="M30 15 L30 5" />
                        <path d="M20 45 L40 45" />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
                
                {/* Motion Card */}
                <Link href="/#motion" className="block" style={{ gridArea: "motion" }}>
                  <motion.div 
                    className="bg-[#C881F2] text-[#3F185C] h-full w-full p-6 flex flex-col rounded-lg"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold">Motion</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <svg viewBox="0 0 60 60" width="60" height="60" stroke="currentColor" strokeWidth="1.5" fill="none">
                        <motion.path
                          d="M10,10 C30,5 40,20 50,10 C55,30 40,50 50,50 C30,55 20,40 10,50 C5,30 20,10 10,10"
                          initial={{ pathLength: 0 }}
                          animate={{ 
                            pathLength: [0, 1, 0],
                            pathOffset: [0, 0, 1] 
                          }}
                          transition={{ 
                            duration: 5, 
                            repeat: Infinity,
                            repeatType: "loop" 
                          }}
                        />
                        <circle cx="10" cy="10" r="3" fill="currentColor" />
                        <circle cx="50" cy="10" r="3" fill="currentColor" />
                        <circle cx="10" cy="50" r="3" fill="currentColor" />
                        <circle cx="50" cy="50" r="3" fill="currentColor" />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
                
                {/* Imagery Card */}
                <Link href="/#imagery" className="block" style={{ gridArea: "imagery" }}>
                  <motion.div 
                    className="bg-[#9C366B] text-white h-full w-full p-6 flex flex-col rounded-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold">Imagery</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="relative w-32 h-24 bg-[#D8A0BA] rounded overflow-hidden">
                        <div className="absolute left-4 top-4 w-4 h-4 rounded-full bg-[#E54E9A]"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#E54E9A] rounded-t-full"></div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {currentViewIndex === 2 && <Footer />}
    </div>
  );
};

export default HomePage;