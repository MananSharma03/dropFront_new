import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ColorBlock from '@/components/UI/ColorBlock';

const AboutSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], ['50px', '-50px']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0px', '-100px']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
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

  // Brand values
  const brandValues = [
    {
      title: "Simple",
      color: "bg-dropbox-red",
      description: "We create intuitive experiences that enable people to get more done with less effort."
    },
    {
      title: "Purposeful",
      color: "bg-dropbox-yellow",
      description: "We focus on the problems worth solving, and we give people tools to create extraordinary things."
    },
    {
      title: "Human",
      color: "bg-dropbox-green",
      description: "We create warm, friendly products that give people a sense of control and belonging."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none opacity-10"
        style={{ y: y1 }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#0061FF" d="M45.2,-58.2C60.9,-49.7,77.5,-38.9,83.2,-23.9C88.9,-9,83.7,10,74.2,25.1C64.7,40.2,51,51.3,36,59.8C21,68.3,4.7,74.3,-12.5,74.5C-29.8,74.7,-47.8,69,-59.8,56.4C-71.7,43.8,-77.6,24.2,-77.7,4.8C-77.8,-14.6,-72.2,-34,-60.4,-46.8C-48.7,-59.7,-30.8,-66.1,-14.4,-66.5C2,-66.9,19.3,-61.4,35.2,-58.3Z" transform="translate(100 100)" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 left-0 w-1/3 h-1/3 pointer-events-none opacity-10"
        style={{ y: y2 }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#0061FF" d="M53.6,-56.3C65.1,-44.2,67.9,-23.9,69.1,-3.8C70.3,16.4,69.9,36.4,58.9,48.8C47.9,61.1,26.2,65.8,6.8,64.7C-12.5,63.6,-29.6,56.7,-46.3,44.7C-63,32.7,-79.3,15.4,-81.2,-3.9C-83.1,-23.2,-70.7,-44.4,-54.2,-56.6C-37.7,-68.8,-17.1,-71.9,1.3,-73.1C19.7,-74.3,39.5,-73.5,53.6,-63.3Z" transform="translate(100 100)" />
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
          <motion.h2 
            className="section-title text-dropbox-black mb-4"
            variants={itemVariants}
          >
            About Our Brand
          </motion.h2>
          <motion.p 
            className="text-xl text-dropbox-gray max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Our brand is more than a logo—it's a system of building blocks that combines to convey our unique personality and vision.
          </motion.p>
        </motion.div>
        
        {/* Brand Values Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {brandValues.map((value, index) => (
            <motion.div 
              key={value.title}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <ColorBlock color={value.color} size="medium" />
              <h3 className="text-2xl font-bold mt-6 mb-4">{value.title}</h3>
              <p className="text-dropbox-gray">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Brand Story */}
        <motion.div 
          className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div 
            className="order-2 md:order-1"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold mb-6">Our Brand Story</h3>
            <p className="text-dropbox-gray mb-4">
              Since 2007, we've been focused on building products that simplify the way people work together. The world doesn't need another storage company—it needs a better way to work.
            </p>
            <p className="text-dropbox-gray mb-4">
              That's what drives us: building products that make people's lives simpler, more pleasant, and more productive.
            </p>
            <p className="text-dropbox-gray">
              Our brand identity reflects this mission with clean design, purposeful interactions, and human touches that make technology feel approachable.
            </p>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-sm h-80 rounded-xl overflow-hidden">
              {/* Static image alternative to canvas animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-dropbox-blue to-dropbox-dark-blue rounded-xl">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white opacity-30 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-dropbox-red opacity-20 animate-pulse"></div>
                
                {/* Dropbox logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="120" height="120" viewBox="0 0 40 40" fill="white">
                    <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
                    <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
                    <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
                    <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
