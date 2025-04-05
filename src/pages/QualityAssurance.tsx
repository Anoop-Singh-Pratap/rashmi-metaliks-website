import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Home, Search, Filter, Microscope, Beaker, FileCheck, Ruler, Settings, 
  Wrench, Award, ZoomIn, CheckCircle2, Trophy, BarChart4, FlaskConical,
  PercentCircle, BadgeCheck, ShieldCheck, Clipboard, ArrowRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { generateFAQSchema, generateBreadcrumbSchema } from '../lib/schema';

// Enhanced quality processes with more detail
const qualityProcesses = [
  {
    id: 1,
    title: "Design & Patterns",
    category: "pre-production",
    description: "Our design department creates precision patterns for perfect castings, with advanced modeling and simulation for optimal product performance.",
    equipments: ["CAD/CAM Software", "3D Modeling Tools", "Pattern Shop", "Digital Prototyping"],
    imageUrl: "/lovable-uploads/quality/design-patterns.jpg"
  },
  {
    id: 2,
    title: "Sand Testing",
    category: "pre-production",
    description: "Comprehensive sand testing ensures optimal molding materials for casting, with precise measurement of permeability, strength and moisture content.",
    equipments: ["Permeability Meter", "Universal Strength Machine", "Compactability Tester", "Sieve Shaker", "Moisture Analyzer"],
    imageUrl: "/lovable-uploads/quality/sand-testing.jpg"
  },
  {
    id: 3,
    title: "Physical Testing",
    category: "quality-control",
    description: "In-depth material analysis ensures our products meet the highest physical property standards with state-of-the-art testing equipment.",
    equipments: ["Spectrometer", "Universal Testing Machine", "Metalsoft Microscope", "Hardness Testing Machine", "Impact Tester"],
    imageUrl: "/lovable-uploads/quality/physical-testing.jpg"
  },
  {
    id: 4,
    title: "Finishing Facility",
    category: "production",
    description: "Advanced finishing processes ensure our products have perfect surface quality and protection against corrosion and environmental factors.",
    equipments: ["Shot Blasting Facility", "Fettling Equipment", "Surface Treatment Line", "Coating Systems"],
    imageUrl: "/lovable-uploads/quality/finishing.jpg"
  },
  {
    id: 5,
    title: "Quality Inspection",
    category: "quality-control",
    description: "Comprehensive testing at every stage ensures our products exceed all quality standards and specifications for optimal performance.",
    equipments: ["Carbon Equivalent", "Temperature Control", "Zinc Coating Mass", "Bitumen Coating Thickness", 
                "Chemical Analysis", "Thickness Control", "Microstructure Analysis", "Hydraulic Testing Machine",
                "Ring Test", "Cement Lining Thickness", "Spigot Outer Diameter", "Tensile And Elongation",
                "Hardness Testing", "Socket Inner Diameter", "Impact Resistance"],
    imageUrl: "/lovable-uploads/quality/inspection.jpg"
  },
  {
    id: 6,
    title: "Dimension Inspection",
    category: "quality-control",
    description: "Precise dimensional checks ensure perfect fit and function for every product, guaranteeing seamless installation and operation.",
    equipments: ["Dimensional Checking", "Inspection with Go, No-Go gauge", "Coordinate Measuring Machine", "Digital Calipers", "Micrometer"],
    imageUrl: "/lovable-uploads/quality/dimension.jpg"
  },
  {
    id: 7,
    title: "Machine Shop",
    category: "production",
    description: "Advanced machining capabilities ensure precise finishing and drilling operations for optimal product performance and compatibility.",
    equipments: ["Machining Facility", "Drilling Equipment", "Multi Drilling Systems", "Hydrostatic Pressure Testing of Fittings", "CNC Machines"],
    imageUrl: "/lovable-uploads/quality/machine-shop.jpg"
  }
];

// Process categories
const categories = [
  { value: "all", label: "All Processes" },
  { value: "pre-production", label: "Pre-Production" },
  { value: "production", label: "Production" },
  { value: "quality-control", label: "Quality Control" },
];

// Quality metrics data
const qualityMetrics = [
  { label: "Quality Inspection Points", value: "100+", icon: CheckCircle2, color: "text-green-500" },
  { label: "International Standards", value: "12", icon: BadgeCheck, color: "text-blue-500" },
  { label: "Quality Personnel", value: "75+", icon: ShieldCheck, color: "text-yellow-500" },
  { label: "Quality Audits Yearly", value: "24", icon: Clipboard, color: "text-purple-500" }
];

