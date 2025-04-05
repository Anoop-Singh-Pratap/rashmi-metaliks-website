import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Search, Filter, Home, X, Award, Globe, Check, Shield, Download, Eye, ClipboardCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

// Certificate categories
const categories = [
  { value: "all", label: "All Certificates & Standards" },
  { value: "specification", label: "Specifications" },
  { value: "approval", label: "Country Approvals" },
  { value: "certificate", label: "Certificates" },
];

// Certificate regions
const regions = [
  { value: "all", label: "All Regions" },
  { value: "middleeast", label: "Middle East" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "africa", label: "Africa" },
];

// Certificate data structure
interface Certificate {
  id: number;
  title: string;
  category: string;
  description: string;
  countries?: string[];
  region?: string;
  standard?: string;
  fileUrl?: string;  // URL to the PDF file
  pdfSize?: string;  // Size of the PDF file
  certificationBody?: string; // The organization that issued the certificate
  featured?: boolean; // If the certificate should be featured/highlighted
}

// Specification data
const specifications = [
  { id: "ISO2531", title: "ISO 2531", description: "Ductile iron pipes, fittings, and accessories for pressure pipelines" },
  { id: "ISO7186", title: "ISO 7186", description: "Ductile iron products for sewage applications" },
  { id: "BSEN545", title: "BSEN 545", description: "Ductile iron pipes, fittings, and accessories and their joints for water pipelines" },
  { id: "BSEN598", title: "BSEN 598", description: "Ductile iron pipes, fittings, and accessories and their joints for sewerage applications" },
  { id: "ISO4179", title: "ISO 4179", description: "Ductile iron pipes for pressure and non-pressure pipelines – centrifugal cement mortar lining general requirements" },
  { id: "BS4027", title: "BS 4027", description: "Specification for sulfate-resisting Portland cement. Requirements for composition, strength, physical, and chemical properties of three strength classes" },
  { id: "ISO8179", title: "ISO 8179", description: "Ductile iron pipes – external zinc coating" },
  { id: "BS3416", title: "BS 3416", description: "Specification for bitumen-based coatings for cold application, suitable for use in contact with potable water" },
  { id: "ISO4633", title: "ISO 4633", description: "Rubber seals-joint rings for water supply, drainage, and sewerage pipelines – specs for materials" },
  { id: "BS2494", title: "BS 2494", description: "Specification for elastomeric seals for joints in pipework and pipelines" },
  { id: "ISO8180", title: "ISO 8180", description: "Ductile iron pipes-polyethylene sleeving" },
  { id: "ISO7005", title: "ISO 7005-2", description: "Metallic flanges – part 2 cast iron flanges" },
  { id: "ISO4014", title: "ISO 4014", description: "Hexagon head bolts – produced grades A and B" },
  { id: "ISO4032", title: "ISO 4032", description: "Hexagon nuts, style 1 – produced grades A and B" },
  { id: "SASO1020", title: "SASO 1020", description: "Ductile cast iron pipes, fittings, and accessories for pressure pipelines - general requirements" },
  { id: "SASO1014", title: "SASO 1014", description: "Socket and spigot ductile cast iron pipes (GS 766) for pressure pipelines" },
  { id: "SASO1016", title: "SASO 1016", description: "Ductile cast iron pipes - external coating (GS 768) with zinc metal spraying and bituminous material finishing layer: methods of test" },
  { id: "SASO1017", title: "SASO 1017", description: "Ductile cast iron pipes - external coating (GS 769) with zinc metal spraying and bituminous material finishing layer" },
  { id: "GSO771", title: "GSO 771/1998", description: "Ductile cast iron pipes, fittings, and accessories for pressure pipelines - test methods" },
  { id: "SASO1022", title: "SASO 1022", description: "Ductile cast-iron pipes for pressure (GS 773) pipelines - centrifugal cement mortar lining- methods of test" },
  { id: "GSO774", title: "GSO 774/1997", description: "Ductile cast iron pipes for pressure pipelines - centrifugal cement mortar lining - general requirements" },
];

// Approvals by country/region
const approvals = [
  {
    country: "Bahrain",
    region: "middleeast",
    agencies: ["Ministry of Electricity and Water – EWA"]
  },
  {
    country: "Kuwait",
    region: "middleeast",
    agencies: [
      "MEW - Ministry of Electricity & Water",
      "MPW - Ministry of Public Works",
      "MOD - Ministry of Defense",
      "KED - Kuwait Fire Dept.",
      "PAHW - Public Authority for Housing Welfare"
    ]
  },
  {
    country: "Qatar",
    region: "middleeast",
    agencies: [
      "Kahramaa (Qatar General Electricity & Water Corporation) approval pipes and fittings for water applications and repair & maintenance",
      "ASHGHAL (Public Work Authority) approval pipes and fittings for sewer applications",
      "Civil Defense - Fire Fighting Systems"
    ]
  },
  {
    country: "Saudi Arabia",
    region: "middleeast",
    agencies: [
      "NWC (National Water Company)",
      "Ministry of Water & Electricity",
      "Ministry of Municipal & Rural Affairs",
      "RCJY (Royal Commission for Jubail & Yanbu)",
      "ARAMCO & SABIC"
    ]
  },
  {
    country: "Turkey",
    region: "europe",
    agencies: ["ISKI (Istanbul Water and Sewerage Administration)"]
  },
  {
    country: "UAE",
    region: "middleeast",
    agencies: [
      "ADWEA (Abu Dhabi Water & Electricity Authority)",
      "ADSSC (Abu Dhabi Sewage Service Company)"
    ]
  },
  {
    country: "Others",
    region: "europe",
    agencies: ["Approvals for water and/or sewerage in Egypt, Iraq, Yemen, Jordan, Lebanon, Syria, Libya, Romania"]
  }
];

