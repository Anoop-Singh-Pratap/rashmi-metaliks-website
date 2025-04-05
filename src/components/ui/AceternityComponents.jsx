import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "../../utils/cn";

// Glow animation element
export const Glow = ({ children, className = "", containerClassName = "" }) => {
  return (
    <div className={cn("relative", containerClassName)}>
      <div className={cn("absolute inset-0 rounded-3xl bg-rashmi-red/20 blur-xl animate-pulse", className)} />
      <div className="relative bg-background rounded-3xl p-4">{children}</div>
    </div>
  );
};

// 3D Card effect inspired by Aceternity UI
export const Card3D = ({ children, className = "", containerClassName = "" }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    const container = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - container.left) / container.width - 0.5;
    const y = (e.clientY - container.top) / container.height - 0.5;
    
    setRotate({ x: y * 20, y: x * -20 });
  };
  
  return (
    <div
      className={cn("relative perspective-3d group", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
      }}
    >
      <motion.div
        className={cn("w-full rounded-xl transition-all duration-200", className)}
        style={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        {children}
        
        {/* Shine effect */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-xl opacity-0 group-hover:opacity-100",
            "bg-gradient-to-r from-transparent via-white/10 to-transparent",
            "transition-opacity duration-300 pointer-events-none",
            "animate-shine"
          )}
        />
      </motion.div>
    </div>
  );
};

// RevealText component for text reveal animations
export const RevealText = ({ text, className = "", as = "div", delay = 0.2, duration = 0.5, staggerDelay = 0.05 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);
  
  // Split the text into words
  const words = text.split(" ");
  
  // Container variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay * i },
    }),
  };
  
  // Child variants (words)
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
  };
  
  const Component = as;
  
  return (
    <Component className={className}>
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={controls}
        className="inline-flex flex-wrap"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </Component>
  );
};

// Shimmer button with hover effect
export const ShimmerButton = ({
  children,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        "relative inline-flex overflow-hidden rounded-lg p-[1px] shimmer-effect",
        containerClassName
      )}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.button
        className={cn(
          "relative z-10 inline-flex items-center justify-center rounded-lg bg-rashmi-red px-6 py-3 text-white font-medium shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    </motion.div>
  );
};

// Floating Animation Component
export const FloatingAnimation = ({ 
  children, 
  className = "", 
  yOffset = 10, 
  duration = 3, 
  delay = 0 
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-yOffset, 0, -yOffset],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

// Spotlight effect for hover 
export const Spotlight = ({ children, className = "" }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (divRef.current) {
      const div = divRef.current;
      const rect = div.getBoundingClientRect();
      
      // Set CSS variable values directly on the element
      div.style.setProperty('--x', `${e.clientX - rect.left}px`);
      div.style.setProperty('--y', `${e.clientY - rect.top}px`);
    }
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="spotlight-effect"
        style={{ opacity, transition: "opacity 0.3s" }}
      />
      {children}
    </div>
  );
};

// Typewriter effect
export const TypewriterEffect = ({ words, className = "", cursorClassName = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const word = words[currentWordIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setCurrentText(word.substring(0, currentText.length + 1));
        
        if (currentText.length === word.length) {
          // Start deleting after a pause
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      } else {
        // Deleting
        setCurrentText(word.substring(0, currentText.length - 1));
        
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timer);
  }, [currentText, currentWordIndex, isDeleting, words]);
  
  return (
    <div className={cn("flex items-center", className)}>
      <span className="mr-1">{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className={cn("inline-block h-5 w-[2px] bg-rashmi-red", cursorClassName)}
      />
    </div>
  );
}; 