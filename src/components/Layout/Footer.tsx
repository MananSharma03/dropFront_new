import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation for footer elements
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Brand elements categories
  const brandElements = [
    { name: "Framework", href: "/#framework" },
    { name: "Voice & Tone", href: "/#voice-tone" },
    { name: "Logo", href: "/#logo" },
    { name: "Iconography", href: "/#iconography" },
    { name: "Color", href: "/#color" },
    { name: "Typography", href: "/#typography" },
    { name: "Motion", href: "/#motion" },
    { name: "Imagery", href: "/#imagery" }
  ];

  // Social media links
  const socialLinks = [
    { name: "Twitter", url: "https://twitter.com/Dropbox" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/dropbox" },
    { name: "Instagram", url: "https://www.instagram.com/dropbox" }
  ];

  return (
    <motion.footer 
      className="bg-white py-12 border-t border-gray-100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        {/* Grid of brand elements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {brandElements.map((element) => (
            <motion.div 
              key={element.name} 
              variants={itemVariants}
              className="flex flex-col"
            >
              <Link 
                href={element.href}
                className="text-gray-700 hover:text-dropbox-blue transition-colors duration-200"
              >
                {element.name}
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Divider */}
        <motion.div 
          className="border-t border-gray-100 my-8" 
          variants={itemVariants}
        />

        {/* Bottom section with copyright and links */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <div className="flex items-center mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 40 40" 
                fill="currentColor" 
                className="text-dropbox-blue"
              >
                <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
                <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
                <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
                <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
              </svg>
              <span className="ml-2 text-sm text-gray-500">© {currentYear} Dropbox</span>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            {/* Legal links */}
            <Link href="/#" className="text-sm text-gray-500 hover:text-dropbox-blue transition-colors duration-200">
              Privacy & Legal
            </Link>
            <Link href="/#" className="text-sm text-gray-500 hover:text-dropbox-blue transition-colors duration-200">
              Cookie Policy
            </Link>
            <Link href="/#" className="text-sm text-gray-500 hover:text-dropbox-blue transition-colors duration-200">
              Cookie Preferences
            </Link>
          </div>
        </motion.div>
        
        {/* Additional social links */}
        <motion.div 
          className="flex justify-center md:justify-end mt-6 space-x-4"
          variants={itemVariants}
        >
          {socialLinks.map(social => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-dropbox-blue transition-colors duration-200"
            >
              {social.name}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