// Certificate data
const certifications = [
  {
    id: 1,
    title: "TÜV NORD – ISO 9001:2008",
    category: "certificate",
    region: "europe",
    description: "Quality Management System certification ensuring our products meet customer and regulatory requirements",
    featured: true,
    certificationBody: "TÜV NORD",
    fileUrl: "/lovable-uploads/certificates/tuv-nord-iso9001.pdf"
  },
  {
    id: 2,
    title: "TÜV NORD – Compliance with ISO 2531",
    category: "certificate",
    region: "europe",
    description: "Certification confirming our ductile iron pipes meet ISO 2531 international standards",
    featured: true,
    certificationBody: "TÜV NORD",
    fileUrl: "/lovable-uploads/certificates/tuv-nord-iso2531.pdf"
  },
  {
    id: 3,
    title: "BUREAU VERITAS – Compliance with ISO 2531",
    category: "certificate",
    region: "europe",
    description: "Verification of compliance with ISO 2531 and all standards related to Ductile Iron Products",
    featured: true,
    certificationBody: "Bureau Veritas",
    fileUrl: "/lovable-uploads/certificates/bureau-veritas-iso2531.pdf"
  },
  {
    id: 4,
    title: "SASO – Compliance with SASO standards",
    category: "certificate",
    region: "middleeast",
    description: "Saudi quality certification for Ductile Iron Products meeting SASO standards",
    certificationBody: "Saudi Standards, Metrology and Quality Organization",
    fileUrl: "/lovable-uploads/certificates/saso-compliance.pdf"
  },
  {
    id: 5,
    title: "FM Approved – Certificate of Compliance",
    category: "certificate",
    region: "europe",
    description: "FM Approval certification for our products, meeting stringent safety and quality standards",
    featured: true,
    certificationBody: "FM Approvals",
    fileUrl: "/lovable-uploads/certificates/fm-approval.pdf"
  }
];

