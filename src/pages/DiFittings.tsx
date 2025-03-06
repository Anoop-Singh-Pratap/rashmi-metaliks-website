<lov-code>
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowDown, Check, ScrollText, BookOpen, Settings, Factory, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpecificationTable from '../components/ui/SpecificationTable';
import ProductFeatures from '../components/ui/ProductFeatures';

// Mechanical properties table data
const mechanicalProperties = [
  { property: "Tensile Strength", value: "Min. 4,200 Kg/cm² or 420 MPA" },
  { property: "Elongation", value: "Min. 5%" },
  { property: "Hardness", value: "Max. 250 BHN" },
];

// Technical specifications table data
const technicalSpecifications = [
  { property: "Product", value: "Ductile Iron (DI) Pipe Fittings suitable for Push-on-Joints, Flange Joints & Self Restrained Joints" },
  { property: "Size Range", value: "DN 80 to 1600" },
  { property: "Class of DI Fittings", value: "K-12 & K-14" },
  { property: "Standard Length (in Meters)", value: "5.5" },
  { property: "Internal Linings", value: "Cement Mortar Lining of OPC / BFSC / SRC / HAC\nCement Lining with Epoxy Seal Coat\nCement Lining with Bituminous Seal Coat and FBE Coating" },
  { property: "External Coating – 1", value: "Zinc Coating (150 gm/m²) or 220 gm/m²" },
  { property: "External Coating – 2", value: "Bitumen Coating\nBlue/Red/Black Epoxy\nFBE Coating" },
  { property: "Outside OnSite Protection", value: "Polyethylene Sleeving" },
  { property: "Coating of Joint Area", value: "Bitumen / Epoxy as per customer requirement" },
  { property: "Conforming Specifications", value: "EN 545:2010 / EN 545:2006\nISO 2531:2009 / ISO 2531:1998\nEN 598:2007 / ISO 7186:2011\nIS 9523 : 2000" },
];

// Angular deflection data
const angularDeflectionData = [
  { range: "DN 100 - DN 150", deflection: "3°30'" },
  { range: "DN 200 - DN 300", deflection: "3°30'" },
  { range: "DN 350 - DN 600", deflection: "2°30'" },
  { range: "DN 700 - DN 800", deflection: "1°30'" },
  { range: "DN 900 - DN 1000", deflection: "1°30'" },
  { range: "DN 1100 - DN 1200", deflection: "1°30'" },
];

// Advantages data
const advantages = [
  {
    title: "Quality Standards",
    description: "Quality as per International benchmarks."
  },
  {
    title: "Modern Casting",
    description: "Most modern casting techniques result in good-quality casting."
  },
  {
    title: "High Accuracy",
    description: "High dimensional accuracy leads to proper fitment."
  },
  {
    title: "Coating Options",
    description: "Varied options for coating and lining depending on external and internal conditions."
  },
  {
    title: "Customer Support",
    description: "Proven pre-sales and after-sales support."
  }
];

// Joint types data
const jointTypes = [
  {
    title: "Socket Joints",
    description: "Standard socket joints for secure pipe connection."
  },
  {
    title: "Flanged Joints",
    description: "Reliable flanged joints for versatile applications."
  },
  {
    title: "Self Restrained Joints",
    description: "Special joints designed for high-pressure applications."
  }
];

