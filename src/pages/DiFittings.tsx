
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, Check, ScrollText, Settings, Factory, Globe, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpecificationTable from '../components/ui/SpecificationTable';
import ProductFeatures from '../components/ui/ProductFeatures';

const DiFittings = () => {
  const [activeTab, setActiveTab] = useState('specifications');
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFitting, setSelectedFitting] = useState("socket");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  
  // Create helper functions to transform data for SpecificationTable
  const transformDataToTableFormat = (data: { property: string; value: string }[]) => {
    const headers = ["Property", "Value"];
    const rows = data.map(item => [item.property, item.value]);
    return { headers, rows };
  };
  
  const socketSpecifications = [
    { property: "Standard", value: "EN 545, ISO 2531" },
    { property: "Diameter Range", value: "DN 80-1000 mm" },
    { property: "Pressure Class", value: "PN 10, PN 16, PN 25" },
    { property: "Coating", value: "Bitumen/Epoxy" },
    { property: "Lining", value: "Cement Mortar" },
    { property: "Material", value: "Ductile Iron GGG 50" },
    { property: "Joint Type", value: "Push-on, Mechanical" },
    { property: "Length", value: "Variable" }
  ];
  
  const flangeSpecifications = [
    { property: "Standard", value: "EN 545, ISO 2531" },
    { property: "Diameter Range", value: "DN 80-1200 mm" },
    { property: "Pressure Class", value: "PN 10, PN 16, PN 25, PN 40" },
    { property: "Flange Standard", value: "EN 1092-2, ISO 7005-2" },
    { property: "Coating", value: "Bitumen/Epoxy" },
    { property: "Lining", value: "Cement Mortar" },
    { property: "Material", value: "Ductile Iron GGG 50" },
    { property: "Drilling Pattern", value: "PN 10/16, ANSI, JIS" }
  ];
  
  const bendSpecifications = [
    { property: "Standard", value: "EN 545, ISO 2531" },
    { property: "Diameter Range", value: "DN 80-1000 mm" },
    { property: "Angle", value: "11.25°, 22.5°, 30°, 45°, 90°" },
    { property: "Pressure Class", value: "PN 10, PN 16, PN 25" },
    { property: "Coating", value: "Bitumen/Epoxy" },
    { property: "Lining", value: "Cement Mortar" },
    { property: "Material", value: "Ductile Iron GGG 50" },
    { property: "Joint Type", value: "Push-on, Flanged" }
  ];
  
  const features = [
    {
      title: "Corrosion Resistance",
      description: "Enhanced resistance to corrosion through speciality coatings and linings",
      icon: "shield"
    },
    {
      title: "Temperature Tolerance",
      description: "Withstands temperature variations while maintaining structural integrity",
      icon: "thermometer"
    },
    {
      title: "Pressure Rating",
      description: "High pressure ratings from PN 10 to PN 40 for different application needs",
      icon: "gauge"
    },
    {
      title: "Easy Installation",
      description: "Designed for simple and quick installation with push-on or mechanical joints",
      icon: "tool"
    },
    {
      title: "Hydraulic Efficiency",
      description: "Smooth internal surface provides excellent hydraulic flow characteristics",
      icon: "droplet"
    },
    {
      title: "Long Service Life",
      description: "Exceptional durability with service life exceeding 100 years",
      icon: "clock"
    }
  ];
  
  const fittingTypes = [
    {
      id: "socket",
      name: "Double Socket",
      description: "For straight pipeline connections with push-on joints",
      imageUrl: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=500"
    },
    {
      id: "flange",
      name: "Flanged Fittings",
      description: "For connection to valves, pumps and above-ground applications",
      imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=500"
    },
    {
      id: "bend",
      name: "Bends & Elbows",
      description: "For changing direction of pipeline with various angles",
      imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=500"
    }
  ];
  
  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ductile Iron <span className="text-rashmi-red">Fittings</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mb-8">
              Premium quality ductile iron fittings manufactured to international standards for water and sewage pipeline systems. Our fittings ensure reliable connections and seamless pipeline operations.
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
                DN 80-1200
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
            href="#product-range" 
            className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span className="mb-2">Explore Our Range</span>
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
      
      {/* Product Range Section */}
      <section id="product-range" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Our Comprehensive <span className="text-rashmi-red">Fitting Range</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Explore our extensive range of ductile iron fittings designed for various pipeline applications
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {fittingTypes.map((fitting, index) => (
              <motion.div
                key={fitting.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2)" 
                }}
                className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                  selectedFitting === fitting.id ? 'ring-2 ring-rashmi-red' : ''
                }`}
                onClick={() => setSelectedFitting(fitting.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={fitting.imageUrl} 
                    alt={fitting.name} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{fitting.name}</h3>
                  <p className="text-muted-foreground mb-4">{fitting.description}</p>
                  <div className="flex items-center text-rashmi-red">
                    <span className="text-sm font-medium">View Specifications</span>
                    <ChevronDown size={16} className={`ml-2 transition-transform duration-300 ${
                      selectedFitting === fitting.id ? 'rotate-180' : ''
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Specifications Section */}
      <section id="specifications" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Technical <span className="text-rashmi-red">Specifications</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Detailed technical specifications for our ductile iron fittings
            </motion.p>
            
            <div className="inline-flex bg-muted rounded-lg p-1.5 mb-8">
              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'specifications'
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'features'
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'applications'
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Applications
              </button>
            </div>
          </div>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'specifications' && (
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {selectedFitting === "socket" && (
                    <SpecificationTable {...transformDataToTableFormat(socketSpecifications)} />
                  )}
                  {selectedFitting === "flange" && (
                    <SpecificationTable {...transformDataToTableFormat(flangeSpecifications)} />
                  )}
                  {selectedFitting === "bend" && (
                    <SpecificationTable {...transformDataToTableFormat(bendSpecifications)} />
                  )}
                </motion.div>
              </div>
            )}
            
            {activeTab === 'features' && (
              <div>
                <ProductFeatures features={features} />
              </div>
            )}
            
            {activeTab === 'applications' && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Common Applications</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-rashmi-red/10 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-rashmi-red" />
                    </div>
                    <p className="ml-3 text-muted-foreground">Municipal water distribution networks</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-rashmi-red/10 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-rashmi-red" />
                    </div>
                    <p className="ml-3 text-muted-foreground">Industrial water supply systems</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-rashmi-red/10 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-rashmi-red" />
                    </div>
                    <p className="ml-3 text-muted-foreground">Sewage and wastewater management</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-rashmi-red/10 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-rashmi-red" />
                    </div>
                    <p className="ml-3 text-muted-foreground">Fire protection networks</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-rashmi-red/10 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-rashmi-red" />
                    </div>
                    <p className="ml-3 text-muted-foreground">Irrigation systems for agriculture</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-rashmi-red/10 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-rashmi-red" />
                    </div>
                    <p className="ml-3 text-muted-foreground">Hydropower plants and dams</p>
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Need custom <span className="text-rashmi-red">fittings</span> for your project?
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Our expert team can help you select the right fittings for your specific application or design custom solutions to meet your requirements.
              </p>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
              >
                Contact Our Experts
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

export default DiFittings;
