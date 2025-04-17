import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Card from '@/components/UI/Card';

const ProductsSection = () => {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax effects
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.15
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

  // Products data
  const products = [
    {
      title: "Dropbox",
      icon: "M6.5 22.5h-2c-1.1 0-2-.9-2-2v-15c0-1.1.9-2 2-2h15c1.1 0 2 .9 2 2v15c0 1.1-.9 2-2 2h-2",
      description: "Our core product for secure file sharing, syncing, and collaboration. Keep your files safe, synced, and easy to share.",
      color: "bg-dropbox-blue",
      link: "/#"
    },
    {
      title: "Dropbox Paper",
      icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 8V3.5L18.5 8H14z",
      description: "A collaborative workspace that helps teams create and share early ideas. Real-time editing, commenting, and organizing.",
      color: "bg-dropbox-light-blue",
      link: "/#"
    },
    {
      title: "DocSend",
      icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
      description: "Share documents securely and get real-time feedback and insights. Know when people open and engage with content.",
      color: "bg-dropbox-green",
      link: "/#"
    },
    {
      title: "HelloSign",
      icon: "M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9",
      description: "Get documents signed electronically with a secure, legal, and efficient solution. Streamline your approval processes.",
      color: "bg-dropbox-purple",
      link: "/#"
    },
    {
      title: "Dropbox Business",
      icon: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M15 2v6M9 2v6M3 10h18",
      description: "A secure collaboration platform for teams of all sizes. Centralize company data with advanced sharing controls.",
      color: "bg-dropbox-red",
      link: "/#"
    },
    {
      title: "Dropbox Sign",
      icon: "M12 5v14M5 12h14",
      description: "Add electronic signatures to your documents quickly and easily. Make signing agreements simple and secure.",
      color: "bg-dropbox-yellow",
      link: "/#"
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      id="products" 
      className="relative py-24 md:py-32 bg-dropbox-light-gray overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{ x }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-dropbox-blue rounded-l-full transform -translate-x-1/4"></div>
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
            OUR PRODUCTS
          </motion.p>
          <motion.h2 
            className="section-title text-dropbox-black mb-4"
            variants={itemVariants}
          >
            Powerful Solutions for Every Need
          </motion.h2>
          <motion.p 
            className="text-xl text-dropbox-gray max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Our family of products is designed to help individuals and teams work more efficiently, securely, and collaboratively.
          </motion.p>
        </motion.div>
        
        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {products.map((product) => (
            <motion.div key={product.title} variants={itemVariants}>
              <Card
                title={product.title}
                description={product.description}
                icon={product.icon}
                color={product.color}
                link={product.link}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Product Usage Section */}
        <motion.div 
          className="mt-20 md:mt-32 bg-white rounded-xl p-8 md:p-12 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <p className="text-dropbox-blue font-medium mb-2">WHY CHOOSE DROPBOX</p>
              <h3 className="text-3xl font-bold mb-6">Trusted by millions worldwide</h3>
              <p className="text-dropbox-gray mb-4">
                From the individual freelancer to the world's largest enterprises, Dropbox products power how work gets done today.
              </p>
              <p className="text-dropbox-gray mb-4">
                With over 700 million registered users across 180 countries, we're focused on making work better for people everywhere.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div>
                  <p className="text-4xl font-bold text-dropbox-blue">700M+</p>
                  <p className="text-sm text-dropbox-gray">Registered users</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-dropbox-blue">15B+</p>
                  <p className="text-sm text-dropbox-gray">Files saved daily</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex justify-center"
              variants={itemVariants}
            >
              <div className="relative w-full h-80 rounded-xl bg-gradient-to-br from-dropbox-light-blue to-dropbox-blue flex items-center justify-center p-8">
                {/* Static image alternative to canvas animation */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white">
                  <svg width="80" height="80" viewBox="0 0 40 40" fill="white">
                    <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
                    <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
                    <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
                    <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
                  </svg>
                  <h4 className="mt-4 text-xl font-bold">Simplify your work</h4>
                  <p className="mt-2 text-center text-sm opacity-90">One secure platform for all your content</p>
                </div>

                {/* Animated dots background */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `pulse ${2 + Math.random() * 3}s infinite ease-in-out ${Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
