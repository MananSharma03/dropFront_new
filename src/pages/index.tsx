import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

const HomePage = () => {
  const containerRef = useRef(null);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  
  // Get scroll progress for parallax animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll and wheel event handler
  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      if (isScrolling) return;
      
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 800);
      
      if (e.deltaY > 0) {
        // Scrolling down
        setCurrentViewIndex(prev => {
          if (prev === 0) {
            // Going from title to blue box
            return 1;
          } else if (prev === 1) {
            // Going from blue box to grid
            setShowGrid(true);
            return 2;
          }
          return prev;
        });
      } else if (e.deltaY < 0 && currentViewIndex > 0) {
        // Scrolling up
        setCurrentViewIndex(prev => {
          if (prev === 2) {
            // Going from grid to blue box
            setShowGrid(false);
            return 1;
          } else if (prev === 1) {
            // Going from blue box to title
            return 0;
          }
          return prev;
        });
      }
    };
    
    const touchStartHandler = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientY);
    };
    
    const touchMoveHandler = (e: TouchEvent) => {
      if (isScrolling) return;
      
      const touchEnd = e.touches[0].clientY;
      const diff = touchStart - touchEnd;
      
      // Detecting a significant swipe
      if (Math.abs(diff) > 50) {
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 800);
        
        if (diff > 0) {
          // Swiping up
          setCurrentViewIndex(prev => {
            if (prev === 0) {
              // Going from title to blue box
              return 1;
            } else if (prev === 1) {
              // Going from blue box to grid
              setShowGrid(true);
              return 2;
            }
            return prev;
          });
        } else if (diff < 0 && currentViewIndex > 0) {
          // Swiping down
          setCurrentViewIndex(prev => {
            if (prev === 2) {
              // Going from grid to blue box
              setShowGrid(false);
              return 1;
            } else if (prev === 1) {
              // Going from blue box to title
              return 0;
            }
            return prev;
          });
        }
        
        setTouchStart(touchEnd);
      }
    };
    
    window.addEventListener('wheel', wheelHandler);
    window.addEventListener('touchstart', touchStartHandler);
    window.addEventListener('touchmove', touchMoveHandler);
    
    return () => {
      window.removeEventListener('wheel', wheelHandler);
      window.removeEventListener('touchstart', touchStartHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
    };
  }, [currentViewIndex, isScrolling, touchStart]);

  // Calculate grid animation timing
  const gridElementDelay = (index: number): number => {
    // Grid animations come from all 4 sides to center
    const row = Math.floor(index / 3);
    const col = index % 3;
    const distanceFromCenter = Math.sqrt(Math.pow(row - 1, 2) + Math.pow(col - 1, 2));
    return 0.2 + (distanceFromCenter * 0.1);
  };

  // Brand element definitions
  const brandElements = [
    {
      title: "Framework",
      color: "#2D3748",
      textColor: "white",
      icon: (
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 120 120"
          initial={{ pathLength: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <circle cx="20" cy="20" r="6" fill="white" />
          <circle cx="100" cy="60" r="6" fill="white" />
          <circle cx="20" cy="100" r="6" fill="white" />
          <motion.line
            x1="20"
            y1="20"
            x2="100"
            y2="60"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.line
            x1="100"
            y1="60"
            x2="20"
            y2="100"
            stroke="white"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.svg>
      ),
      span: { colSpan: 1, rowSpan: 2 },
    },
    {
      title: "Voice & Tone",
      color: "#FFCC02",
      textColor: "#553611",
      icon: (
        <div className="flex items-center justify-between h-full">
          <motion.span
            className="text-9xl font-serif"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.2, x: -10 }}
            transition={{ duration: 0.5 }}
          >
            "
          </motion.span>
          <motion.span
            className="text-9xl font-serif self-end"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.2, x: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            "
          </motion.span>
        </div>
      ),
      span: { colSpan: 2, rowSpan: 1 },
    },
    {
      title: "Logo",
      color: "#4ABFED",
      textColor: "white",
      icon: (
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 120 120"
          fill="currentColor"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          whileHover={{ 
            scale: 1.2,
            transition: { 
              type: "spring",
              stiffness: 300
            }
          }}
          transition={{ duration: 0.5 }}
        >
          <path d="M37.5 7.5L7.5 37.5V75L37.5 45V7.5Z" />
          <path d="M82.5 7.5L112.5 37.5V75L82.5 45V7.5Z" />
          <path d="M37.5 112.5L7.5 82.5V45L37.5 75V112.5Z" />
          <path d="M82.5 112.5L112.5 82.5V45L82.5 75V112.5Z" />
        </motion.svg>
      ),
      span: { colSpan: 1, rowSpan: 1 },
    },
    {
      title: "Iconography",
      color: "#A2CD3A",
      textColor: "#2D3748",
      icon: (
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{
            scale: 1.1,
            transition: { 
              type: "spring",
              stiffness: 400,
              damping: 10
            }
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.rect
            x="20"
            y="20"
            width="60"
            height="50"
            rx="5"
            strokeWidth="5"
            stroke="currentColor"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.rect
            x="40"
            y="45"
            width="20"
            height="25"
            rx="2"
            fill="currentColor"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          <motion.path
            d="M50 40 A10 10 0 1 0 60 50"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </motion.svg>
      ),
      span: { colSpan: 1, rowSpan: 1 },
    },
    {
      title: "Color",
      color: "#FF7F32",
      textColor: "#4A2400",
      icon: (
        <div className="flex items-end justify-end h-full">
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="bg-[#c05c2e] rounded-lg w-16 h-16"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ y: -5, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.div
              className="bg-[#a84c26] rounded-lg w-16 h-16"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ y: -5, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3, delay: 0.2 }}
            ></motion.div>
          </div>
        </div>
      ),
      span: { colSpan: 2, rowSpan: 1 },
    },
    {
      title: "Typography",
      color: "#FF5D52",
      textColor: "#4A1A16",
      icon: (
        <motion.div
          className="flex items-center justify-center h-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="text-8xl font-serif"
            initial={{ scale: 0.5 }}
            whileInView={{ scale: 1 }}
            whileHover={{ 
              scale: 1.2,
              transition: { 
                type: "spring",
                stiffness: 200
              }
            }}
            transition={{ duration: 0.5 }}
          >
            Aa
          </motion.span>
        </motion.div>
      ),
      span: { colSpan: 1, rowSpan: 1 },
    },
    {
      title: "Motion",
      color: "#C881F2",
      textColor: "#3F185C",
      icon: (
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 120 120"
          fill="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.circle cx="20" cy="20" r="6" fill="currentColor" />
          <motion.circle cx="100" cy="20" r="6" fill="currentColor" />
          <motion.circle cx="60" cy="60" r="6" fill="currentColor" />
          <motion.circle cx="20" cy="100" r="6" fill="currentColor" />
          <motion.circle cx="100" cy="100" r="6" fill="currentColor" />
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
      ),
      span: { colSpan: 1, rowSpan: 1 },
    },
    {
      title: "Imagery",
      color: "#1E1E1E",
      textColor: "white",
      icon: (
        <div className="flex items-end justify-end h-full">
          <motion.div
            className="bg-[#D8A0BA] w-32 h-24 rounded-lg relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute left-4 top-4 w-4 h-4 rounded-full bg-white"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            ></motion.div>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-full"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            ></motion.div>
          </motion.div>
        </div>
      ),
      span: { colSpan: 2, rowSpan: 1 },
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden bg-white h-screen"
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
        <AnimatePresence>
          {currentViewIndex === 0 && (
            <motion.section
              key="hero"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
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
        <AnimatePresence>
          {currentViewIndex === 1 && (
            <motion.section
              key="blueBox"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <div className="container mx-auto px-6 grid grid-cols-3 gap-4 h-full">
                <div className="hidden md:block"></div>
                <motion.div
                  className="bg-dropbox-blue text-white p-8 rounded-none flex flex-col justify-center col-span-3 md:col-span-1 self-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  style={{ aspectRatio: "1/1", minHeight: "350px" }}
                >
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold mb-6"
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
        <AnimatePresence>
          {currentViewIndex === 2 && (
            <motion.section
              key="brandGrid"
              className="absolute inset-0 flex items-center justify-center py-16 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                  {brandElements.map((element, index) => (
                    <motion.div
                      key={element.title}
                      className={`relative ${element.color} text-${element.textColor} p-6 rounded-md flex flex-col`}
                      style={{ 
                        gridColumn: `span ${element.span.colSpan || 1}`,
                        gridRow: `span ${element.span.rowSpan || 1}`,
                        aspectRatio: index === 0 ? "1/2" : "1/1"
                      }}
                      initial={{ 
                        scale: 0.8, 
                        opacity: 0,
                        y: [50, 0],
                        x: index % 2 === 0 ? -50 : 50 
                      }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        y: 0,
                        x: 0 
                      }}
                      whileHover={{ 
                        scale: 0.98,
                        transition: { duration: 0.2 } 
                      }}
                      transition={{
                        delay: gridElementDelay(index),
                        duration: 0.6
                      }}
                    >
                      <h3 className="text-xl md:text-2xl font-bold mb-4">{element.title}</h3>
                      <div className="flex-1 flex items-center justify-center">
                        {element.icon}
                      </div>
                    </motion.div>
                  ))}
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
