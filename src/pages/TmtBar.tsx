
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Check, ScrollText, BookOpen, Settings, Factory, Globe, Flame } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TmtBar = () => {
  const [activeTab, setActiveTab] = useState('features');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const yOffset = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  
  const grades = [
    {
      name: "Rashmi TMT Fe 415",
      description: "Standard grade for general construction applications",
      strength: "415 MPa"
    },
    {
      name: "Rashmi TMT Fe 415D",
      description: "Ductile variant with improved bendability",
      strength: "415 MPa"
    },
    {
      name: "Rashmi TMT Fe 500",
      description: "Higher strength grade for demanding structures",
      strength: "500 MPa"
    },
    {
      name: "Rashmi TMT Fe 500D",
      description: "Premium ductile grade for seismic zones",
      strength: "500 MPa"
    },
    {
      name: "Rashmi TMT Fe 550 EQCR",
      description: "Highest strength grade for critical infrastructure",
      strength: "550 MPa"
    }
  ];
  
  const processSteps = [
    {
      title: "DRI Treatment",
      description: "Raw materials are treated at the Direct Reduced Iron plant",
      icon: Factory
    },
    {
      title: "Steel Melting",
      description: "High quality billets are obtained from the steel melting shop",
      icon: Flame
    },
    {
      title: "Rolling Mill",
      description: "Billets are passed through the state-of-the-art rolling mill",
      icon: Settings
    },
    {
      title: "Self-Tempering",
      description: "Process results in a structure called 'Tempered Martensite'",
      icon: Flame
    },
    {
      title: "Atmospheric Cooling",
      description: "Heat of the core area tempers the Martensite part forming a ductile Ferrite Pearlite structure",
      icon: ScrollText
    },
    {
      title: "Quality Testing",
      description: "Mechanical & chemical tests at par with IS 1786:2008",
      icon: Check
    }
  ];

  const advantages = [
    {
      title: "Earthquake Resistant",
      description: "Higher elongation makes the bars resistant against earthquakes",
      icon: Factory
    },
    {
      title: "Corrosion Resistant",
      description: "Hard Ferric Oxide layer provides protection against corrosion",
      icon: Globe
    },
    {
      title: "Fire Resistant",
      description: "Bars can tolerate heat up to 600ᵒ centigrade",
      icon: Flame
    },
    {
      title: "Extra Strength",
      description: "Combination of tempered martensite and fine grain ferrite-pearlite provides higher strength",
      icon: Settings
    },
    {
      title: "Super Bondability",
      description: "TMT Bars strongly bond with surrounding concrete",
      icon: Check
    },
    {
      title: "Higher Weldability",
      description: "Low carbon raw materials ensure higher weldability",
      icon: Settings
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Premium <span className="text-rashmi-red">TMT Bars</span> for World-Class Infrastructure
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              The TMT Bars produced by Rashmi Metaliks are world-class products with high utility for building flyovers, dams, bridges, and other critical infrastructure projects.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-2xl mx-auto"
            >
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">4 Lakh MTPA</h3>
                <p className="text-muted-foreground">Pig Iron & Sinter Plant Capacity</p>
              </motion.div>
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">5 Grades</h3>
                <p className="text-muted-foreground">From Fe 415 to Fe 550 EQCR</p>
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <a 
            href="#grades" 
            className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span className="mb-2">Explore Grades</span>
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

      {/* Grades Section */}
      <section id="grades" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Rashmi TMT <span className="text-rashmi-red">Grade Range</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our comprehensive range of TMT grades available to meet diverse structural requirements
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {grades.map((grade, index) => (
              <motion.div
                key={grade.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "var(--card-bg-hover)"
                }}
                className="bg-card border border-border rounded-lg p-6 transition-all duration-300 relative overflow-hidden"
              >
                <div className="mb-3 bg-rashmi-red/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Settings className="text-rashmi-red" size={22} />
                </div>
                <h3 className="text-xl font-bold mb-2">{grade.name}</h3>
                <p className="text-muted-foreground mb-3">{grade.description}</p>
                <div className="flex items-center text-sm font-medium">
                  <span className="mr-2">Yield Strength:</span>
                  <span className="text-rashmi-red">{grade.strength}</span>
                </div>
                
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-r from-rashmi-red/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Production <span className="text-rashmi-red">Process</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our TMT production strictly follows established Standard Operating Procedures
            </motion.p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border/50 rounded-full z-0"></div>
            
            {/* Process steps */}
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center mb-16 relative ${isEven ? 'justify-end md:pl-10' : 'md:pr-10'}`}
                >
                  <div className={`md:w-1/2 relative z-10 ${isEven ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <div className={`bg-card border border-border p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md ${isEven ? 'md:ml-auto' : ''}`}>
                      <div className="flex items-center mb-3">
                        <div className={`bg-rashmi-red/10 w-10 h-10 rounded-full flex items-center justify-center ${isEven ? 'ml-auto mr-0' : 'mr-3'}`}>
                          {React.createElement(step.icon, { className: "text-rashmi-red", size: 18 })}
                        </div>
                        {!isEven && <h3 className="text-lg font-bold">{step.title}</h3>}
                        {isEven && <h3 className="text-lg font-bold mr-3">{step.title}</h3>}
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Center node */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-rashmi-red z-10 flex items-center justify-center"
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <span className="w-3 h-3 rounded-full bg-white"></span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Advantages Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              <span className="text-rashmi-red">Advantages</span> of Rashmi TMT Bars
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our high-quality manufacturing process leads to exceptional product benefits
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
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
                  {React.createElement(advantage.icon, { className: "text-rashmi-red", size: 22 })}
                </div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
                
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-r from-rashmi-red/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
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
                Ready to use Rashmi TMT for your next <span className="text-rashmi-red">project?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Contact our experts to learn more about our TMT Bars and how they can benefit your construction needs.
              </p>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
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
