import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentViewIndex, setCurrentViewIndex] = useState(0); // Start with first view
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [transitionPhase, setTransitionPhase] = useState(0);
  
  // For the intermediate view with appearing colored boxes
  const [showColoredBoxes, setShowColoredBoxes] = useState({
    orange: false,
    blue: false,
    cyan: false,
    yellow: false,
  });
  
  // Scroll and wheel event handlers
  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      if (isScrolling) return;
      e.preventDefault();
      
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 400);
      
      if (e.deltaY > 0) {
        // Scrolling down
        if (currentViewIndex === 0) {
          setCurrentViewIndex(1); // Go to blue box
        } else if (currentViewIndex === 1) {
          // If we're at the blue box view, start showing colored boxes one by one
          if (transitionPhase === 0) {
            setTransitionPhase(1);
            setShowColoredBoxes(prev => ({ ...prev, orange: true }));
          } else if (transitionPhase === 1) {
            setTransitionPhase(2);
            setShowColoredBoxes(prev => ({ ...prev, cyan: true }));
          } else if (transitionPhase === 2) {
            setTransitionPhase(3);
            setShowColoredBoxes(prev => ({ ...prev, yellow: true }));
          } else if (transitionPhase === 3) {
            // Once all colored boxes are shown, move to the grid view
            setCurrentViewIndex(2);
            setTransitionPhase(0);
          }
        }
      } else if (e.deltaY < 0) {
        // Scrolling up
        if (currentViewIndex === 2) {
          // From grid to colored boxes transition
          setCurrentViewIndex(1);
          setTransitionPhase(3);
          setShowColoredBoxes({ orange: true, blue: true, cyan: true, yellow: true });
        } else if (currentViewIndex === 1) {
          if (transitionPhase === 3) {
            setTransitionPhase(2);
            setShowColoredBoxes(prev => ({ ...prev, yellow: false }));
          } else if (transitionPhase === 2) {
            setTransitionPhase(1);
            setShowColoredBoxes(prev => ({ ...prev, cyan: false }));
          } else if (transitionPhase === 1) {
            setTransitionPhase(0);
            setShowColoredBoxes({ orange: false, blue: false, cyan: false, yellow: false });
          } else if (transitionPhase === 0) {
            setCurrentViewIndex(0); // Go back to first view
          }
        }
      }
    };
    
    const touchStartHandler = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientY);
    };
    
    const touchMoveHandler = (e: TouchEvent) => {
      if (isScrolling) return;
      
      const touchEnd = e.touches[0].clientY;
      const diff = touchStart - touchEnd;
      
      if (Math.abs(diff) > 30) {
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 400);
        
        if (diff > 0) {
          // Swiping up (scrolling down)
          if (currentViewIndex === 0) {
            setCurrentViewIndex(1); // Go to blue box
          } else if (currentViewIndex === 1) {
            if (transitionPhase === 0) {
              setTransitionPhase(1);
              setShowColoredBoxes(prev => ({ ...prev, orange: true }));
            } else if (transitionPhase === 1) {
              setTransitionPhase(2);
              setShowColoredBoxes(prev => ({ ...prev, cyan: true }));
            } else if (transitionPhase === 2) {
              setTransitionPhase(3);
              setShowColoredBoxes(prev => ({ ...prev, yellow: true }));
            } else if (transitionPhase === 3) {
              setCurrentViewIndex(2);
              setTransitionPhase(0);
            }
          }
        } else if (diff < 0) {
          // Swiping down (scrolling up)
          if (currentViewIndex === 2) {
            setCurrentViewIndex(1);
            setTransitionPhase(3);
            setShowColoredBoxes({ orange: true, blue: true, cyan: true, yellow: true });
          } else if (currentViewIndex === 1) {
            if (transitionPhase === 3) {
              setTransitionPhase(2);
              setShowColoredBoxes(prev => ({ ...prev, yellow: false }));
            } else if (transitionPhase === 2) {
              setTransitionPhase(1);
              setShowColoredBoxes(prev => ({ ...prev, cyan: false }));
            } else if (transitionPhase === 1) {
              setTransitionPhase(0);
              setShowColoredBoxes({ orange: false, blue: false, cyan: false, yellow: false });
            } else if (transitionPhase === 0) {
              setCurrentViewIndex(0);
            }
          }
        }
        
        setTouchStart(touchEnd);
      }
    };
    
    // For keyboard navigation
    const keyHandler = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 400);
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentViewIndex === 0) {
          setCurrentViewIndex(1);
        } else if (currentViewIndex === 1) {
          if (transitionPhase === 0) {
            setTransitionPhase(1);
            setShowColoredBoxes(prev => ({ ...prev, orange: true }));
          } else if (transitionPhase === 1) {
            setTransitionPhase(2);
            setShowColoredBoxes(prev => ({ ...prev, cyan: true }));
          } else if (transitionPhase === 2) {
            setTransitionPhase(3);
            setShowColoredBoxes(prev => ({ ...prev, yellow: true }));
          } else if (transitionPhase === 3) {
            setCurrentViewIndex(2);
            setTransitionPhase(0);
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentViewIndex === 2) {
          setCurrentViewIndex(1);
          setTransitionPhase(3);
          setShowColoredBoxes({ orange: true, blue: true, cyan: true, yellow: true });
        } else if (currentViewIndex === 1) {
          if (transitionPhase === 3) {
            setTransitionPhase(2);
            setShowColoredBoxes(prev => ({ ...prev, yellow: false }));
          } else if (transitionPhase === 2) {
            setTransitionPhase(1);
            setShowColoredBoxes(prev => ({ ...prev, cyan: false }));
          } else if (transitionPhase === 1) {
            setTransitionPhase(0);
            setShowColoredBoxes({ orange: false, blue: false, cyan: false, yellow: false });
          } else if (transitionPhase === 0) {
            setCurrentViewIndex(0);
          }
        }
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
  }, [isScrolling, touchStart, currentViewIndex, transitionPhase]);

  return (
    <div className="relative bg-white h-screen overflow-hidden" ref={containerRef}>
      <Header />
      
      <main className="h-screen w-screen">
        {/* View 1: Initial Text */}
        <AnimatePresence>
          {currentViewIndex === 0 && (
            <motion.section
              key="initialView"
              className="absolute inset-0 h-screen w-screen flex flex-col items-center justify-center px-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <svg width="48" height="48" viewBox="0 0 40 40" fill="#0061FE">
                  <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
                  <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
                  <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
                  <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
                </svg>
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Dropbox Brand Assets
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-600 max-w-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Everything you need to represent Dropbox in your materials.
              </motion.p>
              
              {/* Scroll indicator */}
              <motion.div
                className="absolute bottom-10 text-dropbox-blue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ 
                  opacity: { delay: 1, duration: 0.5 },
                  y: { repeat: Infinity, duration: 1.5 } 
                }}
              >
                <p className="text-sm">Scroll to explore</p>
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
        
        {/* View 2: Blue Box and Transition */}
        <AnimatePresence>
          {currentViewIndex === 1 && (
            <motion.section
              key="blueBoxView"
              className="absolute inset-0 h-screen w-screen flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-white">
                  {/* Animated colored boxes in each corner */}
                  <AnimatePresence>
                    {showColoredBoxes.orange && (
                      <motion.div
                        className="absolute left-0 top-0 w-1/4 h-1/4 bg-[#FF7F32] rounded-lg"
                        initial={{ x: -100, y: -100, opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        exit={{ x: -100, y: -100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showColoredBoxes.blue && (
                      <motion.div
                        className="absolute right-0 top-0 w-1/4 h-1/4 bg-[#4ABFED] rounded-lg"
                        initial={{ x: 100, y: -100, opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        exit={{ x: 100, y: -100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showColoredBoxes.cyan && (
                      <motion.div
                        className="absolute right-0 bottom-0 w-1/4 h-1/4 bg-[#FF5D52] rounded-lg"
                        initial={{ x: 100, y: 100, opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        exit={{ x: 100, y: 100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showColoredBoxes.yellow && (
                      <motion.div
                        className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-[#FFCC02] rounded-lg"
                        initial={{ x: -100, y: 100, opacity: 0 }}
                        animate={{ x: 0, y: 0, opacity: 1 }}
                        exit={{ x: -100, y: 100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Center Blue Box - Always present in this view */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                      className="bg-dropbox-blue text-white flex flex-col justify-between p-8 rounded-lg"
                      style={{
                        width: "min(520px, 80vw)",
                        height: "min(520px, 80vh)",
                        maxWidth: "calc(100% - 40px)",
                        maxHeight: "calc(100% - 40px)"
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ 
                        scale: transitionPhase === 3 ? 0.9 : 0.5, 
                        opacity: transitionPhase === 3 ? 0.5 : 0
                      }}
                      transition={{ 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                      layoutId={transitionPhase === 3 ? "color-card" : undefined}
                    >
                      <motion.h2
                        className="text-xl md:text-2xl font-bold"
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
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <svg width="32" height="32" viewBox="0 0 40 40" fill="white">
                          <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
                          <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
                          <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
                          <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>
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
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        
        {/* View 3: Final Brand Grid */}
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
                    layoutId="color-card"
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