// Laboratory equipment showcase
const laboratoryEquipment = [
  {
    name: "Spectrometer",
    description: "High-precision elemental analysis for accurate material composition testing",
    icon: FlaskConical
  },
  {
    name: "Universal Testing Machine",
    description: "Measures tensile strength, compression, and other mechanical properties",
    icon: BarChart4
  },
  {
    name: "Metallurgical Microscope",
    description: "Advanced optical system for microstructure analysis and quality verification",
    icon: Microscope
  },
  {
    name: "Hardness Testing Equipment",
    description: "Precision instruments for measuring material hardness across various scales",
    icon: Ruler
  }
];

// FAQ data
const faqItems = [
  {
    question: "What quality standards does Rashmi Metaliks follow?",
    answer: "Rashmi Metaliks adheres to the highest international standards including ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, and product-specific standards like EN 545, ISO 2531, AWWA C151/A21.51, and more, ensuring consistent quality and compliance across all our products."
  },
  {
    question: "How does Rashmi Metaliks ensure product quality?",
    answer: "We maintain quality through a comprehensive multi-stage quality control process that includes pre-production testing, in-process inspections, and final product verification. Our dedicated quality control team uses advanced testing equipment at each production stage to ensure all products meet our stringent quality requirements."
  },
  {
    question: "What testing procedures are conducted on DI pipes?",
    answer: "Our DI pipes undergo rigorous testing including chemical composition analysis, mechanical property tests (tensile strength, yield strength, elongation), dimensional checks, hydrostatic pressure tests, coating thickness measurements, microstructure analysis, and visual inspections to ensure they meet all required specifications."
  },
  {
    question: "Does Rashmi Metaliks have third-party certifications?",
    answer: "Yes, Rashmi Metaliks products are certified by numerous reputable third-party organizations and have received certifications from bodies like BIS, BSI, API, DVGW, and others. These certifications validate our quality management systems and product quality against international standards."
  }
];

const QualityIcons = {
  "Design & Patterns": Settings,
  "Sand Testing": Beaker,
  "Physical Testing": Microscope,
  "Finishing Facility": Wrench,
  "Quality Inspection": FileCheck,
  "Dimension Inspection": Ruler,
  "Machine Shop": Settings
};

