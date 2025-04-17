import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

const Card = ({ title, description, icon, color, link }: CardProps) => {
  // Card animation
  const cardVariants = {
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 } 
    }
  };

  // Icon animation
  const iconVariants = {
    hover: { 
      rotate: 5,
      scale: 1.1,
      transition: { duration: 0.3 } 
    }
  };

  return (
    <motion.a 
      href={link}
      className="block product-card bg-white rounded-xl overflow-hidden shadow-md h-full"
      whileHover="hover"
      variants={cardVariants}
    >
      <div className="p-6">
        <motion.div
          className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-4`}
          variants={iconVariants}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={icon} />
          </svg>
        </motion.div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-dropbox-gray">{description}</p>
        
        <div className="mt-4 flex items-center text-dropbox-blue font-medium">
          Learn more
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </motion.a>
  );
};

export default Card;
