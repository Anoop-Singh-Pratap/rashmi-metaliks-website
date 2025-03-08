
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className={`w-full flex justify-center items-center ${className}`}
    >
      <a 
        href={`#${targetId}`} 
        className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <span className="mb-2">{text}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="bg-rashmi-red/90 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <ArrowDown size={18} className="text-white" />
        </motion.div>
      </a>
    </motion.div>
  );
};

export default ExploreButton;
