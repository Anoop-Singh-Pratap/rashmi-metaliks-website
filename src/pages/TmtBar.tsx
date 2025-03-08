
import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, CheckCircle, Layers, Shield, Zap, Award, Factory, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductFeatures from '../components/ui/ProductFeatures';

const TmtBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  
  const processSteps = [
    {
      title: "Raw Material Treatment",
      description: "Raw materials are treated at the DRI (Direct Reduced Iron) plant.",
      icon: Factory
    },
    {
      title: "Billet Production",
      description: "High quality billets are obtained from the steel melting shop.",
      icon: Layers
    },
    {
      title: "Rolling Mill",
      description: "Billets are passed through the state-of-the-art rolling mill.",
      icon: Factory
    },
    {
      title: "Self-Tempering",
      description: "Self-Tempering process is used to result in a structure called 'Tempered Martensite'.",
      icon: Zap
    },
    {
      title: "Atmospheric Cooling",
      description: "Atmospheric Cooling process tempers the Martensite part and the ductile core becomes the Ferrite Pearlite structure.",
      icon: Shield
    },
    {
      title: "Testing & Packaging",
      description: "Mechanical & chemical tests are done at par with IS 1786:2008. TMT Bars are cut into required length, bundled up and tagged.",
      icon: CheckCircle
    }
  ];

  const advantages = [
    {
      title: "Earthquake Resistant",
      description: "Higher elongation makes them resistant against earthquakes",
      icon: AlertCircle
    },
    {
      title: "Corrosion Resistant",
      description: "Hard Ferric Oxide layer helps resist against corrosion",
      icon: Shield
    },
    {
      title: "Fire Resistant",
      description: "Tolerates heat up to 600° centigrade",
      icon: Zap
    },
    {
      title: "Extra Strength",
      description: "Higher strength, toughness and ductility",
      icon: Award
    },
    {
      title: "Super Bondability",
      description: "Strong bond with concrete for enhanced construction",
      icon: CheckCircle
    },
    {
      title: "Higher Weldability",
      description: "Low carbon ensures higher weldability",
      icon: Factory
    }
  ];

  const tmtGrades = [
    "Rashmi TMT Fe 415",
    "Rashmi TMT Fe 415D",
    "Rashmi TMT Fe 500",
    "Rashmi TMT Fe 500D",
    "Rashmi TMT Fe 550 EQCR"
  ];

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

  const scrollToAdvantages = () => {
    const advantagesSection = document.getElementById('advantages');
    if (advantagesSection) {
      advantagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <Helmet>
        <title>TMT Bars - High-Quality Construction Material | Rashmi Metaliks</title>
        <meta name="description" content="Rashmi Metaliks produces world-class TMT Bars with high yield load, ductility & quality for flyovers, dams, bridges and critical infrastructure projects." />
        <meta name="keywords" content="TMT Bars, Construction, Rashmi TMT, Fe 500D, earthquake resistant, fire resistant" />
        <link rel="canonical" href="https://www.rashmi.com/tmt-bar" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background to-muted/30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587289554328-57cb1a5a3c59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-center">
              Engineering <span className="text-rashmi-red">Structural Excellence</span>
              <span className="block text-2xl mt-4 font-medium text-muted-foreground">Premium TMT Steel Bars</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8 text-center">
              The TMT Bars produced by Rashmi Metaliks are world-class products with high yield load, 
              ductility & quality for infrastructure projects where strength meets precision.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto"
            >
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">4 Lakh</h3>
                <p className="text-muted-foreground">MTPA Capacity</p>
              </motion.div>
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">2009</h3>
                <p className="text-muted-foreground">Est. Steel Melting</p>
              </motion.div>
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300 col-span-2 sm:col-span-1"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">2010</h3>
                <p className="text-muted-foreground">Est. Rolling Mill</p>
              </motion.div>
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
  className="mt-16 text-center" // Removed absolute positioning
>
  <motion.button 
    onClick={scrollToAdvantages}
    className="flex flex-col items-center mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 focus:outline-none"
    whileHover={{ y: 5 }}
  >
    <span className="mb-2">Explore Advantages</span>
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="bg-rashmi-red/90 rounded-full w-8 h-8 flex items-center justify-center"
    >
      <ArrowDown size={18} className="text-white" />
    </motion.div>
  </motion.button>
</motion.div>
      </section>

      {/* TMT Grades Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-display font-bold mb-4 text-center"
              >
                Rashmi <span className="text-rashmi-red">TMT</span> Grades
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-lg text-center"
              >
                Our diverse range of high-quality TMT grades for various construction needs
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tmtGrades.map((grade, index) => (
                <motion.div
                  key={grade}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)"
                  }}
                  className="bg-card border border-border rounded-lg p-6 text-center transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto bg-rashmi-red/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-rashmi-red/20 transition-colors duration-300">
                    <Award className="text-rashmi-red" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{grade}</h3>
                  <div className="h-1 w-16 bg-rashmi-red/60 mx-auto rounded-full my-3"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Advantages Section */}
      <section id="advantages" className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-center"
            >
              Key <span className="text-rashmi-red">Advantages</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg text-center"
            >
              Our TMT Bars offer significant advantages over conventional reinforcement bars
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "hsl(var(--card))"
                }}
                className="bg-card border border-border rounded-lg p-6 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-gradient-to-r from-rashmi-red/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="mb-4 bg-rashmi-red/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-rashmi-red/20 transition-colors duration-300">
                    {React.createElement(advantage.icon, { className: "text-rashmi-red", size: 22 })}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground">{advantage.description}</p>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "40%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    className="h-1 bg-rashmi-red/60 rounded-full mt-4 group-hover:width-[60%] group-hover:bg-rashmi-red transition-all duration-300"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Manufacturing Process */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6 text-center"
            >
              Manufacturing <span className="text-rashmi-red">Process</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg text-center"
            >
              Our precision manufacturing process ensures the highest quality TMT Bars
            </motion.p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center mb-8">
              {processSteps.map((step, index) => (
                <motion.button
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setActiveProcessStep(index)}
                  whileHover={{ scale: activeProcessStep === index ? 1 : 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium m-1 transition-all ${
                    activeProcessStep === index 
                      ? 'bg-rashmi-red text-white shadow-md' 
                      : 'bg-card border border-border text-foreground hover:bg-muted'
                  }`}
                >
                  Step {index + 1}
                </motion.button>
              ))}
            </div>
            
            <motion.div
              key={activeProcessStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-xl p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-rashmi-red/20 to-background border border-border/40 rounded-full w-20 h-20 flex items-center justify-center">
                  {React.createElement(processSteps[activeProcessStep].icon, { 
                    className: "text-rashmi-red", 
                    size: 32
                  })}
                </div>
                
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    Step {activeProcessStep + 1}: {processSteps[activeProcessStep].title}
                  </h3>
                  <p className="text-muted-foreground">{processSteps[activeProcessStep].description}</p>
                  
                  <div className="mt-8 flex items-center">
                    <div className="h-2 bg-muted rounded-full flex-grow">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeProcessStep + 1) / processSteps.length * 100}%` }}
                        className="h-full bg-rashmi-red rounded-full"
                        transition={{ duration: 0.5 }}
                      ></motion.div>
                    </div>
                    <span className="ml-4 text-sm font-medium">
                      {Math.round((activeProcessStep + 1) / processSteps.length * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Applications Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-display font-bold mb-6 text-center lg:text-left">
                  <span className="text-rashmi-red">Applications</span> & Uses
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our TMT Bars have high utility in building flyovers, dams, bridges and other large and 
                  critical infrastructure projects where we need to marry high yield load with ductility & quality.
                </p>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                    className="flex items-start p-4 bg-card rounded-lg border border-border transition-all duration-300"
                  >
                    <CheckCircle className="h-5 w-5 text-rashmi-red mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-lg">Infrastructure Projects</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Bridges, flyovers, dams and other critical projects
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                    className="flex items-start p-4 bg-card rounded-lg border border-border transition-all duration-300"
                  >
                    <CheckCircle className="h-5 w-5 text-rashmi-red mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-lg">Commercial Buildings</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Shopping centers, offices, and other commercial structures
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                    className="flex items-start p-4 bg-card rounded-lg border border-border transition-all duration-300"
                  >
                    <CheckCircle className="h-5 w-5 text-rashmi-red mt-0.5 mr-3" />
                    <div>
                      <h3 className="font-medium text-lg">Industrial Structures</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Factories, warehouses, and industrial complexes
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-muted to-background rounded-2xl border border-border overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621354598022-16599af1b8f8?q=80&w=1000')] bg-center bg-cover opacity-20"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      whileInView={{ 
                        scale: [0.8, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 2,
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      className="w-48 h-48 rounded-full bg-gradient-to-br from-rashmi-red/20 to-rashmi-red/5 border border-border/50 shadow-lg flex items-center justify-center"
                    >
                      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-card to-background border border-border/30 shadow-inner flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ 
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <Shield size={48} className="text-rashmi-red" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="absolute -right-4 -bottom-4 w-24 h-24 bg-rashmi-red/10 rounded-full blur-xl"
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
                Ready to use Rashmi TMT for your <span className="text-rashmi-red">construction projects?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto text-center">
                Contact our experts to learn more about our high-quality TMT Bars and how they can benefit your construction projects.
              </p>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90 hover:shadow-lg hover-glow"
              >
                Contact Us Today
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

export default TmtBar;
