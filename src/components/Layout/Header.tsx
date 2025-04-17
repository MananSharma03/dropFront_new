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
      className="fixed top-0 left-0 w-full z-50 py-4 bg-white border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <svg 
              width="36" 
              height="36" 
              viewBox="0 0 40 40" 
              className="text-dropbox-blue"
              fill="currentColor"
            >
              <path d="M12.5 2.5L2.5 12.5V25L12.5 15V2.5Z" />
              <path d="M27.5 2.5L37.5 12.5V25L27.5 15V2.5Z" />
              <path d="M12.5 37.5L2.5 27.5V15L12.5 25V37.5Z" />
              <path d="M27.5 37.5L37.5 27.5V15L27.5 25V37.5Z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-dropbox-blue">
              Dropbox Brand
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/#framework" 
            className="text-gray-600 hover:text-dropbox-blue transition-colors duration-200"
          >
            Framework
          </Link>
          <Link 
            href="/#logo" 
            className="text-gray-600 hover:text-dropbox-blue transition-colors duration-200"
          >
            Logo
          </Link>
          <Link 
            href="/#color" 
            className="text-gray-600 hover:text-dropbox-blue transition-colors duration-200"
          >
            Color
          </Link>
          <Link 
            href="/#typography" 
            className="text-gray-600 hover:text-dropbox-blue transition-colors duration-200"
          >
            Typography
          </Link>
          <Link 
            href="/#imagery" 
            className="text-gray-600 hover:text-dropbox-blue transition-colors duration-200"
          >
            Imagery
          </Link>
          <motion.a 
            href="https://dropbox.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 rounded bg-dropbox-blue text-white font-medium text-sm hover:bg-dropbox-hover-blue transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Dropbox.com
          </motion.a>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 focus:outline-none text-gray-600"
            aria-label="Toggle mobile menu"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
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