const QualityAssurance = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProcess, setSelectedProcess] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  
  // Filter processes based on category and search term
  const filteredProcesses = qualityProcesses.filter(process => {
    const matchesCategory = selectedCategory === "all" || process.category === selectedCategory;
    const matchesSearch = process.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          process.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          process.equipments.some(eq => eq.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Generate schema for FAQ
  const faqSchema = generateFAQSchema(faqItems);
  
  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Quality Assurance", url: "/quality-assurance" }
  ]);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <SEO 
        title="Quality Assurance | Premium Testing & Standards | Rashmi Metaliks"
        description="Discover Rashmi Metaliks' world-class quality assurance processes ensuring exceptional product quality and reliability through rigorous testing and adherence to international standards."
        keywords="quality assurance, quality control, product testing, ISO certification, material testing, Rashmi Metaliks quality, manufacturing standards, quality inspection"
        canonicalUrl="/quality-assurance"
        ogType="website"
        ogImage="/lovable-uploads/quality/laboratory.jpg"
        schema={[faqSchema, breadcrumbSchema]}
      />
      
      <Header />
      
      {/* Hero Section with Parallax Effect */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/70"></div>
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092921461-7fdb887202f9?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-center bg-cover opacity-20"
          ></motion.div>
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
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Commitment to <span className="text-rashmi-red">Excellence</span>
              </h1>
              <div className="w-20 h-1 bg-rashmi-red mb-8"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none mb-10"
            >
              <p className="text-muted-foreground leading-relaxed">
                At Rashmi Metaliks, quality control is not just a process—it's our philosophy.
                We integrate rigorous quality assurance into every phase of production, from raw material
                selection to finished product inspection, ensuring exceptional products that meet
                the highest international standards.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our comprehensive quality management system, certified to <strong>ISO 9001:2015</strong>,
                governs all aspects of our operations. With state-of-the-art testing facilities and
                highly skilled quality professionals, we deliver products that consistently exceed
                customer expectations for performance and reliability.
              </p>
            </motion.div>
            
            {/* Quality Metrics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {qualityMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center shadow-sm transition-all duration-300"
                >
                  <div className={`rounded-full p-3 ${metric.color.replace('text-', 'bg-').replace('500', '100')} mb-4`}>
                    <metric.icon className={`h-8 w-8 ${metric.color}`} />
                  </div>
                  <div className="text-3xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-card border border-border rounded-lg shadow-sm"
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
              
              <div className="relative min-w-[200px]">
                <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 py-2 pr-8 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50 appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="fill-current h-4 w-4 text-muted-foreground" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Quality Process Section with Enhanced Timeline */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
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
              className="text-muted-foreground text-lg max-w-3xl mx-auto"
            >
              Our comprehensive quality control process ensures consistent excellence at every stage,
              from design to finished product inspection
            </motion.p>
          </div>
          
          {/* Enhanced Timeline View */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline center line with gradient effect */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rashmi-red/30 via-rashmi-red to-rashmi-red/30 rounded-full z-0"
            ></motion.div>
            
            {/* Process steps with alternating layout */}
            {filteredProcesses.map((process, index) => {
              const isEven = index % 2 === 0;
              const Icon = QualityIcons[process.title as keyof typeof QualityIcons] || Award;
              
              // Get category display name
              const categoryDisplay = process.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
              
              return (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className={`flex items-start mb-28 relative ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Stage number - positioned on timeline */}
                  <div className="absolute left-1/2 top-24 transform -translate-x-1/2 z-30 hidden md:flex">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      className="w-12 h-12 rounded-full bg-rashmi-red flex items-center justify-center text-white font-bold text-lg shadow-md"
                    >
                      {index + 1}
                    </motion.div>
                  </div>
                  
                  {/* Stage indicator pill (above card) */}
                  <div className={`absolute ${isEven ? 'md:left-[calc(5%+10px)]' : 'md:right-[calc(5%+10px)]'} top-5 z-20 hidden md:block`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="px-4 py-1 rounded-full bg-background shadow-md border border-border text-sm font-medium"
                    >
                      <span className="text-rashmi-red">Stage {index + 1}</span>
                    </motion.div>
                  </div>
                  
                  {/* Timeline connecting line */}
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "20%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2 }}
                    style={{ 
                      position: 'absolute',
                      top: '98px', 
                      height: '2px',
                      left: isEven ? 'auto' : '50%',
                      right: isEven ? '50%' : 'auto',
                      background: `linear-gradient(${isEven ? 'to left' : 'to right'}, transparent, #E53935)`
                    }}
                    className="hidden md:block z-10"
                  ></motion.div>
                  
                  {/* Content card */}
                  <div className={`w-full md:w-[35%] z-10 ${isEven ? 'md:mr-[15%] md:ml-0' : 'md:ml-[15%] md:mr-0'}`}>
                    {/* Category label - above card, mobile and desktop */}
                    <div className="mb-3 md:mb-2">
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        process.category === 'pre-production' ? 'bg-blue-100 text-blue-700' :
                        process.category === 'production' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {categoryDisplay}
                      </span>
                      
                      {/* Mobile-only stage indicator */}
                      <span className="md:hidden ml-2 px-3 py-1 text-xs font-medium rounded-full bg-rashmi-red/10 text-rashmi-red">
                        Stage {index + 1}
                      </span>
                    </div>
                    
                    <motion.div 
                      whileHover={{ y: -5, boxShadow: "0 12px 30px -10px rgba(0, 0, 0, 0.1)" }}
                      className="bg-card border border-border rounded-lg overflow-hidden shadow-md transition-all duration-300 relative"
                    >
                      {/* Card Header with Image */}
                      <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10"></div>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 bg-cover bg-center z-0" 
                          style={{ backgroundImage: `url(${process.imageUrl || 'https://images.unsplash.com/photo-1581093458791-9f3c3e92f64e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80'})` }}
                        ></motion.div>
                      </div>
                      
                      {/* Card Content */}
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-rashmi-red/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <Icon className="text-rashmi-red" size={22} />
                          </div>
                          <h3 className="text-xl font-bold">{process.title}</h3>
                        </div>
                        
                        <p className="text-muted-foreground mb-6">{process.description}</p>
                        
                        <div className="space-y-3">
                          <div className="font-medium text-sm flex items-center gap-2">
                            <span className="w-4 h-0.5 bg-rashmi-red/50"></span>
                            Equipment & Techniques
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {process.equipments.slice(0, 3).map((equipment) => (
                              <span 
                                key={equipment} 
                                className="inline-block px-3 py-1 text-xs bg-muted rounded-full hover:bg-muted/80 transition-colors"
                              >
                                {equipment}
                              </span>
                            ))}
                            {process.equipments.length > 3 && (
                              <motion.button 
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSelectedProcess(selectedProcess === process.id ? null : process.id)}
                                className="inline-flex items-center px-3 py-1 text-xs bg-rashmi-red/10 text-rashmi-red rounded-full cursor-pointer hover:bg-rashmi-red/20 transition-colors"
                              >
                                +{process.equipments.length - 3} more
                                <ZoomIn size={12} className="ml-1" />
                              </motion.button>
                            )}
                          </div>
                        </div>
                        
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: selectedProcess === process.id ? 'auto' : 0,
                            opacity: selectedProcess === process.id ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4"
                        >
                          {selectedProcess === process.id && (
                            <div className="pt-4 border-t border-border mt-4">
                              <h4 className="font-medium mb-2">Complete Equipment List:</h4>
                              <ul className="space-y-1">
                                {process.equipments.map((equipment) => (
                                  <li key={equipment} className="flex items-start">
                                    <CheckCircle2 size={14} className="text-rashmi-red mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{equipment}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Timeline End - Fixed positioning as a normal flow element */}
            <div className="flex flex-col items-center justify-center relative mt-4 mb-12 pt-8">
              <div className="w-12 h-12 rounded-full bg-rashmi-red flex items-center justify-center shadow-lg border-2 border-background dark:border-background z-20">
                <CheckCircle2 className="text-white" size={20} />
              </div>
              <div className="mt-3 bg-card dark:bg-card border border-rashmi-red/20 rounded-full px-6 py-2 text-sm font-medium shadow-lg">
                Quality Assured Product
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Laboratory Equipment Showcase */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              State-of-the-Art <span className="text-rashmi-red">Testing Laboratory</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our advanced laboratory is equipped with cutting-edge technology to ensure precision in quality testing
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="grid grid-cols-1 gap-6">
                {laboratoryEquipment.map((equipment, index) => (
                  <motion.div
                    key={equipment.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex bg-card border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="mr-4 bg-rashmi-red/10 rounded-full p-3 h-14 w-14 flex items-center justify-center flex-shrink-0">
                      <equipment.icon className="text-rashmi-red h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{equipment.name}</h3>
                      <p className="text-muted-foreground text-sm">{equipment.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <div className="rounded-lg overflow-hidden shadow-lg border border-border relative h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                  alt="Advanced Testing Laboratory" 
                  className="w-full h-full object-cover z-0"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="text-white font-bold text-xl mb-2">Advanced Quality Testing</div>
                  <p className="text-white/90 text-sm mb-4">Our laboratory is equipped with cutting-edge technology to ensure precise and reliable testing results</p>
                  <button className="inline-flex items-center bg-rashmi-red text-white px-4 py-2 rounded text-sm hover:bg-rashmi-red/90 transition-colors">
                    View Certifications
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Frequently Asked <span className="text-rashmi-red">Questions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Learn more about our quality assurance processes and standards
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg overflow-hidden shadow-sm"
                >
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                      <h3 className="font-bold text-lg pr-4">{faq.question}</h3>
                      <div className="w-5 h-5 flex-shrink-0 relative">
                        <div className="absolute top-1/2 left-0 w-5 h-0.5 bg-foreground transform -translate-y-1/2 transition-transform group-open:rotate-180"></div>
                        <div className="absolute top-1/2 left-0 w-5 h-0.5 bg-foreground transform -translate-y-1/2 rotate-90 transition-transform group-open:rotate-180"></div>
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative shadow-lg overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute -right-10 top-10 w-40 h-40 bg-rashmi-red/5 rounded-full blur-[60px]"></div>
              <div className="absolute -left-10 bottom-10 w-60 h-60 bg-rashmi-red/10 rounded-full blur-[80px]"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-2 bg-rashmi-red/10 rounded-full text-rashmi-red text-sm font-medium mb-6">
                <Award className="mr-2" size={16} />
                Internationally Certified
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Explore Our <span className="text-rashmi-red">Quality Certifications</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Our products meet the highest international standards and have received numerous certifications 
                and approvals from global certification bodies.
              </p>
              
              <Link 
                to="/certifications" 
                className="inline-flex items-center px-8 py-4 bg-rashmi-red text-white font-medium rounded-lg transition-all duration-300 hover:bg-rashmi-red/90 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                View All Certifications
                <Trophy className="ml-2" size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default QualityAssurance;
