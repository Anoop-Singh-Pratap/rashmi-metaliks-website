import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Check, Ruler, Pipette, Waves, ShieldCheck, ChevronDown, BookOpen, ArrowRight, MapPin, Award, Users, Settings } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductViewer from '../components/ui/ProductViewer';
import DIPipesManufacturing from '../components/DIPipesManufacturing';
import SEO from '../components/SEO';
import { diPipesSchema, generateFAQSchema, generateBreadcrumbSchema } from '../lib/schema';
import RevealText from '../components/ui/RevealText';
import { Helmet } from 'react-helmet';
import PipeViewer3D from '../components/ui/PipeViewer3D';
import SpecComparisonTool from '../components/ui/SpecComparisonTool';
import ProjectCalculator from '../components/ui/ProjectCalculator';
import BenefitsSection from '../components/ui/BenefitsSection';

// Custom styles component to avoid @import rule issues
const DiPipesStyles = () => {
  // Empty component since styles are now in globals.css
  return null;
};

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
  hover: { scale: 1.05, transition: { duration: 0.2, type: "spring", stiffness: 400 } },
  tap: { scale: 0.95, transition: { duration: 0.2 } }
};

const arrowVariants = {
  initial: { y: 0 },
  animate: { 
    y: [0, 5, 0],
    transition: { 
      repeat: Infinity, 
      duration: 1.5, 
      ease: "easeInOut" 
    }
  }
};

