
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowDown, Check, Ruler, Pipette, Waves, ShieldCheck, ChevronDown, BookOpen, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductViewer from '../components/ui/ProductViewer';

// Fixed TypeScript error by specifying literal types for repeatType
const floatAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0], 
    transition: { 
      duration: 3, 
      repeat: Infinity, 
      repeatType: "loop" as const, 
      ease: "easeInOut" 
    } 
  }
};

const flowAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, 5, 0], 
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      repeatType: "reverse" as const, 
      ease: "easeInOut" 
    } 
  }
};

const pulseAnimation = {
  initial: { opacity: 0.7 },
  animate: { 
    opacity: [0.7, 1, 0.7], 
    scale: [1, 1.05, 1],
    transition: { 
      duration: 1.5, 
      repeat: Infinity, 
      repeatType: "mirror" as const, 
      ease: "easeInOut" 
    } 
  }
};

// Microinteraction animations for explore button
const exploreButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.2 } },
  tap: { scale: 0.9, transition: { duration: 0.2 } }
};

const arrowVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, 10, 0],
    transition: { 
      repeat: Infinity, 
      duration: 1.5, 
      ease: "easeInOut" 
    }
  }
};

const DiPipes = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  
  const pipeFeatures = [
    {
      title: "High Strength",
      description: "Ductile iron provides exceptional tensile and yield strength.",
      icon: Ruler
    },
    {
      title: "Corrosion Resistance",
      description: "Special coatings prevent corrosion, extending the lifespan.",
      icon: ShieldCheck
    },
    {
      title: "Hydraulic Capacity",
      description: "Smooth inner linings maximize flow and reduce pumping costs.",
      icon: Waves
    },
    {
      title: "Longevity",
      description: "Ductile iron pipes can last for more than 100 years.",
      icon: Pipette
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <Helmet>
        <title>Ductile Iron Pipes | Rashmi Metaliks</title>
        <meta name="description" content="High-performance ductile iron pipes for water and sewage infrastructure, manufactured to meet international standards and engineered for durability." />
        <meta name="keywords" content="Ductile Iron Pipes, DI Pipes, Water Distribution, Sewage Systems, Rashmi Metaliks" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section - Industrial Grandeur */}
      <section id="overview" className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">
              Engineering Fluid <span className="text-rashmi-red">Excellence</span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block text-xl md:text-2xl mt-2 text-muted-foreground"
              >
                Ductile Iron Pressure Pipes
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-lg max-w-3xl mx-auto mb-10"
            >
              High-performance ductile iron pipes for water and sewage infrastructure. Manufactured to meet stringent international standards, ensuring durability and reliability.
            </motion.p>
            
            {/* Stat badges with floating animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              <motion.span 
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md"
              >
                EN 545 Certified
              </motion.span>
              <motion.span 
                variants={flowAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-card border border-border shadow-md"
              >
                ISO 2531 Compliant
              </motion.span>
              <motion.span 
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md"
              >
                PN 10-40 Pressure Rating
              </motion.span>
              <motion.span 
                variants={flowAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-card border border-border shadow-md"
              >
                DN 80-1600 Diameters
              </motion.span>
            </motion.div>
          </motion.div>
          
          {/* Product Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-xl mx-auto mt-8"
          >
            <ProductViewer 
              productName="Ductile Iron Pipes"
              description="Premium quality with ISO certification"
              onClick={() => scrollToSection('features')}
            />
          </motion.div>
          
          {/* "Why Rashmi DI Pipes" Link */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1 }}
  className="flex justify-center mt-12 mb-4" // Adjusted spacing
>
  <Link to="/why-rashmi-di-pipes">
    <motion.button
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-6 py-3 bg-rashmi-red/10 shadow-md border border-rashmi-red/20 rounded-lg text-foreground hover:bg-rashmi-red/20 transition-all" // Enhanced visibility with brand colors
    >
      <BookOpen size={18} className="text-rashmi-red" />
      <span className="font-medium">Why Rashmi DI Pipes</span>
      <ArrowRight size={16} className="text-rashmi-red ml-1 transition-transform group-hover:translate-x-1" />
    </motion.button>
  </Link>
</motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none z-[-1]"
        >
          <div className="bg-rashmi-red/20 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>

        {/* Explore key features button with improved microinteraction */}
        <div className="relative h-20 mt-10 mb-6"> {/* Added height and margins */}
  <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center z-20"> {/* Increased z-index */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="text-center flex flex-col items-center"
    >
      <span className="text-sm text-muted-foreground mb-2">Explore Key Features</span>
      <motion.button
        onClick={() => scrollToSection('features')}
        variants={exploreButtonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="bg-rashmi-red hover:bg-rashmi-red/90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300"
      >
        <motion.span
          variants={arrowVariants}
          initial="initial"
          animate="animate"
          className="inline-block" // Changed to inline-block
        >
          <ChevronDown size={24} className="text-white" />
        </motion.span>
      </motion.button>
    </motion.div>
  </div>
</div>
      </section>
      
      {/* Features Section - Interactive Advantages Showcase */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-center"
            >
              Key <span className="text-rashmi-red">Features</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg text-center"
            >
              Explore the exceptional features that make our ductile iron pipes the ideal choice for your projects
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {pipeFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
                className="bg-card border border-border rounded-lg p-8 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="mb-4 bg-rashmi-red/10 w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-rashmi-red/20 transition-colors duration-300">
                  {React.createElement(feature.icon, { className: "text-rashmi-red group-hover:scale-110 transition-transform duration-300", size: 24 })}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-rashmi-red transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
                
                {/* Highlight overlay on hover */}
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-r from-rashmi-red/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Top border accent that appears on hover */}
                <motion.div 
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 h-1 bg-rashmi-red"
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Applications Section */}
      <section id="applications" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-center"
            >
              Versatile <span className="text-rashmi-red">Applications</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg text-center"
            >
              Our ductile iron pipes are suitable for a wide range of applications
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Water Distribution</h3>
              <p className="text-muted-foreground mb-6">
                Reliable and durable pipes for municipal and industrial water distribution networks.
              </p>
              <ul className="space-y-2">
                {["Potable water supply", "Raw water transmission", "Treated water distribution"].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.5 }}
                    className="flex items-center text-muted-foreground"
                  >
                    <Check className="text-rashmi-red mr-2 h-5 w-5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Sewage Systems</h3>
              <p className="text-muted-foreground mb-6">
                Robust pipes designed to handle sewage and wastewater efficiently.
              </p>
              <ul className="space-y-2">
                {["Sanitary sewer lines", "Storm sewer systems", "Wastewater treatment plants"].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.5 }}
                    className="flex items-center text-muted-foreground"
                  >
                    <Check className="text-rashmi-red mr-2 h-5 w-5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Industrial Applications</h3>
              <p className="text-muted-foreground mb-6">
                Ductile iron pipes for demanding industrial environments.
              </p>
              <ul className="space-y-2">
                {["Process water lines", "Cooling water systems", "Chemical transport"].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.5 }}
                    className="flex items-center text-muted-foreground"
                  >
                    <Check className="text-rashmi-red mr-2 h-5 w-5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Infrastructure Projects</h3>
              <p className="text-muted-foreground mb-6">
                Reliable piping solutions for large-scale infrastructure developments.
              </p>
              <ul className="space-y-2">
                {["Water transmission mains", "Sewer trunk lines", "Underground utilities"].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.5 }}
                    className="flex items-center text-muted-foreground"
                  >
                    <Check className="text-rashmi-red mr-2 h-5 w-5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 right-0 w-1/2 h-full opacity-10">
            <div className="absolute -right-20 top-0 w-80 h-80 bg-rashmi-red/30 rounded-full blur-[100px]"></div>
            <div className="absolute -right-40 bottom-0 w-60 h-60 bg-rashmi-red/20 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </section>
      
      {/* Standards Section */}
      <section id="standards" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-center"
            >
              Compliance with <span className="text-rashmi-red">Standards</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg text-center"
            >
              Our ductile iron pipes are manufactured to meet or exceed the following standards:
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {[
                "EN 545: Ductile iron pipes, fittings, accessories and their joints for water pipelines",
                "ISO 2531: Ductile iron pipes, fittings, accessories and their joints for pressure pipelines",
                "AWWA C151/A21.51: Ductile-Iron Pipe, Centrifugally Cast",
                "ASTM A536: Standard Specification for Ductile Iron Castings"
              ].map((standard, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="bg-card border border-border rounded-lg p-4 flex items-center shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 mr-3">
                    <motion.div 
                      variants={pulseAnimation}
                      initial="initial"
                      animate="animate"
                      className="w-8 h-8 bg-rashmi-red rounded-full flex items-center justify-center"
                    >
                      <Check className="text-white h-5 w-5" />
                    </motion.div>
                  </div>
                  <span className="font-medium">{standard}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative shadow-lg"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl">
                <div className="bg-rashmi-red/5 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-center"
              >
                Looking for reliable <span className="text-rashmi-red">piping</span> solutions?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto"
              >
                Contact us today to learn more about our ductile iron pipes and how they can benefit your next project.
              </motion.p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-all duration-300 hover:bg-rashmi-red/90 shadow-md hover:shadow-lg"
                >
                  Request a Quote
                  <ArrowDown className="ml-2 rotate-[-90deg]" size={18} />
                </motion.a>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Link to="/why-rashmi-di-pipes">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-6 py-3 bg-card border border-border text-foreground font-medium rounded-lg transition-all duration-300 hover:bg-card/80 shadow-md hover:shadow-lg"
                    >
                      <BookOpen size={18} className="mr-2 text-rashmi-red" />
                      Why Choose Rashmi
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DiPipes;
