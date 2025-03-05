
import React, { useEffect, useRef } from 'react';

interface ProductViewerProps {
  className?: string;
}

const ProductViewer: React.FC<ProductViewerProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
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
  
  return (
    <div ref={containerRef} className={`perspective-1000 transition-transform duration-300 ease-out ${className}`}>
      <div className="w-full h-full transform-gpu metal-surface rounded-lg p-6 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64 rounded-full bg-gradient-to-b from-rashmi-red/10 to-rashmi-dark/5 animate-spin-slow shadow-xl">
          <div className="absolute inset-4 rounded-full border-4 border-rashmi-red/20 border-t-rashmi-red"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-24 bg-gradient-to-br from-gray-300 to-gray-100 rounded-md shadow-inner transform rotate-12 flex items-center justify-center">
              <span className="font-bold text-rashmi-dark text-sm">DI Pipe</span>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h3 className="text-xl font-display font-semibold">Ductile Iron Pipe</h3>
          <p className="text-sm text-muted-foreground mt-2">Premium quality with ISO certification</p>
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