// Combined data for unified display
const allCertificateData: Certificate[] = [
  ...specifications.map((spec, index) => ({
    id: 100 + index,
    title: spec.title,
    category: "specification",
    description: spec.description,
    standard: spec.title,
    region: undefined,
    certificationBody: undefined,
  })),
  ...certifications.map(cert => ({
    ...cert
  })),
];

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<Certificate | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);
  
  // Filter certificates based on category, region and search term
  const filteredItems = allCertificateData.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesRegion = selectedRegion === "all" || item.region === selectedRegion;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesRegion && matchesSearch;
  });

  // Handle modal close
  const closeModal = () => {
    setSelectedItem(null);
  };

  // Close modal when clicking outside
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };
  
  // Item icon based on category
  const getItemIcon = (category: string) => {
    switch (category) {
      case 'specification': return <ClipboardCheck className="text-blue-500" />;
      case 'approval': return <Globe className="text-green-500" />;
      case 'certificate': return <Award className="text-amber-500" />;
      default: return <Award className="text-rashmi-red" />;
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Certifications & Standards | Rashmi Metaliks</title>
        <meta name="description" content="Explore our international certifications, approvals, and standards that demonstrate Rashmi Metaliks' commitment to quality and excellence in ductile iron pipe manufacturing." />
        <link rel="canonical" href="https://www.rashmimetaliks.com/certifications" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-foreground transition-colors">
                  <Home size={14} className="inline mr-1" />
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span>Certifications & Standards</span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-display font-bold mb-6"
              >
                <span className="text-rashmi-red">Certifications</span> & Standards
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground text-lg max-w-3xl mb-8"
              >
                Rashmi Metaliks Limited is committed to maintaining the highest quality standards. 
                Our products comply with numerous international specifications and have received 
                certifications and approvals from organizations worldwide.
              </motion.p>
              
              {/* Search and Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              >
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search certifications..."
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
                    className="w-full appearance-none pl-10 py-2 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ArrowLeft size={14} className="rotate-90 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="relative">
                  <Globe size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full appearance-none pl-10 py-2 pr-10 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                  >
                    {regions.map((region) => (
                      <option key={region.value} value={region.value}>
                        {region.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ArrowLeft size={14} className="rotate-90 text-muted-foreground" />
                  </div>
                </div>
              </motion.div>
              
              {/* View toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-between items-center mb-6"
              >
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{filteredItems.length}</span> items found
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-rashmi-red/10 text-rashmi-red' : 'text-muted-foreground hover:bg-muted/60'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-rashmi-red/10 text-rashmi-red' : 'text-muted-foreground hover:bg-muted/60'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Certificates */}
        {selectedCategory === "all" && searchTerm === "" && selectedRegion === "all" && (
          <section className="py-12 bg-gradient-to-b from-muted/50 to-transparent">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
                  Featured <span className="text-rashmi-red">Certifications</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {certifications
                    .filter(cert => cert.featured)
                    .map(cert => (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center mr-4 mb-4">
                              <Award className="text-amber-500" size={20} />
                            </div>
                            <div className="text-xs px-2 py-1 rounded bg-rashmi-red/10 text-rashmi-red font-medium">
                              Featured
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{cert.description}</p>
                          
                          <div className="text-xs text-muted-foreground mb-4">
                            Issued by <span className="font-semibold">{cert.certificationBody}</span>
                          </div>
                          
                          <button
                            onClick={() => setSelectedItem(cert)}
                            className="inline-flex items-center text-sm font-medium text-rashmi-red hover:text-rashmi-red/80"
                          >
                            <Eye size={16} className="mr-1" />
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* All Certificates and Standards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <Search size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory('all'); setSelectedRegion('all');}}
                    className="px-4 py-2 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                <motion.div
                      key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-rashmi-red/30"
                >
                  <div className="p-6">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-4">
                          {getItemIcon(item.category)}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.description}</p>
                        
                        {item.certificationBody && (
                          <div className="text-xs text-muted-foreground mb-4">
                            Issued by <span className="font-semibold">{item.certificationBody}</span>
                          </div>
                        )}
                        
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="inline-flex items-center text-sm font-medium text-rashmi-red hover:text-rashmi-red/80"
                        >
                          <Eye size={16} className="mr-1" />
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="py-4 px-3 hover:bg-muted/30 rounded-md transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-4 flex-shrink-0">
                          {getItemIcon(item.category)}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-md font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          
                          {item.certificationBody && (
                            <div className="text-xs text-muted-foreground mt-2">
                              Issued by <span className="font-semibold">{item.certificationBody}</span>
                            </div>
                      )}
                    </div>
                    
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="ml-4 flex items-center text-sm font-medium text-rashmi-red hover:text-rashmi-red/80 flex-shrink-0"
                        >
                          <Eye size={16} className="mr-1" />
                          Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Approval Countries */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
                International <span className="text-rashmi-red">Approvals</span>
              </h2>
              <p className="text-muted-foreground mb-10">Our products are approved by regulatory authorities across multiple countries</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {approvals.map((country, index) => (
                  <motion.div
                    key={country.country}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all p-6"
                  >
                    <div className="flex items-center mb-4">
                      <Globe className="text-rashmi-red mr-3" size={20} />
                      <h3 className="text-lg font-semibold">{country.country}</h3>
                    </div>
                    
                    <ul className="space-y-2 text-sm">
                      {country.agencies.map((agency, agencyIndex) => (
                        <li key={agencyIndex} className="flex">
                          <Check size={16} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{agency}</span>
                        </li>
                      ))}
                    </ul>
                </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Certificate Detail Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={handleModalClick}
            >
              <motion.div 
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-auto"
              >
                <div className="sticky top-0 bg-card z-10 p-4 border-b border-border flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{selectedItem.title}</h3>
                    <button 
                      onClick={closeModal}
                    className="p-1 rounded-full hover:bg-muted-foreground/10"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {getItemIcon(selectedItem.category)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {selectedItem.category === 'specification' ? 'Specification' : 
                         selectedItem.category === 'approval' ? 'Approval' : 'Certificate'}
                      </div>
                      {selectedItem.certificationBody && (
                        <div className="text-xs text-muted-foreground">
                          Issued by {selectedItem.certificationBody}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                      <p className="text-foreground">{selectedItem.description}</p>
                    </div>
                    
                    {selectedItem.countries && selectedItem.countries.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Applicable Countries</h4>
                      <div className="flex flex-wrap gap-2">
                          {selectedItem.countries.map(country => (
                            <span key={country} className="text-xs px-2 py-1 rounded-full bg-muted">
                              {country}
                            </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                    {selectedItem.standard && (
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Standard Reference</h4>
                        <p className="text-foreground">{selectedItem.standard}</p>
                    </div>
                    )}
                    
                    {selectedItem.fileUrl && (
                      <div className="pt-4">
                      <a 
                          href={selectedItem.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 rounded-md bg-rashmi-red text-white hover:bg-rashmi-red/90 transition-colors"
                        >
                          <Download size={16} className="mr-2" />
                          Download Certificate
                          {selectedItem.pdfSize && <span className="ml-2 text-xs">({selectedItem.pdfSize})</span>}
                      </a>
                    </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer />
      </div>
    </>
  );
};

export default Certifications;
