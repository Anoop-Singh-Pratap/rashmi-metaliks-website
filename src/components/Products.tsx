
import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import RevealText from './ui/RevealText';
import ProductViewer from './ui/ProductViewer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  image: string;
  link?: string;
}

const productData: Product[] = [
  {
    id: 1,
    name: "Ductile Iron Pipe",
    description: "Premium quality DI Pipes with ISO certification, designed for durability and longevity.",
    features: ["Corrosion resistant", "High tensile strength", "Long service life", "Easy installation"],
    image: "https://images.unsplash.com/photo-1618761299062-ba2dbbcebd92?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/di-pipes"
  },
  {
    id: 2,
    name: "DI Fittings",
    description: "High-quality ductile iron fittings that complement our DI pipe systems for complete water management solutions.",
    features: ["Perfect compatibility", "Same durability", "Diverse joints", "Pressure capable"],
    image: "https://images.unsplash.com/photo-1582655432787-c7b89f741cc4?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/di-fittings"
  },
  {
    id: 3,
    name: "TMT Bars",
    description: "High strength thermo-mechanically treated bars perfect for construction applications.",
    features: ["Earthquake resistant", "High yield strength", "Better ductility", "Optimal bonding"],
    image: "https://plus.unsplash.com/premium_photo-1682092618361-e785db230079?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/tmt-bar"
  },
  {
    id: 4,
    name: "Sponge Iron",
    description: "Highest quality Sponge Iron produced in our Jhargram facility with superior production process.",
    features: ["Precision process", "Superior quality", "Controlled production", "Best-in-class result"],
    image: "https://images.unsplash.com/photo-1620283085634-a10c02034ad5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/sponge-iron"
  },
  {
    id: 5,
    name: "Pig Iron",
    description: "High-grade pig iron for foundries and steel manufacturing with low sulfur and phosphorus content.",
    features: ["Low phosphorus content", "Controlled silicon", "Consistent quality", "Custom specifications"],
    image: "https://images.unsplash.com/photo-1535813547-99c456a42798?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/pig-iron"
  },
  {
    id: 6,
    name: "Iron Ore Pellet",
    description: "First manufacturer of pellets in West Bengal with significant production capacity.",
    features: ["Superior quality", "Corrosion resistant", "Faster reduction", "High metallization"],
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/iron-ore-pellet"
  },
  {
    id: 7,
    name: "Sinter",
    description: "Essential component for blast furnace operations with perfect chemical composition.",
    features: ["Perfect composition", "Blast furnace ready", "Controlled production", "High quality standards"],
    image: "https://images.unsplash.com/photo-1552252220-f85a018c1726?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/sinter"
  },
];

