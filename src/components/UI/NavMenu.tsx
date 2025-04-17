import { motion } from 'framer-motion';
import Link from 'next/link';

interface NavMenuProps {
  closeMenu: () => void;
}

const NavMenu = ({ closeMenu }: NavMenuProps) => {
  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.3, delay: 0.2 }
    }
  };
  
  const menuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0, 
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 200 
      }
    },
    exit: { 
      x: '100%', 
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 200 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.5 
      }
    }),
    exit: { 
      opacity: 0, 
      y: 10, 
      transition: { duration: 0.2 }
    }
  };

  // Navigation links
  const navLinks = [
    { label: 'Brand', href: '/#brand' },
    { label: 'About', href: '/#about' },
    { label: 'Products', href: '/#products' },
    { label: 'Resources', href: '/#resources' },
    { label: 'Guidelines', href: '/#guidelines' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      {/* Overlay */}
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants}
        onClick={closeMenu}
      />
      
      {/* Mobile menu panel */}
      <motion.div 
        className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 shadow-xl overflow-y-auto"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={menuVariants}
      >
        <div className="flex justify-end p-4">
          <button 
            onClick={closeMenu}
            className="p-2 focus:outline-none"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E1919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-6 py-4">
          {/* Branding in mobile menu */}
          <div className="flex items-center mb-8">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="#0061FF">
              <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
              <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
              <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
              <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
            </svg>
            <span className="ml-2 text-xl font-bold">Dropbox Brand</span>
          </div>
          
          {/* Navigation links */}
          <nav className="mb-8">
            <ul className="space-y-6">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  custom={index}
                  variants={itemVariants}
                >
                  <Link 
                    href={link.href}
                    className="text-2xl font-medium text-dropbox-black hover:text-dropbox-blue transition-colors"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          {/* Contact button */}
          <motion.div 
            className="mt-10"
            variants={itemVariants}
            custom={navLinks.length}
          >
            <a 
              href="/#contact" 
              className="inline-flex items-center justify-center w-full py-3 bg-dropbox-blue text-white rounded-lg font-medium"
              onClick={closeMenu}
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default NavMenu;
