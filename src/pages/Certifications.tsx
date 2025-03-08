import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Search, Filter, Home, X, Award, Globe, Check, Shield, Download } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Certificate data structure
interface Certificate {
  id: number;
  title: string;
  category: string;
  description: string;
  countries?: string[];
  standard?: string;
}

// Certificate categories
const categories = [
  { value: "all", label: "All Certificates" },
  { value: "standard", label: "Standard Specifications" },
  { value: "approval", label: "Country Approvals" },
  { value: "system", label: "Management Systems" },
];

// Certificate data
const certificates: Certificate[] = [
  // Standard Specifications
  {
    id: 1,
    title: "ISO 2531",
    category: "standard",
    description: "Ductile iron pipes, fittings, and accessories for pressure pipelines",
    standard: "ISO"
  },
  {
    id: 2,
    title: "ISO 7186",
    category: "standard",
    description: "Ductile iron products for sewage applications",
    standard: "ISO"
  },
  {
    id: 3,
    title: "BSEN 545",
    category: "standard",
    description: "Ductile iron pipes, fittings, and accessories and their joints for water pipelines",
    standard: "EN"
  },
  {
    id: 4,
    title: "BSEN 598",
    category: "standard",
    description: "Ductile iron pipes, fittings, and accessories and their joints for sewerage applications",
    standard: "EN"
  },
  {
    id: 5,
    title: "ISO 4179",
    category: "standard",
    description: "Ductile iron pipes for pressure and non-pressure pipelines – centrifugal cement mortar lining general requirements",
    standard: "ISO"
  },
  {
    id: 6,
    title: "BS 4027",
    category: "standard",
    description: "Specification for sulfate-resisting Portland cement",
    standard: "BS"
  },
  {
    id: 7,
    title: "ISO 8179",
    category: "standard",
    description: "Ductile iron pipes – external zinc coating",
    standard: "ISO"
  },
  {
    id: 8,
    title: "BS 3416",
    category: "standard",
    description: "Specification for bitumen-based coatings for cold application, suitable for use in contact with potable water",
    standard: "BS"
  },
  {
    id: 9,
    title: "ISO 4633",
    category: "standard",
    description: "Rubber seals-joint rings for water supply, drainage, and sewerage pipelines – specs for materials",
    standard: "ISO"
  },
  {
    id: 10,
    title: "BS 2494",
    category: "standard",
    description: "Specification for elastomeric seals for joints in pipework and pipelines",
    standard: "BS"
  },
  
  // Approvals
  {
    id: 11,
    title: "Bahrain Approval",
    category: "approval",
    description: "Approved by Ministry of Electricity and Water – EWA",
    countries: ["Bahrain"]
  },
  {
    id: 12,
    title: "Kuwait Approvals",
    category: "approval",
    description: "Approved by MEW, MPW, MOD, KED, and PAHW",
    countries: ["Kuwait"]
  },
  {
    id: 13,
    title: "Qatar Approvals",
    category: "approval",
    description: "Approved by Kahramaa, ASHGHAL, and Civil Defense",
    countries: ["Qatar"]
  },
  {
    id: 14,
    title: "Saudi Arabia Approvals",
    category: "approval",
    description: "Approved by NWC, Ministries, RCJY, ARAMCO & SABIC",
    countries: ["Saudi Arabia"]
  },
  {
    id: 15,
    title: "Turkey Approval",
    category: "approval",
    description: "Approved by ISKI (Istanbul Water and Sewerage Administration)",
    countries: ["Turkey"]
  },
  {
    id: 16,
    title: "UAE Approval",
    category: "approval",
    description: "Approved by ADWEA and ADSSC",
    countries: ["UAE"]
  },
  
  // Other certificates
  {
    id: 17,
    title: "ISO 9001:2008",
    category: "system",
    description: "Quality Management System Certification by TUV NORD",
    standard: "ISO"
  },
  {
    id: 18,
    title: "ISO 2531 Compliance",
    category: "system",
    description: "Compliance certification by TUV NORD",
    standard: "ISO"
  },
  {
    id: 19,
    title: "Bureau Veritas Compliance",
    category: "system",
    description: "Compliance with ISO 2531 & all standards related to Ductile Iron Products",
    standard: "ISO"
  },
  {
    id: 20,
    title: "FM Approved",
    category: "system",
    description: "Certificate of Compliance for fire safety systems",
    standard: "FM"
  }
];

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Filter certificates based on category and search term
  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = selectedCategory === "all" || cert.category === selectedCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle modal close
  const closeModal = () => {
    setSelectedCertificate(null);
  };

  // Close modal when clicking outside
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };
  
  // Certificate icon based on category
  const getCertificateIcon = (category: string) => {
    switch (category) {
      case 'standard': return <FileText className="text-blue-500" />;
      case 'approval': return <Globe className="text-green-500" />;
      case 'system': return <Shield className="text-amber-500" />;
      default: return <Award className="text-rashmi-red" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
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
              <span>Certifications</span>
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
              Our products comply with numerous international standards and have received approvals from organizations worldwide.
            </motion.p>
            
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row gap-4 mb-8"
            >
              <div className="relative flex-1">
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
      
      {/* Certificates Grid */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredCertificates.length === 0 ? (
              <div className="text-center py-16">
                <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No certificates found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((certificate) => (
                  <motion.div
                    key={certificate.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                    className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:border-rashmi-red/50 transition-all cursor-pointer"
                    onClick={() => setSelectedCertificate(certificate)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center mb-4">
                          {getCertificateIcon(certificate.category)}
                        </div>
                        <div className="px-2 py-1 text-xs font-medium rounded-full bg-muted">
                          {certificate.standard || (certificate.countries && certificate.countries[0])}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{certificate.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{certificate.description}</p>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-rashmi-red text-sm font-medium">View Details</span>
                        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center">
                          <ArrowLeft size={14} className="rotate-[-135deg]" />
                        </div>
                      </div>
                    </div>
                    
                    {certificate.countries && certificate.countries.length > 0 && (
                      <div className="px-6 py-3 border-t border-border bg-muted/30">
                        <div className="flex gap-2 flex-wrap">
                          {certificate.countries.map((country) => (
                            <span key={country} className="px-2 py-1 text-xs bg-background rounded text-muted-foreground">
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleModalClick}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-card border border-border rounded-xl shadow-lg max-w-lg w-full overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-4">
                      {getCertificateIcon(selectedCertificate.category)}
                    </div>
                    <h3 className="text-xl font-bold">{selectedCertificate.title}</h3>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <FileText size={14} className="mr-2" />
                    Description
                  </h4>
                  <p className="text-muted-foreground">{selectedCertificate.description}</p>
                </div>
                
                {selectedCertificate.countries && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Globe size={14} className="mr-2" />
                      Applicable Countries
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.countries.map(country => (
                        <span 
                          key={country}
                          className="px-3 py-1 bg-muted rounded-full text-sm"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Check size={14} className="mr-2" />
                    Benefits
                  </h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Ensures compliance with international standards</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Validates the quality of our manufacturing processes</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Provides assurance to customers and regulatory bodies</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-md flex items-center text-sm font-medium">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </button>
                  <button 
                    onClick={closeModal}
                    className="px-4 py-2 bg-rashmi-red hover:bg-rashmi-red/90 text-white rounded-md text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default Certifications;