const DiFittings = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);
  
  const [activeTab, setActiveTab] = useState('description');
  const specsRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const facilityRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  
  // Scroll to section when tab changes
  useEffect(() => {
    const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
      if (ref && ref.current) {
        const yOffset = -100; // Adjust to account for fixed header
        const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };
    
    if (activeTab === 'description') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (activeTab === 'specs') {
      scrollToRef(specsRef);
    } else if (activeTab === 'advantages') {
      scrollToRef(advantagesRef);
    } else if (activeTab === 'facility') {
      scrollToRef(facilityRef);
    } else if (activeTab === 'range') {
      scrollToRef(rangeRef);
    } else if (activeTab === 'vision') {
      scrollToRef(visionRef);
    }
  }, [activeTab]);

  // Change active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      const getRefPosition = (ref: React.RefObject<HTMLDivElement>) => {
        return ref.current ? ref.current.offsetTop - 150 : 0;
      };
      
      if (scrollPosition < getRefPosition(specsRef)) {
        setActiveTab('description');
      } else if (scrollPosition < getRefPosition(advantagesRef)) {
        setActiveTab('specs');
      } else if (scrollPosition < getRefPosition(facilityRef)) {
        setActiveTab('advantages');
      } else if (scrollPosition < getRefPosition(rangeRef)) {
        setActiveTab('facility');
      } else if (scrollPosition < getRefPosition(visionRef)) {
        setActiveTab('range');
      } else {
        setActiveTab('vision');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transform property and value arrays into headers and rows for SpecificationTable
  const getHeadersAndRows = (data: Array<{property: string, value: string}>) => {
    return {
      headers: ["Property", "Value"],
      rows: data.map(item => ({
        Property: item.property,
        Value: item.value
      }))
    };
  };

  // Prepare angular deflection data for SpecificationTable
  const getAngularDeflectionHeadersAndRows = () => {
    return {
      headers: ["Diameter Range", "Angular Deflection"],
      rows: angularDeflectionData.map(item => ({
        "Diameter Range": item.range,
        "Angular Deflection": item.deflection
      }))
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-24 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/80 mix-blend-multiply z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1582655432787-c7b89f741cc4?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
            alt="DI Fittings Manufacturing" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="block"
              >
                Ductile Iron
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block"
              >
                <span className="text-rashmi-red">Fittings</span>
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/90 text-lg md:text-xl max-w-2xl mb-8"
            >
              Complete your pipeline systems with our high-quality ductile iron fittings, 
              manufactured using cutting-edge casting techniques and meeting international standards.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="#advantages" 
                onClick={(e) => {e.preventDefault(); setActiveTab('advantages');}}
                className="bg-rashmi-red hover:bg-rashmi-red/90 text-white px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors"
              >
                Explore Advantages <ArrowDown size={16} className="ml-2" />
              </a>
              <a 
                href="#specs" 
                onClick={(e) => {e.preventDefault(); setActiveTab('specs');}}
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors"
              >
                View Specifications <ScrollText size={16} className="ml-2" />
              </a>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/70 mb-2 text-sm">Scroll to learn more</span>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "loop", 
              ease: "easeInOut" 
            }}
          >
            <ArrowDown size={20} className="text-white/70" />
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Navigation Tabs */}
      <div className="sticky top-20 bg-background z-40 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar py-2">
            <button 
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 whitespace-nowrap font-medium ${
                activeTab === 'description' 
                  ? 'text-rashmi-red border-b-2 border-rashmi-red' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 whitespace-nowrap font-medium ${
                activeTab === 'specs' 
                  ? 'text-rashmi-red border-b-2 border-rashmi-red' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab('advantages')}
              className={`px-4 py-2 whitespace-nowrap font-medium ${
                activeTab === 'advantages' 
                  ? 'text-rashmi-red border-b-2 border-rashmi-red' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Why Rashmi DI Fittings
            </button>
            <button 
              onClick={() => setActiveTab('facility')}
              className={`px-4 py-2 whitespace-nowrap font-medium ${
                activeTab === 'facility' 
                  ? 'text-rashmi-red border-b-2 border-rashmi-red' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Manufacturing Facility
            </button>
            <button 
              onClick={() => setActiveTab('range')}
              className={`px-4 py-2 whitespace-nowrap font-medium ${
                activeTab === 'range' 
                  ? 'text-rashmi-red border-b-2 border-rashmi-red' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Product Range
            </button>
            <button 
              onClick={() => setActiveTab('vision')}
              className={`px-4 py-2 whitespace-nowrap font-medium ${
                activeTab === 'vision' 
                  ? 'text-rashmi-red border-b-2 border-rashmi-red' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Global Vision
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <section className="max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Ductile Iron Fittings</h2>
            <p>
              Rashmi Metaliks is one of India's leading manufacturers of Ductile Iron Fittings. The fittings are created using cutting-edge casting 
              techniques such as the Vacuum Lost Foam Process (VLFP) and High-Pressure Moulding Process. Our manufacturing plants are equipped with 
              cutting-edge machinery, sophisticated finishing facilities, and cutting-edge testing laboratories.
            </p>
            <p>
              Rashmi Metaliks manufactures both pipes and fittings, making it a one-stop shop for all of your pipeline needs, with good compatibility 
              between pipes and fittings.
            </p>
            <p>
              Rashmi Metaliks offers Fittings in diameters DN 80 to DN 1600 mm with a number of jointing options, coatings, and linings to meet the 
              differing requirements of the customer.
            </p>
            <p>
              To ensure their high performance in most adverse situations/environments, our Fittings are internally and externally fusion bonded epoxy 
              coated to a minimum thickness of 250µm in either WRAS-approved Blue (Potable water) or Red (Sewerage) in accordance with EN 545 / EN 598 
              and EN 14901.
            </p>
            <p>
              In addition, alternative coatings may also be available as per the customer's requirements.
            </p>
          </motion.div>
          
          {/* Joint Types Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-display font-bold mb-8">THREE PRINCIPAL JOINT TYPES</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jointTypes.map((joint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-xl font-semibold mb-3">{joint.title}</h4>
                  <p className="text-muted-foreground">{joint.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Protection Options Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-display font-bold mb-8">EXTERNAL PROTECTION OPTIONS FOR FITTINGS</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-medium mb-2">Fusion Bonded Epoxy Coating</h4>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-medium mb-2">Polyurethane Coating</h4>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-medium mb-2">Zinc Rich Paint With A Liquid Epoxy Finishing Layer</h4>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-display font-bold mb-8">INTERNAL PROTECTION OPTIONS FOR FITTINGS</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-medium mb-2">Fusion Bonded Epoxy Coating</h4>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-medium mb-2">Cement Mortar Lining</h4>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h4 className="font-medium mb-2">Ceramic Epoxy</h4>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Specifications Section */}
        <section ref={specsRef} className="py-12 mb-24 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
              Technical <span className="text-rashmi-red">Specifications</span>
            </h2>
            
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-6">Mechanical Properties of DI Fittings</h3>
              <SpecificationTable 
                headers={getHeadersAndRows(mechanicalProperties).headers} 
                rows={getHeadersAndRows(mechanicalProperties).rows} 
              />
            </div>
            
            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-6">Technical Specifications of DI Fittings</h3>
              <SpecificationTable 
                headers={getHeadersAndRows(technicalSpecifications).headers} 
                rows={getHeadersAndRows(technicalSpecifications).rows} 
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">Angular Deflection of DI Fittings</h3>
              <SpecificationTable 
                headers={getAngularDeflectionHeadersAndRows().headers} 
                rows={getAngularDeflectionHeadersAndRows().rows} 
              />
            </div>
          </motion.div>
        </section>
        
        {/* Why Rashmi DI Fittings Section */}
        <section ref={advantagesRef} className="py-12 mb-24 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">
              Why Rashmi <span className="text-rashmi-red">DI Fittings</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Rashmi Metaliks is one of the leading manufacturers of Ductile Iron Fittings with a number of jointing and internal/external coating options. 
              For the transportation of potable drinking water, raw water, and wastewater, our products are in compliance with numerous international and European standards.
            </p>
            
            <ProductFeatures features={advantages} />
          </motion.div>
        </section>
        
        {/* Manufacturing Facility Section */}
        <section ref={facilityRef} className="py-12 mb-24 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-8">
              <Factory size={30} className="text-rashmi-red mr-3" />
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Manufacturing <span className="text-rashmi-red">Facility</span>
              </h2>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                The Ductile Iron Fittings from the Rashmi Metaliks are manufactured in a state-of-the-art and integrated plant located in Kharagpur, West Bengal. 
                The plant is able to greatly control the quality of the DI Fittings as it has vertically integrated all its processes, including putting up its own:
              </p>
              
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <Check size={24} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Sintering Plant</span>
                </li>
                <li className="flex items-start">
                  <Check size={24} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Blast Furnace</span>
                </li>
                <li className="flex items-start">
                  <Check size={24} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Committed Railway Sliding</span>
                </li>
                <li className="flex items-start">
                  <Check size={24} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Pellet Plant</span>
                </li>
                <li className="flex items-start">
                  <Check size={24} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Captive Power Unit</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-12">
              <div className="relative rounded-xl overflow-hidden h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1622778455593-ff775a50235a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                  alt="Manufacturing Facility" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white">State-of-the-art Manufacturing</h3>
                  <p className="text-white/80">Our integrated facility ensures consistent quality control</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Product Range Section */}
        <section ref={rangeRef} className="py-12 mb-24 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-8">
              <Settings size={30} className="text-rashmi-red mr-3" />
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Product <span className="text-rashmi-red">Range</span>
              </h2>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                We supply A+ grade quality of DI Fittings from DN 80 to DN 1600 manufactured for a wide range of applications. 
                These are perfect pipe jointing materials for a variety of applications thanks to their high safety factor and availability in a wide range.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Socket Joints</h3>
                <img 
                  src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                  alt="Socket Joints" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-muted-foreground">
                  Our socket joints provide a secure and reliable connection for your pipeline systems.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Flanged Joints</h3>
                <img 
                  src="https://images.unsplash.com/photo-1576400883215-7083980b6193?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                  alt="Flanged Joints" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-muted-foreground">
                  Flanged joints designed for versatile applications and easy maintenance.
                </p>
              </motion.div>
            </div>
            
            <div className="mt-16">
              <h3 className="text-2xl font-semibold mb-6">Available Sizes and Specifications</h3>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-lg mb-4">
                  Our DI Fittings are available in a wide range of sizes and specifications to meet your specific requirements:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-rashmi-red mr-3"></div>
                    <span>Sizes from DN 80 to DN 1600</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-rashmi-red mr-3"></div>
                    <span>Multiple coating options for various applications</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-rashmi-red mr-3"></div>
                    <span>Three principal joint types: Socket, Flanged, and Self Restrained</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-rashmi-red mr-3"></div>
                    <span>Compliance with international standards</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Indian Product: Global Vision Section */}
        <section ref={visionRef} className="py-12 mb-12 scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-8">
              <Globe size={30} className="text-rashmi-red mr-3" />
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Indian Product: <span className="text-rashmi-red">Global Vision</span>
              </h2>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Rashmi Metaliks is accredited to ISO9001, OHSAS18001 & ISO14001. The DI Fittings are manufactured as per the domestic standard IS 9523 
                and International Standards ISO:2531, BSEN545 and BSEN598. These accreditation have earned us the trust of a large number of domestic 
                and international clients.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {['ISO9001', 'OHSAS18001', 'ISO14001', 'BSEN545'].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen size={24} className="text-rashmi-red" />
                  </div>
                  <h4 className="font-medium">{cert}</h4>
                  <p className="text-sm text
