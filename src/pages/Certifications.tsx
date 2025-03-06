
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Search, Filter, Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Certificate data
const certificates = [
  {
    id: 1,
    title: "BSI ISO 9001, 14001 and 45001",
    category: "company",
    description: "Management Systems Certification",
    image: "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "WRAS OPC Certificate",
    category: "product",
    description: "Water Regulations Advisory Scheme for OPC",
    image: "https://images.unsplash.com/photo-1622778455593-ff775a50235a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Kitemark Certification for DI Pipes",
    category: "pipes",
    description: "British Standards Institution certification",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Kitemark Certification for Fittings",
    category: "fittings",
    description: "British Standards Institution certification",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Kitemark EN 545",
    category: "standards",
    description: "European Standards compliance",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Kitemark ISO 2531",
    category: "standards",
    description: "International Standards compliance",
    image: "https://images.unsplash.com/photo-1569017388730-020b5f80a004?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    title: "RML NABL Certificate TC-8688",
    category: "company",
    description: "National Accreditation Board for Testing and Calibration Laboratories",
    image: "https://images.unsplash.com/photo-1590496794008-383c8070b257?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    title: "Rashmi Ductile Iron SASO Certificate",
    category: "pipes",
    description: "Saudi Standards, Metrology and Quality Organization",
    image: "https://images.unsplash.com/photo-1580820726687-30e7ba70d976?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    title: "BIS 8329:2000",
    category: "standards",
    description: "Bureau of Indian Standards compliance",
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
  },
];

// Certificate categories
const categories = [
  { value: "all", label: "All Certificates" },
  { value: "company", label: "Company Certificates" },
  { value: "product", label: "Product Certificates" },
  { value: "pipes", label: "DI Pipe Certificates" },
  { value: "fittings", label: "DI Fitting Certificates" },
  { value: "standards", label: "Standards Compliance" },
];

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);
  
  // Filter certificates based on category and search term
  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = selectedCategory === "all" || cert.category === selectedCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           cert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Handle certificate preview
  const handleCertificateClick = (id: number) => {
    setSelectedCertificate(selectedCertificate === id ? null : id);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-4">
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
              Browse our collection of certifications that demonstrate our compliance with international standards.
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
                    className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleCertificateClick(certificate.id)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={certificate.image} 
                        alt={certificate.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent px-4 py-3">
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-rashmi-red/90 text-white rounded">
                          {categories.find(cat => cat.value === certificate.category)?.label || certificate.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{certificate.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{certificate.description}</p>
                      
                      <div className="flex items-center text-rashmi-red">
                        <span className="text-sm font-medium">View Certificate</span>
                        <ArrowLeft size={16} className={`ml-2 transition-transform duration-300 ${
                          selectedCertificate === certificate.id ? 'rotate-[-135deg]' : 'rotate-[-225deg]'
                        }`} />
                      </div>
                    </div>
                    
                    {/* Certificate Preview */}
                    {selectedCertificate === certificate.id && (
                      <div className="p-4 pt-0 border-t border-border mt-4">
                        <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center p-8 text-center">
                          <div className="max-w-sm">
                            <FileText size={48} className="mx-auto text-rashmi-red mb-4" />
                            <h4 className="font-semibold mb-2">{certificate.title}</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              This is a preview of the {certificate.title} certificate. 
                              The actual document can be viewed or downloaded by contacting our team.
                            </p>
                            <button className="px-4 py-2 bg-rashmi-red hover:bg-rashmi-red/90 text-white rounded-md text-sm transition-colors">
                              Request Full Document
                            </button>
                          </div>
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
      
      <Footer />
    </div>
  );
};

export default Certifications;
