import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/UI/Button';

const ResourcesSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
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

  // Resource categories
  const resourceCategories = [
    {
      title: "Logo Guidelines",
      description: "Download approved logo files and learn how to use them correctly",
      image: "logo-guidelines",
      link: "/#"
    },
    {
      title: "Color System",
      description: "Explore our color palette and guidelines for proper usage",
      image: "color-system",
      link: "/#"
    },
    {
      title: "Typography",
      description: "Learn about our typefaces and how to apply them consistently",
      image: "typography",
      link: "/#"
    },
    {
      title: "Photography",
      description: "Guidelines for selecting and editing photos for Dropbox projects",
      image: "photography",
      link: "/#"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="resources" 
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{ y }}
      >
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-dropbox-blue rounded-t-3xl transform translate-y-1/4"></div>
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
            className="text-dropbox-red font-medium mb-2"
            variants={itemVariants}
          >
            BRAND RESOURCES
          </motion.p>
          <motion.h2 
            className="section-title text-dropbox-black mb-4"
            variants={itemVariants}
          >
            Everything You Need
          </motion.h2>
          <motion.p 
            className="text-xl text-dropbox-gray max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Access our brand assets, guidelines and tools to ensure consistent implementation across all touch points.
          </motion.p>
        </motion.div>
        
        {/* Resources Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {resourceCategories.map((resource, index) => (
            <motion.a 
              key={resource.title}
              href={resource.link}
              className="block group"
              variants={itemVariants}
            >
              <div className="bg-dropbox-light-gray rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg">
                <div className="h-48 relative overflow-hidden">
                  {/* Static representation of resource image */}
                  <div className={`absolute inset-0 ${getBackgroundForResource(resource.image)} transition-transform duration-500 group-hover:scale-105`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {getIconForResource(resource.image)}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-dropbox-blue transition-colors">{resource.title}</h3>
                  <p className="text-dropbox-gray mb-4">{resource.description}</p>
                  <span className="text-dropbox-blue font-medium flex items-center">
                    Explore
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
        
        {/* Design System Showcase */}
        <motion.div 
          className="mt-20 md:mt-32 bg-dropbox-dark-blue text-white rounded-xl overflow-hidden shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <motion.div 
              className="p-8 md:p-12 flex flex-col justify-center"
              variants={itemVariants}
            >
              <h3 className="text-3xl font-bold mb-6">Dropbox Design System</h3>
              <p className="mb-4 opacity-90">
                Our complete design system helps teams create consistent, high-quality experiences across all Dropbox products.
              </p>
              <p className="mb-6 opacity-90">
                Access components, guidelines, and tools to streamline your workflow and maintain brand consistency.
              </p>
              <div>
                <Button 
                  label="Explore The System" 
                  variant="secondary" 
                  href="/#" 
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-dropbox-blue h-80 md:h-auto relative overflow-hidden"
              variants={itemVariants}
            >
              {/* Static illustration of design system elements */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  {/* Design system elements representation */}
                  <div className="absolute top-4 left-4 bg-white opacity-80 w-20 h-20 rounded-lg"></div>
                  <div className="absolute top-4 right-4 bg-dropbox-red opacity-80 w-16 h-16 rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 bg-dropbox-yellow opacity-80 w-16 h-16 rounded-lg"></div>
                  <div className="absolute bottom-4 right-4 bg-dropbox-green opacity-80 w-20 h-20 rounded-lg"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-lg">
                    <svg width="60" height="60" viewBox="0 0 40 40" fill="#0061FF">
                      <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
                      <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
                      <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
                      <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper functions to generate visual representations for resources
const getBackgroundForResource = (type: string): string => {
  switch(type) {
    case 'logo-guidelines':
      return 'bg-dropbox-blue';
    case 'color-system':
      return 'bg-gradient-to-r from-dropbox-blue via-dropbox-red to-dropbox-yellow';
    case 'typography':
      return 'bg-dropbox-black';
    case 'photography':
      return 'bg-dropbox-green';
    default:
      return 'bg-dropbox-gray';
  }
};

const getIconForResource = (type: string) => {
  switch(type) {
    case 'logo-guidelines':
      return (
        <svg width="80" height="80" viewBox="0 0 40 40" fill="white">
          <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
          <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
          <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
          <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
        </svg>
      );
    case 'color-system':
      return (
        <div className="flex space-x-3">
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div className="w-12 h-12 bg-dropbox-red rounded-full"></div>
          <div className="w-12 h-12 bg-dropbox-yellow rounded-full"></div>
        </div>
      );
    case 'typography':
      return (
        <div className="text-white font-serif space-y-2">
          <div className="text-4xl font-bold">Aa</div>
          <div className="text-lg">Sharp Sans & Sharp Serif</div>
        </div>
      );
    case 'photography':
      return (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    default:
      return null;
  }
};

export default ResourcesSection;
