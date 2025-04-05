/**
 * ProductViewer Component
 * 
 * This component creates an interactive 3D-like product display with mouse-based perspective rotation.
 * It provides a visually engaging way to showcase products with hover animations and effects.
 * 
 * Features:
 * - Interactive 3D rotation effect that follows mouse movement
 * - Hover state animations with scaling and highlighting effects
 * - Conditional display name formatting based on product type
 * - Animated "View Details" button that appears on hover
 * - Customizable product name and description
 * - Compatible with the rest of the UI system through className prop
 * 
 * The component uses requestAnimationFrame for smooth animations and cleans up event listeners
 * appropriately when unmounted.
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  
  // Helper function to get image based on product name
  const getProductImage = (): string => {
    switch(productName) {
      case "Ductile Iron Pipe":
        return "/lovable-uploads/Product_DiPipes.jpeg";
      case "DI Fittings":
        return "/lovable-uploads/Product_DiFittings.jpg";
      case "TMT Bars":
        return "/lovable-uploads/Product_TMT-Bar.jpeg";
      case "Sponge Iron":
        return "/lovable-uploads/Product_Sponge-Iron.jpg";
      case "Pig Iron":
        return "/lovable-uploads/Product_Pig-Iron.jpeg";
      case "Iron Ore Pellet":
        return "/lovable-uploads/Product_IronOre-Pellet.jpeg";
      case "Sinter":
        return "/lovable-uploads/Product_Sinter.jpg";
      default:
        return "/lovable-uploads/Product_DiPipes.jpeg";
    }
  };
  
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
    
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX - windowHalfX) / 50; // More sensitive for touch
        mouseY = (event.touches[0].clientY - windowHalfY) / 50;
        targetRotation = mouseX * 0.5;
        event.preventDefault(); // Prevent scrolling while touching the component
      }
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
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      isAnimating = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
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
        
        {/* 3D Product Image that appears on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -5 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20 flex items-center justify-center"
              style={{ 
                perspective: "1500px"
              }}
            >
              <div 
                className="relative w-full h-full flex items-center justify-center"
                style={{ 
                  transformStyle: "preserve-3d"
                }}
              >
                <motion.div 
                  className="w-[95%] h-[95%] relative"
                  style={{ 
                    transformStyle: "preserve-3d",
                    transform: "perspective(1000px) rotateX(5deg) translateZ(40px)",
                    boxShadow: "0 35px 60px -15px rgba(0, 0, 0, 0.7)"
                  }}
                  whileHover={{ scale: 1.05 }}
                  animate={{ 
                    rotateY: [-4, 4, -4],
                    rotateX: [3, -1, 3]
                  }}
                  transition={{ 
                    rotateY: { repeat: Infinity, duration: 8, ease: "easeInOut" },
                    rotateX: { repeat: Infinity, duration: 10, ease: "easeInOut" }
                  }}
                >
                  {/* Photo frame effect - REMOVING THIS */}
                  {/* <div className="absolute inset-0 bg-white rounded-lg" style={{ transform: "translateZ(-8px)" }}></div> */}
                  
                  {/* Border frame - REMOVING THIS */}
                  {/* <div className="absolute inset-0 rounded-lg border-[10px] border-white shadow-inner" style={{ transform: "translateZ(3px)" }}></div> */}
                  
                  {/* Image */}
                  <img 
                    src={getProductImage()}
                    alt={`${productName} Product`}
                    className="object-cover w-full h-full rounded-sm"
                    style={{ transform: "translateZ(0px)" }}
                  />
                  
                  {/* Glass reflection effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 rounded-sm"
                    style={{ transform: "translateZ(5px)" }}
                  ></div>
                  
                  {/* Corner accent */}
                  <div className="absolute top-1 left-1 w-10 h-10 border-t-2 border-l-2 border-rashmi-red/30 rounded-tl-sm"
                       style={{ transform: "translateZ(6px)" }}></div>
                  <div className="absolute bottom-1 right-1 w-10 h-10 border-b-2 border-r-2 border-rashmi-red/30 rounded-br-sm"
                       style={{ transform: "translateZ(6px)" }}></div>
                  
                  {/* Edge lighting */}
                  <div className="absolute -bottom-2 -right-2 left-6 h-2 bg-black/30 blur-md rounded-full"
                       style={{ transform: "translateZ(-5px) rotateX(70deg)" }}></div>

                  {/* View Details button positioned on the image */}
                  <motion.div
                    className="absolute bottom-6 left-0 right-0 mx-auto flex justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    style={{ transform: "translateZ(10px)" }}
                  >
                    <span className="inline-flex items-center justify-center h-10 md:h-8 px-6 md:px-4 text-sm md:text-xs font-medium text-white bg-rashmi-red rounded-full shadow-lg">
                      View Details
                    </span>
                  </motion.div>
                </motion.div>
                
                {/* Floating shadow */}
                <div 
                  className="absolute w-[85%] h-[15px] bottom-[2%] bg-black/30 blur-xl rounded-full"
                  style={{ transform: "translateZ(-70px) rotateX(80deg) scale(0.9, 0.3)" }}
                ></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Product Image (blurred when not hovered) */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden rounded-lg"
          animate={{ 
            filter: isHovered ? "blur(0px)" : "blur(2px)",
            opacity: isHovered ? 0 : 0.92 
          }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="w-full h-full relative"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotateY: [-3, 3, -3],
              rotateX: [2, -1, 2]
            }}
            transition={{ 
              scale: { duration: 0.5 },
              rotateY: { repeat: Infinity, duration: 8, ease: "easeInOut" },
              rotateX: { repeat: Infinity, duration: 10, ease: "easeInOut" }
            }}
          >
            <img 
              src={getProductImage()}
              alt={`${productName} Preview`}
              className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-lg"></div>
          </motion.div>
        </motion.div>

        {/* Standard rotating component that fades when hovered */}
        <div 
          className={`relative w-64 h-64 rounded-full bg-gradient-to-b from-rashmi-red/10 to-rashmi-dark/5 animate-spin-slow shadow-xl transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-60'
          }`}
        >
          <div className="absolute inset-4 rounded-full border-4 border-rashmi-red/20 border-t-rashmi-red"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-24 bg-gradient-to-br from-gray-300 to-gray-100 rounded-md shadow-inner transform rotate-12 flex items-center justify-center dark:from-gray-700 dark:to-gray-800"
                 aria-label={`${productName} - Premium quality product by world's 2nd largest manufacturer Rashmi Metaliks`}>
              <span className="font-bold text-rashmi-red text-sm">{getDisplayName()}</span>
            </div>
          </div>
        </div>
        
        {/* Container for product name and description */}
        <div className="mt-8 text-center relative z-20">
          {/* Product name and description (hide on hover) */}
          <div className={`transition-all duration-300 ${isHovered ? 'opacity-0 transform -translate-y-4' : 'opacity-100'}`}>
            <h3 className="text-xl font-display font-semibold text-rashmi-red">{productName}</h3>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductViewer;
