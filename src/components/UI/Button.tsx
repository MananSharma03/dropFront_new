import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
  href: string;
  icon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
}

const Button = ({
  label,
  variant = 'primary',
  href,
  icon,
  size = 'medium',
  className = '',
  onClick,
}: ButtonProps) => {
  // Determine button size class
  const sizeClass = {
    small: 'text-sm px-3 py-2',
    medium: 'px-5 py-3',
    large: 'text-lg px-6 py-4',
  }[size];

  // Determine button variant class
  const variantClass = {
    primary: 'bg-dropbox-blue text-white hover:bg-dropbox-hover-blue',
    secondary: 'bg-white text-dropbox-blue border border-dropbox-blue hover:bg-dropbox-light-blue',
  }[variant];

  // Button animation
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 } 
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 } 
    }
  };

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      <Link 
        href={href}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ${sizeClass} ${variantClass} ${className}`}
        onClick={onClick}
      >
        {label}
        {icon && <span className="ml-2">{icon}</span>}
      </Link>
    </motion.div>
  );
};

export default Button;
