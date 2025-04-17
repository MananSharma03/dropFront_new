import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NavMenu from '@/components/UI/NavMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const headerVariants = {
    initial: { 
      backgroundColor: 'rgba(255, 255, 255, 0)'
    },
    scrolled: { 
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }
  };

  const logoVariants = {
    initial: { 
      color: '#ffffff',
      scale: 1.2
    },
    scrolled: { 
      color: '#0061FF',
      scale: 1
    }
  };

  const navLinkVariants = {
    initial: { 
      color: '#ffffff'
    },
    scrolled: { 
      color: '#637282'
    },
    hover: {
      color: isScrolled ? '#1E1919' : '#ffffff',
      y: -2
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}
      initial="initial"
      animate={isScrolled ? "scrolled" : "initial"}
      variants={headerVariants}
    >
      <div className="container-custom mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          variants={logoVariants}
        >
          <Link href="/" className="flex items-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
              <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
              <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
              <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
              <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
            </svg>
            <span className="ml-2 text-xl font-bold">Dropbox Brand</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Brand', 'Products', 'Resources', 'Guidelines'].map((item) => (
            <motion.div key={item} variants={navLinkVariants} whileHover="hover">
              <Link href={`/#${item.toLowerCase()}`} className="font-medium">
                {item}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={navLinkVariants} whileHover="hover">
            <a 
              href="/#contact" 
              className={`btn ${isScrolled ? 'btn-primary' : 'bg-white text-dropbox-blue'}`}
            >
              Contact
            </a>
          </motion.div>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <motion.div
              initial={false}
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isScrolled ? "#1E1919" : "#FFFFFF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 12h18" />
                    <path d="M3 6h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <NavMenu closeMenu={toggleMobileMenu} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
