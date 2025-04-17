import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/UI/Button';

const GuidelinesSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Guidelines categories
  const guidelines = [
    {
      title: "Logo Usage",
      icon: "M20 7h-3V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v-2H4V4h11v3h-3v13L20 7z",
      description: "Guidelines for proper logo placement, sizing, and usage scenarios.",
    },
    {
      title: "Color Application",
      icon: "M9 3c-4.18 0-8 3.82-8 8H0l4 4 4-4H5c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4c-1.06 0-2.03-.4-2.76-1.06L5.23 15c1.15.96 2.63 1.55 4.25 1.55C13.64 16.5 17 13.14 17 9s-3.36-6-8-6Z",
      description: "How to apply our color palette effectively across different media.",
    },
    {
      title: "Typography",
      icon: "M9.25 22L9.25 6 2.75 6 2.75 10 4.75 10 4.75 6 7.25 6 7.25 22zM14.75 6L14.75 22 21.25 22 21.25 18 19.25 18 19.25 22 16.75 22 16.75 6z",
      description: "Font specifications, hierarchy, and typographic principles.",
    },
    {
      title: "Imagery Style",
      icon: "M3 5a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3zm0 2h14v10H3V7zm12 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM4 15l4-4 2 2 6-6 2 2v6H4v-4z",
      description: "Photography, illustration, and iconography guidelines.",
    },
    {
      title: "Voice & Tone",
      icon: "M8 2v14H1V2h7zm0 2H3v10h5V4zm12.5 8.69L19 14V9l9-4-9-4v5l1.5 0.81C20.41 6.29 19.78 6 19 6h-2V0h-2v6h-2c-0.78 0-1.41 0.29-1.5 0.81L13 6V1L4 5l9 4v-5l-1.5-0.81C11.59 3.71 12.22 4 13 4h2v16h2V4h2c0.78 0 1.41-0.29 1.5-0.81z",
      description: "How to communicate in the Dropbox brand voice across channels.",
    },
    {
      title: "UI Components",
      icon: "M4 1h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm0 2v12h16V3H4zm18 17H2v2h20v-2zM12 20a1 1 0 100-2 1 1 0 000 2z",
      description: "Reusable interface components and interaction patterns.",
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="guidelines" 
      className="relative py-24 md:py-32 bg-dropbox-light-blue overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{ y, opacity }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="none"/>
            <circle cx="5" cy="5" r="1" fill="#0061FF" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.p 
            className="text-dropbox-blue font-medium mb-2"
            variants={itemVariants}
          >
            USAGE GUIDELINES
          </motion.p>
          <motion.h2 
            className="section-title text-dropbox-black mb-4"
            variants={itemVariants}
          >
            How to Use Our Brand
          </motion.h2>
          <motion.p 
            className="text-xl text-dropbox-gray max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Our brand guidelines ensure consistent representation of Dropbox across all touchpoints and channels.
          </motion.p>
        </motion.div>
        
        {/* Guidelines Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {guidelines.map((guideline) => (
            <motion.div 
              key={guideline.title}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-dropbox-light-blue rounded-full flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#0061FF">
                  <path d={guideline.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{guideline.title}</h3>
              <p className="text-dropbox-gray">{guideline.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Contact / Get Started Section */}
        <motion.div 
          className="mt-20 md:mt-32 bg-white rounded-xl p-8 md:p-12 shadow-xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          id="contact"
        >
          <motion.h3 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Ready to Start?
          </motion.h3>
          <motion.p 
            className="text-xl text-dropbox-gray max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            Have questions about implementing our brand guidelines? Our team is here to help you create exceptional experiences.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Button 
              label="Download Guidelines" 
              variant="primary" 
              href="/#" 
              size="large"
            />
            <Button 
              label="Contact Brand Team" 
              variant="secondary" 
              href="/#" 
              size="large"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