const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  const productControls = useAnimation();
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Handle mouse leave to reset 3D effect
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setAutoplayEnabled(true);
  };
  
  // Setup autoplay
  useEffect(() => {
    if (!autoplayEnabled) return;
    
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % productData.length);
    }, 5000);
    
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplayEnabled]);
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplayEnabled(false);
  
  const nextProduct = () => {
    productControls.start({ 
      opacity: [1, 0, 1], 
      x: [0, 20, 0], 
      transition: { duration: 0.5 } 
    });
    setActiveIndex((prev) => (prev + 1) % productData.length);
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 10000); // Resume autoplay after 10 seconds
  };
  
  const prevProduct = () => {
    productControls.start({ 
      opacity: [1, 0, 1], 
      x: [0, -20, 0], 
      transition: { duration: 0.5 } 
    });
    setActiveIndex((prev) => (prev - 1 + productData.length) % productData.length);
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 10000); // Resume autoplay after 10 seconds
  };

  const goToProduct = (index: number) => {
    productControls.start({ 
      opacity: [1, 0, 1], 
      y: [0, 10, 0], 
      transition: { duration: 0.5 } 
    });
    setActiveIndex(index);
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 10000); // Resume autoplay after 10 seconds
  };
  
  const handleViewDetails = () => {
    if (activeProduct.link) {
      navigate(activeProduct.link);
    }
  };

  const activeProduct = productData[activeIndex];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Particle animation for the 3D effect
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 400 - 200,
    y: Math.random() * 400 - 200,
    z: Math.random() * 200 - 100,
  }));

  return (
    <section id="products" className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-rashmi-red/20"
            style={{
              width: particle.size,
              height: particle.size,
              x: particle.x,
              y: particle.y,
              z: particle.z,
            }}
            animate={{
              x: [particle.x, particle.x + Math.random() * 100 - 50],
              y: [particle.y, particle.y + Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-rashmi-red font-medium mb-3">
            <RevealText text="Our Products" />
          </div>
          <RevealText
            text="Premium Quality Steel Products"
            as="h2"
            className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
          />
          <p className="text-muted-foreground">
            Explore our diverse range of high-quality steel products manufactured with cutting-edge technology 
            and meeting international standards.
          </p>
        </div>
        
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* 3D Product Viewer */}
          <motion.div 
            className="order-2 lg:order-1 perspective-1000"
            whileInView={{ opacity: [0, 1], scale: [0.9, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onMouseMove={handleMouseMove}
            style={{ perspective: 1000 }}
          >
            <motion.div
              style={{ 
                rotateX, 
                rotateY,
                transformStyle: "preserve-3d",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <ProductViewer 
                className="w-full h-[400px] max-w-lg mx-auto drop-shadow-xl relative z-10" 
                productName={activeProduct.name} 
              />
              
              {/* 3D floating elements around the product */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-rashmi-red/10 backdrop-blur-md"
                  style={{
                    width: Math.random() * 60 + 20,
                    height: Math.random() * 60 + 20,
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                    z: Math.random() * 100 - 50,
                  }}
                  animate={{
                    y: [0, Math.random() * 30 - 15, 0],
                    rotate: [0, Math.random() * 360, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
            
            {/* Loading progress indicator */}
            <div className="mt-6 w-full max-w-lg mx-auto bg-muted h-1 rounded-full overflow-hidden">
              <motion.div
                key={activeIndex}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: autoplayEnabled ? 5 : 0, ease: 'linear' }}
                className="h-full bg-rashmi-red"
              />
            </div>
          </motion.div>
          
          {/* Product Information */}
          <div className="order-1 lg:order-2">
            <div className="relative min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{activeProduct.name}</h3>
                  <p className="text-muted-foreground mb-6">{activeProduct.description}</p>
                  
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                  >
                    {activeProduct.features.map((feature, idx) => (
                      <motion.div 
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: 'hsl(var(--card))',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                        }}
                        className="flex items-center p-3 bg-card/50 rounded-lg border border-border/30 transition-all duration-300 group"
                      >
                        <div className="w-2 h-2 rounded-full bg-rashmi-red mr-3 group-hover:scale-150 transition-all duration-300"></div>
                        <span className="group-hover:font-medium transition-all duration-300">{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {activeProduct.link ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link 
                        to={activeProduct.link} 
                        className="bg-rashmi-red hover-glow text-white px-6 py-3 rounded-md hover:bg-rashmi-red/90 transition-all duration-300 inline-flex items-center gap-2 group"
                      >
                        Learn More
                        <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1"/>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.button 
                      className="bg-rashmi-red text-white px-6 py-3 rounded-md hover:bg-rashmi-red/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Get Specifications
                    </motion.button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Product Navigation */}
            <div className="flex justify-between items-center mt-12">
              <div className="flex space-x-2">
                {productData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToProduct(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'bg-rashmi-red w-6' : 'bg-muted hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`View product ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  onClick={prevProduct}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:bg-card transition-colors"
                  whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--card))' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous product"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  onClick={nextProduct}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:bg-card transition-colors"
                  whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--card))' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next product"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
