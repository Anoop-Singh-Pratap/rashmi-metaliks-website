
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface ExploreButtonProps {
  text: string;
  targetId: string;
  className?: string;
}

const ExploreButton: React.FC<ExploreButtonProps> = ({ 
  text,
  targetId,
  className = ""
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className={`w-full flex justify-center items-center my-8 ${className}`}
    >
      <motion.a 
        href={`#${targetId}`} 
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <span className="mb-2">{text}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="bg-rashmi-red/90 hover:bg-rashmi-red rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
        >
          <ArrowDown size={20} className="text-white" />
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

export default ExploreButton;
