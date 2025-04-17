import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/UI/Button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const colorBlockVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center bg-dropbox-blue text-white overflow-hidden"
      id="brand"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-dropbox-purple opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-dropbox-yellow opacity-20 blur-xl"></div>
        <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-dropbox-red opacity-20 blur-xl"></div>
      </motion.div>
      
      <motion.div 
        className="container-custom relative z-10 text-center px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          variants={childVariants}
        >
          Dropbox Brand System
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90"
          variants={childVariants}
        >
          Design for impact. Build for everyone. Create experiences that people love.
        </motion.p>
        
        <motion.div variants={childVariants}>
          <Button 
            label="Get Started" 
            variant="secondary" 
            href="/#about" 
            size="large"
          />
        </motion.div>
        
        {/* Color blocks showcase */}
        <motion.div 
          className="mt-16 flex flex-wrap justify-center gap-4 md:gap-8"
          variants={colorBlockVariants}
        >
          <div className="color-block w-16 h-16 md:w-24 md:h-24 bg-white rounded-xl shadow-lg"></div>
          <div className="color-block w-16 h-16 md:w-24 md:h-24 bg-dropbox-red rounded-xl shadow-lg"></div>
          <div className="color-block w-16 h-16 md:w-24 md:h-24 bg-dropbox-yellow rounded-xl shadow-lg"></div>
          <div className="color-block w-16 h-16 md:w-24 md:h-24 bg-dropbox-green rounded-xl shadow-lg"></div>
          <div className="color-block w-16 h-16 md:w-24 md:h-24 bg-dropbox-purple rounded-xl shadow-lg"></div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div 
          className="w-6 h-10 rounded-full border-2 border-white flex justify-center items-start p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </motion.div>
        <p className="text-sm mt-2 text-center font-light">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;
