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
    { label: 'Framework', href: '/#framework' },
    { label: 'Voice & Tone', href: '/#voice-tone' },
    { label: 'Logo', href: '/#logo' },
    { label: 'Iconography', href: '/#iconography' },
    { label: 'Color', href: '/#color' },
    { label: 'Typography', href: '/#typography' },
    { label: 'Motion', href: '/#motion' },
    { label: 'Imagery', href: '/#imagery' },
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
        className="fixed top-0 right-0 w-full max-w-sm h-full bg-white z-50 shadow-xl overflow-y-auto"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={menuVariants}
      >
        <div className="flex justify-end p-5 border-b border-gray-100">
          <button 
            onClick={closeMenu}
            className="p-2 focus:outline-none text-gray-500"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-8 py-6">
          {/* Mobile Navigation links */}
          <nav>
            <ul className="space-y-5">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  custom={index}
                  variants={itemVariants}
                  className="border-b border-gray-100 pb-4"
                >
                  <Link 
                    href={link.href}
                    className="text-xl text-gray-700 hover:text-dropbox-blue transition-colors duration-200 block"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          {/* External link */}
          <motion.div 
            className="mt-8"
            variants={itemVariants}
            custom={navLinks.length}
          >
            <a 
              href="https://dropbox.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3 bg-dropbox-blue text-white rounded font-medium"
              onClick={closeMenu}
            >
              Dropbox.com
            </a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default NavMenu;
