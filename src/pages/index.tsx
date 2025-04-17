import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  
  // Get scroll progress for parallax animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // More aggressive scroll handling to ensure transitions work
  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      if (isScrolling) return;
      
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 500); // Shorter timeout for more responsive scrolling
      
      if (e.deltaY > 0) {
        // Scrolling down
        setCurrentViewIndex(prev => Math.min(prev + 1, 2));
      } else if (e.deltaY < 0) {
        // Scrolling up
        setCurrentViewIndex(prev => Math.max(prev - 1, 0));
      }
    };
    
    const touchStartHandler = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientY);
    };
    
    const touchMoveHandler = (e: TouchEvent) => {
      if (isScrolling) return;
      
      const touchEnd = e.touches[0].clientY;
      const diff = touchStart - touchEnd;
      
      // Detecting a smaller swipe for better responsiveness
      if (Math.abs(diff) > 30) {
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 500);
        
        if (diff > 0) {
          // Swiping up
          setCurrentViewIndex(prev => Math.min(prev + 1, 2));
        } else if (diff < 0) {
          // Swiping down
          setCurrentViewIndex(prev => Math.max(prev - 1, 0));
        }
        
        setTouchStart(touchEnd);
      }
    };
    
    // Add keyboard navigation for accessibility and testing
    const keyHandler = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 500);
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        setCurrentViewIndex(prev => Math.min(prev + 1, 2));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        setCurrentViewIndex(prev => Math.max(prev - 1, 0));
      }
    };
    
    window.addEventListener('wheel', wheelHandler, { passive: false });
    window.addEventListener('touchstart', touchStartHandler);
    window.addEventListener('touchmove', touchMoveHandler);
    window.addEventListener('keydown', keyHandler);
    
    return () => {
      window.removeEventListener('wheel', wheelHandler);
      window.removeEventListener('touchstart', touchStartHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
      window.removeEventListener('keydown', keyHandler);
    };
  }, [isScrolling, touchStart]);

  const gridLayout = [
    { gridArea: "framework", title: "Framework", color: "#2D3748" },
    { gridArea: "voice", title: "Voice & Tone", color: "#FFCC02" },
    { gridArea: "logo", title: "Logo", color: "#4ABFED" },
    { gridArea: "iconography", title: "Iconography", color: "#A2CD3A" },
    { gridArea: "color", title: "Color", color: "#FF7F32" },
    { gridArea: "typo", title: "Typography", color: "#FF5D52" },
    { gridArea: "motion", title: "Motion", color: "#C881F2" },
    { gridArea: "imagery", title: "Imagery", color: "#1E1E1E" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative bg-white h-screen overflow-hidden"
    >
      <Header />

      {/* Light grid background - always visible */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-10">
        <div className="w-full h-full grid grid-cols-6 gap-[1px]">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border border-gray-200"></div>
          ))}
        </div>
      </div>

      <main className="h-screen">
        {/* View 1: Hero Text */}
        <AnimatePresence mode="wait">
          {currentViewIndex === 0 && (
            <motion.section
              key="hero"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <div className="container mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-dropbox-blue font-bold text-4xl md:text-6xl max-w-3xl mx-auto mb-12"
                >
                  At Dropbox, our Brand Guidelines help us infuse everything we make with identity.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="flex justify-center"
                >
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 40 40" 
                    fill="#0061FF"
                    className="animate-pulse"
                  >
                    <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
                    <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
                    <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
                    <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
                  </svg>
                </motion.div>
                
                {/* Scroll indicator */}
                <motion.div
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-dropbox-blue"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, 10, 0] }}
                  transition={{ 
                    opacity: { delay: 1, duration: 0.5 },
                    y: { repeat: Infinity, duration: 1.5 } 
                  }}
                >
                  <p className="text-sm">Scroll down</p>
                  <div className="flex justify-center mt-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 13l5 5 5-5" />
                      <path d="M7 7l5 5 5-5" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* View 2: Blue Box */}
        <AnimatePresence mode="wait">
          {currentViewIndex === 1 && (
            <motion.section
              key="blueBox"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                {/* Empty left column on desktop */}
                <div className="hidden md:block"></div>
                
                {/* Center blue box column */}
                <motion.div
                  className="bg-dropbox-blue text-white p-8 rounded-none flex flex-col justify-center self-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  style={{ aspectRatio: "1/1", minHeight: "350px" }}
                >
                  <motion.h2
                    className="text-xl md:text-3xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    From icons to illustration, logos to language, this collection is the foundation for how Dropbox looks, feels, and sounds like Dropbox.
                  </motion.h2>
                  
                  <motion.div
                    className="mt-auto flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="white">
                      <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
                      <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
                      <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
                      <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
                    </svg>
                  </motion.div>
                </motion.div>
                
                {/* Empty right column on desktop */}
                <div className="hidden md:block"></div>
              </div>
              
              {/* Scroll indicator */}
              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-dropbox-blue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ 
                  opacity: { delay: 1, duration: 0.5 },
                  y: { repeat: Infinity, duration: 1.5 } 
                }}
              >
                <p className="text-sm">Continue scrolling</p>
                <div className="flex justify-center mt-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 13l5 5 5-5" />
                    <path d="M7 7l5 5 5-5" />
                  </svg>
                </div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* View 3: Brand Grid */}
        <AnimatePresence mode="wait">
          {currentViewIndex === 2 && (
            <motion.section
              key="brandGrid"
              className="absolute inset-0 flex items-start justify-center pt-20 pb-10 px-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto">
                {/* Grid layout matching the screenshot exactly */}
                <div 
                  className="grid grid-cols-4 gap-4 max-w-6xl mx-auto"
                  style={{
                    gridTemplateAreas: `
                      "framework voice voice logo"
                      "framework color color typo"
                      "iconography color color motion"
                      "iconography imagery imagery imagery"
                    `,
                    gridTemplateRows: "repeat(4, minmax(150px, 1fr))",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    minHeight: "80vh"
                  }}
                >
                  {/* Framework Card */}
                  <motion.div
                    className="bg-[#2D3748] text-white p-6 rounded-none flex flex-col"
                    style={{ gridArea: "framework" }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Framework</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.svg
                        viewBox="0 0 100 100"
                        className="w-full h-full max-w-[120px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <motion.circle 
                          cx="20" 
                          cy="20" 
                          r="4" 
                          fill="white" 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                        />
                        <motion.circle 
                          cx="50" 
                          cy="50" 
                          r="4" 
                          fill="white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.6 }} 
                        />
                        <motion.circle 
                          cx="20" 
                          cy="80" 
                          r="4" 
                          fill="white" 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.7 }}
                        />
                        <motion.line 
                          x1="20" 
                          y1="20" 
                          x2="50" 
                          y2="50" 
                          stroke="white" 
                          strokeWidth="1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                        />
                        <motion.line 
                          x1="50" 
                          y1="50" 
                          x2="20" 
                          y2="80" 
                          stroke="white" 
                          strokeWidth="1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 1 }}
                        />
                      </motion.svg>
                    </div>
                  </motion.div>

                  {/* Voice & Tone Card */}
                  <motion.div
                    className="bg-[#FFCC02] text-[#553611] p-6 rounded-none flex flex-col"
                    style={{ gridArea: "voice" }}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Voice & Tone</h3>
                    <div className="flex-1 flex items-center justify-between">
                      <motion.span
                        className="text-7xl font-serif"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        "
                      </motion.span>
                      <motion.span
                        className="text-7xl font-serif self-end"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        "
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Logo Card */}
                  <motion.div
                    className="bg-[#4ABFED] text-white p-6 rounded-none flex flex-col"
                    style={{ gridArea: "logo" }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Logo</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.svg
                        viewBox="0 0 40 40"
                        className="w-20 h-20"
                        fill="currentColor"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 200,
                          delay: 0.5
                        }}
                        whileHover={{ 
                          rotate: 360,
                          transition: { duration: 1.5 }
                        }}
                      >
                        <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
                        <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
                        <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
                        <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
                      </motion.svg>
                    </div>
                  </motion.div>

                  {/* Iconography Card */}
                  <motion.div
                    className="bg-[#A2CD3A] text-[#2D3748] p-6 rounded-none flex flex-col"
                    style={{ gridArea: "iconography" }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Iconography</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.svg
                        viewBox="0 0 60 60"
                        className="w-16 h-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <motion.rect
                          x="10"
                          y="15"
                          width="40"
                          height="30"
                          rx="3"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.7 }}
                        />
                        <motion.path
                          d="M30 15 L30 5"
                          stroke="currentColor"
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 1 }}
                        />
                        <motion.path
                          d="M20 45 L40 45"
                          stroke="currentColor"
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                        />
                      </motion.svg>
                    </div>
                  </motion.div>

                  {/* Color Card */}
                  <motion.div
                    className="bg-[#FF7F32] text-[#4A2400] p-6 rounded-none flex flex-col"
                    style={{ gridArea: "color" }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Color</h3>
                    <div className="flex-1 flex items-end justify-end">
                      <div className="grid grid-cols-2 gap-4">
                        <motion.div
                          className="bg-[#c05c2e] rounded-none w-12 h-12"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3, delay: 0.6 }}
                        ></motion.div>
                        <motion.div
                          className="bg-[#a84c26] rounded-none w-12 h-12"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3, delay: 0.7 }}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Typography Card */}
                  <motion.div
                    className="bg-[#FF5D52] text-[#4A1A16] p-6 rounded-none flex flex-col"
                    style={{ gridArea: "typo" }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Typography</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.span
                        className="text-6xl font-serif"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 100,
                          delay: 0.5 
                        }}
                      >
                        Aa
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Motion Card */}
                  <motion.div
                    className="bg-[#C881F2] text-[#3F185C] p-6 rounded-none flex flex-col"
                    style={{ gridArea: "motion" }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Motion</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.svg
                        viewBox="0 0 60 60"
                        className="w-16 h-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <motion.circle cx="10" cy="10" r="3" fill="currentColor" />
                        <motion.circle cx="50" cy="10" r="3" fill="currentColor" />
                        <motion.circle cx="10" cy="50" r="3" fill="currentColor" />
                        <motion.circle cx="50" cy="50" r="3" fill="currentColor" />
                        <motion.path
                          d="M10,10 C30,0 40,20 50,10 C60,30 40,50 50,50 C30,60 20,40 10,50 C0,30 20,10 10,10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
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
                      </motion.svg>
                    </div>
                  </motion.div>

                  {/* Imagery Card */}
                  <motion.div
                    className="bg-[#1E1E1E] text-white p-6 rounded-none flex flex-col"
                    style={{ gridArea: "imagery" }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <h3 className="text-xl font-bold mb-4">Imagery</h3>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div
                        className="w-32 h-24 relative overflow-hidden border border-white/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <motion.div 
                          className="absolute w-full h-full bg-white/10"
                          initial={{ y: '100%' }}
                          animate={{ y: ['100%', '0%', '100%'] }}
                          transition={{ 
                            duration: 5, 
                            repeat: Infinity,
                            repeatType: "loop" 
                          }}
                        />
                        <motion.div 
                          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/30"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
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
