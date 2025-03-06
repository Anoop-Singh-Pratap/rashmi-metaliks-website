import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Check, Ruler, Pipette, Waves, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
  initial: { y: 0 },
  animate: { 
    y: [0, 2, 0], 
    transition: { 
      duration: 1.5, 
      repeat: Infinity, 
      repeatType: "mirror" as const, 
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

  useEffect(() => {
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
      <Header />
      
      {/* Hero Section */}
      <section id="overview" className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ductile Iron <span className="text-rashmi-red">Pipes</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mb-8">
              High-performance ductile iron pipes for water and sewage infrastructure. Manufactured to meet stringent international standards, ensuring durability and reliability.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <motion.span 
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rashmi-red/10 text-rashmi-red"
              >
                EN 545
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rashmi-red/10 text-rashmi-red"
              >
                ISO 2531
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rashmi-red/10 text-rashmi-red"
              >
                PN 10-40
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rashmi-red/10 text-rashmi-red"
              >
                DN 80-1600
              </motion.span>
            </motion.div>
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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <a 
            href="#features" 
            className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span className="mb-2">Explore Key Features</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="bg-rashmi-red/90 rounded-full w-8 h-8 flex items-center justify-center"
            >
              <ArrowDown size={18} className="text-white" />
            </motion.div>
          </a>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Key <span className="text-rashmi-red">Features</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Explore the exceptional features that make our ductile iron pipes the ideal choice for your projects
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pipeFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)"
                }}
                className="bg-card border border-border rounded-lg p-6 transition-all duration-300 relative overflow-hidden"
              >
                <div className="mb-3 bg-rashmi-red/10 w-12 h-12 rounded-full flex items-center justify-center">
                  {React.createElement(feature.icon, { className: "text-rashmi-red", size: 22 })}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-r from-rashmi-red/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Applications Section */}
      <section id="applications" className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Versatile <span className="text-rashmi-red">Applications</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
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
              className="bg-card border border-border rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-4">Water Distribution</h3>
              <p className="text-muted-foreground mb-6">
                Reliable and durable pipes for municipal and industrial water distribution networks.
              </p>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Potable water supply</li>
                <li>Raw water transmission</li>
                <li>Treated water distribution</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-4">Sewage Systems</h3>
              <p className="text-muted-foreground mb-6">
                Robust pipes designed to handle sewage and wastewater efficiently.
              </p>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Sanitary sewer lines</li>
                <li>Storm sewer systems</li>
                <li>Wastewater treatment plants</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-4">Industrial Applications</h3>
              <p className="text-muted-foreground mb-6">
                Ductile iron pipes for demanding industrial environments.
              </p>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Process water lines</li>
                <li>Cooling water systems</li>
                <li>Chemical transport</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-4">Infrastructure Projects</h3>
              <p className="text-muted-foreground mb-6">
                Reliable piping solutions for large-scale infrastructure developments.
              </p>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Water transmission mains</li>
                <li>Sewer trunk lines</li>
                <li>Underground utilities</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Standards Section */}
      <section id="standards" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6">
              Compliance with <span className="text-rashmi-red">Standards</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg">
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
              <li className="bg-card border border-border rounded-lg p-4 flex items-center">
                <Check className="text-rashmi-red mr-3 h-5 w-5" />
                <span className="font-medium">EN 545: Ductile iron pipes, fittings, accessories and their joints for water pipelines</span>
              </li>
              <li className="bg-card border border-border rounded-lg p-4 flex items-center">
                <Check className="text-rashmi-red mr-3 h-5 w-5" />
                <span className="font-medium">ISO 2531: Ductile iron pipes, fittings, accessories and their joints for pressure pipelines</span>
              </li>
              <li className="bg-card border border-border rounded-lg p-4 flex items-center">
                <Check className="text-rashmi-red mr-3 h-5 w-5" />
                <span className="font-medium">AWWA C151/A21.51: Ductile-Iron Pipe, Centrifugally Cast</span>
              </li>
              <li className="bg-card border border-border rounded-lg p-4 flex items-center">
                <Check className="text-rashmi-red mr-3 h-5 w-5" />
                <span className="font-medium">ASTM A536: Standard Specification for Ductile Iron Castings</span>
              </li>
            </motion.ul>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl">
                <div className="bg-rashmi-red/5 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Looking for reliable <span className="text-rashmi-red">piping</span> solutions?
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Contact us today to learn more about our ductile iron pipes and how they can benefit your next project.
              </p>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
              >
                Request a Quote
                <ArrowDown className="ml-2 rotate-[-90deg]" size={18} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DiPipes;