const DiPipes = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('dimensions');
  const [stats, setStats] = useState({ production: 0, years: 0, projects: 0, countries: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  const isStatsInView = useInView(statsRef);
  const heroControls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  
  // Parallax effects from index.html
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
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
    if (isHeroInView) {
      heroControls.start({ opacity: 1, y: 0 });
    }
  }, [isHeroInView, heroControls]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const img = new Image();
    img.src = "/lovable-uploads/compressed/Product_DiPipes.webp";
    img.onload = () => setIsLoaded(true);

    // Force show the page even if the image doesn't load
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Show the fallback for ProductViewer if needed
      const fallback = document.querySelector('.product-viewer-fallback');
      if (fallback) {
        fallback.classList.remove('hidden');
      }
    }, 2000);

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

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Stats counter animation
  useEffect(() => {
    if (isStatsInView) {
      const duration = 2000;
      const startTime = Date.now();
      const endValues = { production: 770, years: 100, projects: 500, countries: 30 };
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setStats({
          production: Math.floor(progress * endValues.production),
          years: Math.floor(progress * endValues.years),
          projects: Math.floor(progress * endValues.projects),
          countries: Math.floor(progress * endValues.countries)
        });
        
        if (progress === 1) clearInterval(interval);
      }, 16);
      
      return () => clearInterval(interval);
    }
  }, [isStatsInView]);

  // SEO Schemas
  const faqSchema = generateFAQSchema([
    {
      question: "Who is the world's 2nd largest manufacturer of Ductile Iron Pipes?",
      answer: "Rashmi Metaliks is the world's 2nd largest manufacturer of Ductile Iron Pipes with an impressive 770,000 MT annual production capacity."
    },
    {
      question: "What is the production capacity of Rashmi Metaliks for DI Pipes?",
      answer: "Rashmi Metaliks has a massive 770,000 MT annual production capacity for Ductile Iron Pipes, making it the 2nd largest manufacturer globally."
    },
    {
      question: "What are the key features of Rashmi Metaliks DI Pipes?",
      answer: "Rashmi Metaliks DI Pipes offer exceptional tensile and yield strength, superior corrosion resistance with special coatings, excellent hydraulic capacity with smooth inner linings, and remarkable longevity of over 100 years."
    },
    {
      question: "What standards do Rashmi Metaliks DI Pipes comply with?",
      answer: "Rashmi Metaliks DI Pipes comply with international standards including EN 545, ISO 2531, AWWA C151/A21.51, and ASTM A536, ensuring the highest quality and reliability."
    }
  ]);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/#products" },
    { name: "Ductile Iron Pipes", url: "/di-pipes" }
  ]);
  
  // Combined schema array for SEO component
  const schemas = [diPipesSchema, faqSchema, breadcrumbSchema];

  return (
    <div ref={containerRef} className={`min-h-screen bg-background text-foreground relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Render the styles component here */}
      <DiPipesStyles />

      <SEO 
        title="Ductile Iron Pipes | Premium DI Pipe Products | Rashmi Metaliks - World's 2nd Largest Manufacturer"
        description="Premium quality Ductile Iron Pipes from Rashmi Metaliks - World's 2nd largest DI pipe manufacturer with 770,000 MT annual capacity. Our DI pipes offer exceptional strength, corrosion resistance and longevity for water and sewage applications."
        keywords="Ductile Iron Pipes, DI Pipes, World's 2nd largest DI pipe manufacturer, 770000 MT capacity, Water Distribution Pipes, Rashmi Metaliks, Corrosion Resistant Pipes, Global Leadership"
        canonicalUrl="/di-pipes"
        ogType="product"
        ogImage="/lovable-uploads/compressed/Product_DiPipes.webp"
        schema={schemas}
      />

      <div className="relative z-50">
        <Header />
      </div>
      
      {/* Hero Section with Enhanced Parallax Effects */}
      <section 
        id="overview" 
        ref={heroRef}
        className="relative pt-28 md:pt-36 pb-24 min-h-[90vh] flex items-center overflow-hidden perspective-container"
        style={{ position: 'relative' }}
      >
        {/* Background pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        {/* Background gradient shapes */}
        <div className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-rashmi-red/3 blur-3xl geometric-pattern opacity-50"></div>
        <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] rounded-full bg-rashmi-red/3 blur-3xl geometric-pattern opacity-50"></div>
        
        {/* Background with parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-rashmi-dark/20 via-rashmi-dark/10 to-background"></div>
          
          {/* Parallax background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{ 
              y: heroImageY,
              filter: "brightness(0.8) saturate(1.2)"
            }}
          >
            <div className="absolute inset-0 geometric-pattern"></div>
          </motion.div>
          
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(229,57,53,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(229,57,53,0.05)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(229,57,53,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(229,57,53,0.1)_1px,transparent_1px)]"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={heroControls}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
            style={{ y: textY }}
          >
            {/* Category label with improved animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 overflow-hidden inline-block"
            >
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-r from-rashmi-red to-rashmi-red/80 px-4 py-1 rounded-full mb-6 shadow-lg shadow-rashmi-red/20"
              >
                <span className="text-white text-sm font-medium uppercase tracking-wider">Flagship Product</span>
              </motion.div>
            </motion.div>
            
            {/* Main title with RevealText */}
            <div className="mb-4">
              <RevealText
                text="Engineering Fluid Excellence"
                as="h1"
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold"
                staggerDelay={0.08}
              />
              
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="block text-xl md:text-2xl mt-4 text-muted-foreground"
              >
                Ductile Iron Pressure Pipes
              </motion.span>
            </div>
            
            <div className="w-32 h-1 mx-auto my-6 rounded-full animate-pulse" 
              style={{ backgroundImage: 'linear-gradient(90deg, #E53935, #FF5252, #E53935)' }}></div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto"
            >
              High-performance ductile iron pipes for water and sewage infrastructure. 
              Manufactured to meet stringent international standards, ensuring durability and reliability.
            </motion.p>
            
            {/* Enhanced stat badges with floating animation */}
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
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md border border-rashmi-red/20"
              >
                <Check size={16} className="mr-1" /> EN 545 Certified
              </motion.span>
              <motion.span 
                variants={flowAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-card border border-border shadow-md backdrop-blur-sm"
              >
                <Check size={16} className="mr-1 text-rashmi-red" /> ISO 2531 Compliant
              </motion.span>
              <motion.span 
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-rashmi-red text-white shadow-md border border-rashmi-red/20"
              >
                <Check size={16} className="mr-1" /> PN 10-40 Pressure Rating
              </motion.span>
              <motion.span 
                variants={flowAnimation}
                initial="initial"
                animate="animate"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-card border border-border shadow-md backdrop-blur-sm"
              >
                <Check size={16} className="mr-1 text-rashmi-red" /> DN 80-1600 Diameters
              </motion.span>
            </motion.div>
            
            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.a 
                href="#features" 
                variants={exploreButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center gap-2 bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-4 rounded-full transition-all duration-300 font-medium shadow-lg shadow-rashmi-red/20 group"
              >
                Explore Features 
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
              </motion.a>
              
              <motion.a 
                href="#specifications" 
                variants={exploreButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-card/50 text-foreground border border-border px-8 py-4 rounded-full transition-all duration-300 font-medium group"
              >
                View Specifications
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
            
            {/* World's 2nd largest badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-16 inline-block"
            >
              <div className="px-6 py-3 bg-card border border-border rounded-full backdrop-blur-sm shadow-xl">
                <span className="text-sm md:text-base font-medium">
                  <span className="text-rashmi-red font-bold">World's 2nd Largest</span> DI Pipe Manufacturer
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator with fixed position */}
        <motion.div 
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-float z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <div className="flex flex-col items-center text-muted-foreground">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-rashmi-red rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* NEW Key Statistics Section */}
      <section ref={statsRef} className="py-16 relative overflow-hidden bg-rashmi-dark/5 dark:bg-rashmi-red/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card/80 dark:bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rashmi-red/10 mb-4">
                <Award className="text-rashmi-red" size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.production}K</h3>
              <p className="text-muted-foreground">MT Annual Production</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card/80 dark:bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rashmi-red/10 mb-4">
                <Settings className="text-rashmi-red" size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.years}+</h3>
              <p className="text-muted-foreground">Years Lifespan</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card/80 dark:bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rashmi-red/10 mb-4">
                <Users className="text-rashmi-red" size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.projects}+</h3>
              <p className="text-muted-foreground">Projects Completed</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card/80 dark:bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rashmi-red/10 mb-4">
                <MapPin className="text-rashmi-red" size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-1">{stats.countries}+</h3>
              <p className="text-muted-foreground">Countries Served</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* NEW 3D Product Viewer Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-16 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-3"
              >
                <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider">Interactive Experience</span>
              </motion.div>
              
              <RevealText
                text="Explore Our Products in 3D"
                as="h2"
                className="text-3xl md:text-5xl font-bold text-foreground mb-3"
                staggerDelay={0.05}
              />
              
              <p className="text-muted-foreground text-lg mb-6">
                Interact with our DI pipes to see every detail up close
              </p>
            </div>
            
            <PipeViewer3D />
          </motion.div>
        </div>
      </section>
      
      {/* Product Visualization Section with ProductViewer */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* 3D product visualization */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[60vh] rounded-[2rem] overflow-hidden border border-border bg-card/50 backdrop-blur-sm shadow-xl perspective-container"
            >
              <ProductViewer productName="Ductile Iron Pipe" description="Premium quality DI pipes with international certifications" />
              <div className="product-viewer-fallback absolute inset-0 flex items-center justify-center text-rashmi-red text-xl font-bold hidden">
                <img 
                  src="/lovable-uploads/compressed/Product_DiPipes.webp" 
                  alt="Ductile Iron Pipe" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 dark:bg-black/50">
                  <span className="bg-white dark:bg-gray-800 text-foreground p-4 rounded-lg shadow-lg">Ductile Iron Pipe</span>
                </div>
              </div>
            </motion.div>
            
            {/* Key highlights */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-card p-6 rounded-[1.5rem] border border-border shadow-md backdrop-blur-sm dark:bg-card/80"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <Check className="text-rashmi-red" size={20} />
                  </div>
                  <h3 className="text-xl font-bold">770,000 MT</h3>
                </div>
                <p className="text-muted-foreground">Annual production capacity, making us the world's 2nd largest manufacturer</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-card p-6 rounded-[1.5rem] border border-border shadow-md backdrop-blur-sm dark:bg-card/80"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <Check className="text-rashmi-red" size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Global Standards</h3>
                </div>
                <p className="text-muted-foreground">Compliant with EN 545, ISO 2531, AWWA C151/A21.51, and ASTM A536</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-card p-6 rounded-[1.5rem] border border-border shadow-md backdrop-blur-sm dark:bg-card/80"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <Check className="text-rashmi-red" size={20} />
                  </div>
                  <h3 className="text-xl font-bold">100+ Years</h3>
                </div>
                <p className="text-muted-foreground">Engineered service life, providing exceptional long-term value</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Interactive Tools Section */}
      <section className="py-16 bg-muted/20 dark:bg-rashmi-dark/5">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider mb-3 inline-block">
              Interactive Tools
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Plan Your Project
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Use our interactive tools to compare specifications and calculate your project requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <SpecComparisonTool />
            <ProjectCalculator />
          </div>
        </div>
      </section>
      
      {/* Features Section - Enhanced */}
      <section id="features" className="py-24 relative gradient-border overflow-hidden geometric-pattern dark:bg-rashmi-dark/5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        <div className="absolute -right-64 -top-64 w-[500px] h-[500px] rounded-full bg-rashmi-red/3 blur-3xl opacity-50"></div>
        <div className="absolute -left-64 -bottom-64 w-[500px] h-[500px] rounded-full bg-rashmi-red/3 blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <div className="text-rashmi-red text-sm font-medium uppercase tracking-wider mb-3">
              <RevealText text="EXCEPTIONAL QUALITY" />
            </div>
            
            <RevealText
              text="Key Features & Benefits"
              as="h2"
              className="text-3xl md:text-5xl font-bold text-foreground mb-3"
              staggerDelay={0.05}
            />
            
            <p className="text-muted-foreground text-lg">
              Our Ductile Iron Pipes combine superior engineering with advanced materials
              to deliver unmatched performance and longevity
            </p>
            
            <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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
                className="bg-card dark:bg-card/70 border border-border rounded-[1.5rem] p-8 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="mb-4 bg-rashmi-red/10 w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-rashmi-red/20 transition-colors duration-300">
                  {React.createElement(feature.icon, { className: "text-rashmi-red group-hover:scale-110 transition-transform duration-300", size: 24 })}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-rashmi-red transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
                
                {/* Highlight overlay on hover */}
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-r from-rashmi-red/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Top border accent that appears on hover */}
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0 w-0 group-hover:w-full transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technical Specifications Section with Tabs */}
      <section id="specifications" className="py-24 relative gradient-border">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-rashmi-dark/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-16 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-3"
              >
                <span className="text-rashmi-red text-sm font-medium uppercase tracking-wider">Product Details</span>
              </motion.div>
              
              <RevealText
                text="Technical Specifications"
                as="h2"
                className="text-3xl md:text-5xl font-bold text-foreground mb-3"
                staggerDelay={0.05}
              />
              
              <p className="text-muted-foreground text-lg mb-10">
                Comprehensive specifications to help you select the right pipe for your application
              </p>
              
              {/* Tab navigation */}
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                <button 
                  onClick={() => setActiveTab('dimensions')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'dimensions' 
                      ? 'bg-rashmi-red text-white shadow-md' 
                      : 'bg-card border border-border hover:bg-rashmi-red/10'
                  }`}
                >
                  <Ruler size={16} />
                  Dimensions & Sizes
                </button>
                <button 
                  onClick={() => setActiveTab('materials')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'materials' 
                      ? 'bg-rashmi-red text-white shadow-md' 
                      : 'bg-card border border-border hover:bg-rashmi-red/10'
                  }`}
                >
                  <Pipette size={16} />
                  Materials & Properties
                </button>
                <button 
                  onClick={() => setActiveTab('coatings')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'coatings' 
                      ? 'bg-rashmi-red text-white shadow-md' 
                      : 'bg-card border border-border hover:bg-rashmi-red/10'
                  }`}
                >
                  <ShieldCheck size={16} />
                  Coatings & Linings
                </button>
                <button 
                  onClick={() => setActiveTab('standards')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === 'standards' 
                      ? 'bg-rashmi-red text-white shadow-md' 
                      : 'bg-card border border-border hover:bg-rashmi-red/10'
                  }`}
                >
                  <Award size={16} />
                  Standards & Certifications
                </button>
              </div>
            </div>
            
            {/* Tab content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-[1.5rem] overflow-hidden border border-border shadow-xl p-8"
            >
              {activeTab === 'dimensions' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Ruler className="text-rashmi-red" size={24} />
                    Available Dimensions & Sizes
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-rashmi-dark/10 dark:bg-rashmi-red/20 text-left">
                          <th className="p-3 border border-border rounded-tl-lg">Nominal Size (DN)</th>
                          <th className="p-3 border border-border">Outside Diameter (mm)</th>
                          <th className="p-3 border border-border">Wall Thickness (mm)</th>
                          <th className="p-3 border border-border rounded-tr-lg">Weight (kg/m)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {size: 80, diameter: 98, thickness: 6.0, weight: 14.0},
                          {size: 100, diameter: 118, thickness: 6.0, weight: 17.0},
                          {size: 150, diameter: 170, thickness: 6.0, weight: 25.0},
                          {size: 200, diameter: 222, thickness: 6.3, weight: 34.0},
                          {size: 300, diameter: 326, thickness: 7.2, weight: 58.0}
                        ].map((item, index) => (
                          <motion.tr 
                            key={item.size}
                            className={`${index % 2 === 1 ? 'bg-rashmi-dark/5 dark:bg-rashmi-red/5' : ''} hover:bg-rashmi-red/5`}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <td className="p-3 border border-border">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                                {item.size}
                              </div>
                            </td>
                            <td className="p-3 border border-border">{item.diameter}</td>
                            <td className="p-3 border border-border">{item.thickness}</td>
                            <td className="p-3 border border-border">{item.weight}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    Additional sizes available from DN 80 to DN 1600. Contact our technical team for detailed specifications for your specific project requirements.
                  </p>
                </div>
              )}
              
              {activeTab === 'materials' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Pipette className="text-rashmi-red" size={24} />
                    Material Properties
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-5 rounded-lg border border-border hover:shadow-md transition-all duration-300">
                      <h4 className="font-semibold mb-4">Mechanical Properties</h4>
                      <div className="space-y-4">
                        {[
                          {name: "Minimum Tensile Strength", value: "420 MPa", percent: "84%"},
                          {name: "Minimum Yield Strength", value: "300 MPa", percent: "60%"},
                          {name: "Minimum Elongation", value: "10%", percent: "50%"}
                        ].map(prop => (
                          <div key={prop.name} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{prop.name}</span>
                              <span className="font-medium">{prop.value}</span>
                            </div>
                            <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-rashmi-red"
                                initial={{ width: 0 }}
                                whileInView={{ width: prop.percent }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-rashmi-dark/5 dark:bg-card/30 p-5 rounded-lg border border-border">
                      <h4 className="font-semibold mb-4">Chemical Composition</h4>
                      <ul className="space-y-3">
                        {[
                          {element: "Carbon", value: "3.0 - 3.9%"},
                          {element: "Silicon", value: "1.8 - 2.8%"},
                          {element: "Manganese", value: "0.1 - 0.5%"},
                          {element: "Phosphorus", value: "≤ 0.09%"}
                        ].map(item => (
                          <motion.li 
                            key={item.element} 
                            className="flex justify-between items-center p-2 hover:bg-card/80 rounded"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <span className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                              {item.element}
                            </span>
                            <span className="font-medium">{item.value}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    Our ductile iron pipes provide exceptional strength and durability due to their spheroidal graphite microstructure, offering superior mechanical properties compared to traditional cast iron.
                  </p>
                </div>
              )}
              
              {activeTab === 'coatings' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="text-rashmi-red" size={24} />
                    Coatings & Linings
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-4 rounded-lg border border-border hover:shadow-md transition-shadow duration-300">
                      <h4 className="text-lg font-semibold text-rashmi-red mb-2">External Coatings</h4>
                      <ul className="space-y-3">
                        {[
                          {name: "Zinc Coating", desc: "Standard 200 g/m² metallic zinc coating with finishing layer"},
                          {name: "Zinc-Aluminum", desc: "Enhanced 400 g/m² Zn-Al (85/15) coating for aggressive soil conditions"},
                          {name: "Polyethylene Sleeve", desc: "Additional protection option for highly corrosive environments"}
                        ].map((item, index) => (
                          <motion.li 
                            key={item.name} 
                            className="flex items-start gap-2 p-2 hover:bg-rashmi-red/5 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Check size={18} className="text-rashmi-red mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{item.name}:</span>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border hover:shadow-md transition-shadow duration-300">
                      <h4 className="text-lg font-semibold text-rashmi-red mb-2">Internal Linings</h4>
                      <ul className="space-y-3">
                        {[
                          {name: "Cement Mortar", desc: "Standard high-alumina cement lining for potable water applications"},
                          {name: "Polyurethane", desc: "Special lining for aggressive water conditions or sewage applications"},
                          {name: "Epoxy", desc: "Available for specific industrial or chemical transport applications"}
                        ].map((item, index) => (
                          <motion.li 
                            key={item.name} 
                            className="flex items-start gap-2 p-2 hover:bg-rashmi-red/5 rounded-lg"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Check size={18} className="text-rashmi-red mt-1 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{item.name}:</span>
                              <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'standards' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="text-rashmi-red" size={24} />
                    Standards & Certifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <motion.div 
                        className="bg-rashmi-dark/5 dark:bg-card/30 p-4 rounded-lg border border-border"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <h4 className="font-semibold">International Standards</h4>
                        <ul className="mt-2 space-y-2">
                          {[
                            "EN 545: European Standard for water pipes",
                            "ISO 2531: International Standard for DI pipes",
                            "AWWA C151/A21.51: American Water Works Assoc.",
                            "ASTM A536: Standard for ductile iron castings"
                          ].map(standard => (
                            <li key={standard} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                              <span>{standard}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                      <motion.div 
                        className="bg-rashmi-dark/5 dark:bg-card/30 p-4 rounded-lg border border-border"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <h4 className="font-semibold">Quality Management</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                            <span>ISO 9001: Quality Management System</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rashmi-red"></div>
                            <span>ISO 14001: Environmental Management System</span>
                          </li>
                        </ul>
                      </motion.div>
                    </div>
                    <div className="bg-card p-5 rounded-lg border border-border">
                      <h4 className="font-semibold mb-3">Testing & Quality Assurance</h4>
                      <ul className="space-y-3">
                        {[
                          "100% hydrostatic pressure testing at 1.5x operating pressure",
                          "Full dimensional inspection and tolerances verification",
                          "Material composition validation through spectral analysis",
                          "Mechanical property testing including tensile and impact tests",
                          "Coating thickness measurement and adhesion testing",
                          "Full traceability with batch identification marking"
                        ].map((test, index) => (
                          <motion.li 
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Check size={18} className="text-rashmi-red mt-1" />
                            <span>{test}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Manufacturing process section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 bg-card rounded-[1.5rem] overflow-hidden border border-border shadow-xl"
            >
              <DIPipesManufacturing />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-24 relative overflow-hidden gradient-border">
        <div className="absolute inset-0 bg-rashmi-red/10 dark:bg-rashmi-red/5"></div>
        <div className="absolute inset-0 geometric-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(229,57,53,0.1),transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute right-[15%] top-[20%] w-16 h-16 rounded-full bg-rashmi-red/30 blur-md"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute left-[20%] bottom-[30%] w-10 h-10 rounded-full bg-rashmi-red/20 blur-md"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg mb-8">
              Our engineering team is available to help you select the right DI pipe specifications for your project.
              Contact us today for a consultation or request a detailed product catalog.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <a href="/contact-us" className="inline-flex items-center gap-2 bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-4 rounded-full transition-all duration-300 font-medium shadow-lg shadow-rashmi-red/20 group">
                  Contact Us <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <a href="/brochures" className="inline-flex items-center gap-2 bg-background dark:bg-rashmi-dark/10 border border-border hover:bg-card dark:hover:bg-card/20 text-foreground px-8 py-4 rounded-full transition-all duration-300 font-medium group">
                  Download Catalog <BookOpen size={16} className="transition-transform group-hover:scale-110" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div style={{ position: 'relative', zIndex: 100 }}>
        <Footer />
      </div>
    </div>
  );
};

export default DiPipes;
