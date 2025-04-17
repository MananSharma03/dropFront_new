import { motion } from 'framer-motion';

interface ColorBlockProps {
  color: string;
  size?: 'small' | 'medium' | 'large';
}

const ColorBlock = ({ color, size = 'medium' }: ColorBlockProps) => {
  // Determine size class
  const sizeClass = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  }[size];
  
  // Animation variants
  const blockVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 } 
    }
  };

  return (
    <motion.div 
      className={`${sizeClass} ${color} rounded-lg shadow-md`}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={blockVariants}
    />
  );
};

export default ColorBlock;
