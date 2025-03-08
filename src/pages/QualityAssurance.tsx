
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, Filter, Microscope, Flask, FileCheck, Ruler, Settings, Tool, Award, ZoomIn } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const qualityProcesses = [
  {
    id: 1,
    title: "Design & Patterns",
    category: "pre-production",
    description: "Our design department creates precision patterns for perfect castings, with advanced modeling and simulation.",
    equipments: ["Design Department", "Pattern Shop"],
  },
  {
    id: 2,
    title: "Sand Testing",
    category: "pre-production",
    description: "Comprehensive sand testing ensures optimal molding materials for casting, with precise measurement of permeability and strength.",
    equipments: ["Permeability Meter", "Universal Strength Machine", "Compactability Tester", "Sieve Shaker"],
  },
  {
    id: 3,
    title: "Physical Testing",
    category: "quality-control",
    description: "In-depth material analysis ensures our products meet the highest physical property standards.",
    equipments: ["Spectrometer", "Universal Testing Machine", "Metalsoft Microscope", "Hardness Testing Machine"],
  },
  {
    id: 4,
    title: "Finishing Facility",
    category: "production",
    description: "Advanced finishing processes ensure our products have perfect surface quality and protection.",
    equipments: ["Shot Blasting Facility", "Fettling"]
  },
  {
    id: 5,
    title: "Quality Inspection",
    category: "quality-control",
    description: "Comprehensive testing at every stage ensures our products exceed all quality standards.",
    equipments: ["Carbon Equivalent", "Temperature Control", "Zinc Coating Mass", "Bitumen Coating Thickness", 
                "Chemical Analysis", "Thickness Control", "Microstructure Analysis", "Hydraulic Testing Machine",
                "Ring Test", "Cement Lining Thickness", "Spigot Outer Diameter", "Tensile And Elongation",
                "Hardness Testing", "Socket Inner Diameter", "Impact Resistance"],
  },
  {
    id: 6,
    title: "Dimension Inspection",
    category: "quality-control",
    description: "Precise dimensional checks ensure perfect fit and function for every product.",
    equipments: ["Dimensional Checking", "Inspection with Go, No-Go gauge"]
  },
  {
    id: 7,
    title: "Machine Shop",
    category: "production",
    description: "Advanced machining capabilities ensure precise finishing and drilling operations.",
    equipments: ["Machining Facility", "Drilling", "Multi Drilling", "Hydrostatic Pressure Testing of Fittings"]
  }
];

// Process categories
const categories = [
  { value: "all", label: "All Processes" },
  { value: "pre-production", label: "Pre-Production" },
  { value: "production", label: "Production" },
  { value: "quality-control", label: "Quality Control" },
];

const QualityIcons = {
  "Design & Patterns": Settings,
  "Sand Testing": Flask,
  "Physical Testing": Microscope,
  "Finishing Facility": Tool,
  "Quality Inspection": FileCheck,
  "Dimension Inspection": Ruler,
  "Machine Shop": Settings
};

const QualityAssurance = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter processes based on category and search term
  const filteredProcesses = qualityProcesses.filter(process => {
    const matchesCategory = selectedCategory === "all" || process.category === selectedCategory;
    const matchesSearch = process.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          process.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          process.equipments.some(eq => eq.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092921461-7fdb887202f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors">
                <Home size={14} className="inline mr-1" />
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Quality Assurance</span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              Quality <span className="text-rashmi-red">Assurance</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-3xl mb-8"
            >
              Rashmi Metaliks holds the belief that Quality Control plays a pivotal role in
              ensuring the creation of flawless Ductile Iron Pipes and Fittings. This commitment
              to quality control is integrated into every phase of production, beginning with
              the scrutiny of Raw Materials and culminating in the thorough examination of
              the Finished Product.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-lg max-w-3xl mb-8"
            >
              We diligently uphold a regime of in-process inspection and quality control throughout the
              entirety of the production process. These practices are meticulously recorded and
              managed according to international standards within our documented Management
              System.
            </motion.p>
            
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col md:flex-row gap-4 mb-8"
            >
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search quality processes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 py-2 pr-4 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                />
              </div>
              
              <div className="relative">
                <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 py-2 pr-8 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50 appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Quality Process Timeline */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Our Quality <span className="text-rashmi-red">Process</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our comprehensive quality control process ensures consistent excellence at every stage
            </motion.p>
          </div>
          
          {/* Process Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border/50 rounded-full z-0"></div>
            
            {/* Process steps */}
            {filteredProcesses.map((process, index) => {
              const isEven = index % 2 === 0;
              const Icon = QualityIcons[process.title as keyof typeof QualityIcons] || Award;
              
              return (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-start mb-16 relative ${isEven ? 'md:justify-end' : ''}`}
                >
                  <div className={`w-full md:w-5/12 relative z-10 ${isEven ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                    <motion.div 
                      className={`bg-card border border-border p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:border-rashmi-red/50`}
                      whileHover={{ y: -5 }}
                    >
                      <div className={`flex items-center mb-3 ${isEven ? 'justify-end' : ''}`}>
                        <div className={`bg-rashmi-red/10 w-10 h-10 rounded-full flex items-center justify-center ${isEven ? 'order-2 ml-3' : 'order-1 mr-3'}`}>
                          <Icon className="text-rashmi-red" size={18} />
                        </div>
                        <h3 className={`text-lg font-bold ${isEven ? 'order-1' : 'order-2'}`}>{process.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{process.description}</p>
                      
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-end' : ''}`}>
                        {process.equipments.slice(0, 4).map((equipment) => (
                          <span 
                            key={equipment} 
                            className="inline-block px-3 py-1 text-xs bg-muted rounded-full hover:bg-muted/80 transition-colors"
                          >
                            {equipment}
                          </span>
                        ))}
                        {process.equipments.length > 4 && (
                          <span className="inline-flex items-center px-3 py-1 text-xs bg-rashmi-red/10 text-rashmi-red rounded-full">
                            +{process.equipments.length - 4} more
                            <ZoomIn size={12} className="ml-1" />
                          </span>
                        )}
                      </div>
                    </motion.div>
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
      
      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              See Our Quality <span className="text-rashmi-red">Certifications</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
              Our products meet the highest international standards and have received numerous certifications and approvals.
            </p>
            <Link 
              to="/certifications" 
              className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
            >
              View Certifications
              <Award className="ml-2" size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default QualityAssurance;
