
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProductViewerProps {
  className?: string;
  productName?: string;
  description?: string;
  onClick?: () => void;
}

const ProductViewer: React.FC<ProductViewerProps> = ({ 
  className, 
  productName = "Ductile Iron Pipe",
  description = "Premium quality with ISO certification",
  onClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let isAnimating = true;
    let rotation = 0;
    let targetRotation = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
      targetRotation = mouseX * 0.5;
    };
    
    const handleResize = () => {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    };
    
    const animate = () => {
      if (!isAnimating) return;
      
      // Smooth rotation interpolation
      rotation += (targetRotation - rotation) * 0.05;
      
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateY(${rotation}deg) rotateX(${-mouseY * 0.5}deg)`;
      }
      
      requestAnimationFrame(animate);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      isAnimating = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const getDisplayName = () => {
    if (productName.includes("Pipe")) {
      return "DI Pipe";
    } else if (productName.includes("Fitting")) {
      return "DI Fitting";
    } else if (productName.includes("TMT")) {
      return "TMT Bar";
    } else if (productName.includes("Wire")) {
      return "Wire Rod";
    } else if (productName.includes("Pig")) {
      return "Pig Iron";
    }
    return productName;
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "perspective-1000 transition-transform duration-300 ease-out cursor-pointer",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="w-full h-full transform-gpu metal-surface rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Highlight effect on hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-rashmi-red/10 to-transparent opacity-0"
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative w-64 h-64 rounded-full bg-gradient-to-b from-rashmi-red/10 to-rashmi-dark/5 animate-spin-slow shadow-xl">
          <div className="absolute inset-4 rounded-full border-4 border-rashmi-red/20 border-t-rashmi-red"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-24 bg-gradient-to-br from-gray-300 to-gray-100 rounded-md shadow-inner transform rotate-12 flex items-center justify-center dark:from-gray-700 dark:to-gray-800">
              <span className="font-bold text-rashmi-dark text-sm">{getDisplayName()}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center relative z-10">
          <h3 className="text-xl font-display font-semibold">{productName}</h3>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
          
          {/* View details button that appears on hover */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <span className="inline-flex items-center justify-center h-8 px-4 text-xs font-medium text-white bg-rashmi-red rounded-full">
              View Details
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductViewer;
