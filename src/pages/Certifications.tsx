
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Download, Award, Shield, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Types for our certificate data
interface Certificate {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  category: 'company' | 'pipes' | 'fittings';
  issuer: string;
  issueDate: string;
  expiryDate?: string;
}

const certificates: Certificate[] = [
  {
    id: 'iso-9001',
    name: 'ISO 9001, 14001 and 45001',
    description: 'International standards for quality management systems',
    imageSrc: '/lovable-uploads/2ac78e62-00e3-47c6-ba74-8cd2755d3f71.png',
    category: 'company',
    issuer: 'BSI',
    issueDate: '2022-12-16',
    expiryDate: '2024-12-15'
  },
  {
    id: 'wras-opc',
    name: 'WRAS OPC Certificate',
    description: 'Water Regulations Advisory Scheme certification',
    imageSrc: '/lovable-uploads/eb440ce6-62c3-40ca-a094-bc26d036b2af.png',
    category: 'pipes',
    issuer: 'WRAS',
    issueDate: '2023-04-03',
    expiryDate: '2025-04-17'
  },
  {
    id: 'kitemark-pipes',
    name: 'Kitemark Certification for DI Pipes, Fittings & Flanged Pipes',
    description: 'UK quality certification for pipes and fittings',
    imageSrc: '/lovable-uploads/fae00612-25f9-4672-b18c-ff189fa996ec.png',
    category: 'pipes',
    issuer: 'BSI',
    issueDate: '2023-04-03',
    expiryDate: '2025-04-17'
  },
  {
    id: 'kitemark-en-545',
    name: 'Kitemark EN 545',
    description: 'European standard for ductile iron pipes',
    imageSrc: '/lovable-uploads/d1fcc7bb-caa6-432f-81e3-6544d91ffe2e.png',
    category: 'pipes',
    issuer: 'BSI',
    issueDate: '2023-06-06',
    expiryDate: '2026-05-06'
  },
  {
    id: 'kitemark-iso-2531',
    name: 'Kitemark ISO 2531',
    description: 'International standard for ductile iron pipes',
    imageSrc: '/lovable-uploads/d406fa1c-f368-4021-9b1e-769403f75023.png',
    category: 'pipes',
    issuer: 'BSI',
    issueDate: '2023-06-06',
    expiryDate: '2026-05-06'
  },
  {
    id: 'rml-nabl',
    name: 'RML NABL Certificate TC-8688',
    description: 'National Accreditation Board for Testing and Calibration Laboratories',
    imageSrc: '/lovable-uploads/a23af242-fae9-411c-aef1-3c7ca3a40b17.png',
    category: 'company',
    issuer: 'NABL',
    issueDate: '2022-12-16',
    expiryDate: '2024-12-15'
  },
  {
    id: 'saso-certificate',
    name: 'Rashmi Ductile Iron SASO Certificate',
    description: 'Saudi Arabian Standards Organization certification',
    imageSrc: '/lovable-uploads/c45282da-d3f0-425c-bb41-d7d1010f7534.png',
    category: 'pipes',
    issuer: 'SASO',
    issueDate: '2023-06-06',
    expiryDate: '2026-05-06'
  },
  {
    id: 'bis-certificate',
    name: 'BIS 8329:2000',
    description: 'Bureau of Indian Standards certification for ductile iron pipes',
    imageSrc: '/lovable-uploads/a6bef18b-ef02-4235-81da-c416c7e2d2f5.png',
    category: 'pipes',
    issuer: 'BIS',
    issueDate: '2023-06-12',
    expiryDate: '2024-04-04'
  },
  {
    id: 'en545-iso2531-1',
    name: 'EN 545:2010 / ISO 2531:2009 Certificate',
    description: 'Certificate of conformity for ductile iron fittings',
    imageSrc: '/lovable-uploads/becbcd49-911e-47a1-98f4-2c472eb8b3fe.png',
    category: 'fittings',
    issuer: 'Bureau Veritas',
    issueDate: '2023-06-06',
    expiryDate: '2026-05-06'
  },
  {
    id: 'en545-iso2531-2',
    name: 'EN 545:2006 / ISO 2531:1998 Certificate',
    description: 'Certificate of conformity for ductile iron fittings',
    imageSrc: '/lovable-uploads/8e3cf51e-bd5a-4adc-bd6a-bc647aef872f.png',
    category: 'fittings',
    issuer: 'Bureau Veritas',
    issueDate: '2023-06-06',
    expiryDate: '2026-05-06'
  },
  {
    id: 'bis-fittings',
    name: 'BIS Product Certification for DI Fittings',
    description: 'Bureau of Indian Standards certification for ductile iron fittings',
    imageSrc: '/lovable-uploads/c2aec2a6-c4b2-4bd8-abe4-f72690bb0c22.png',
    category: 'fittings',
    issuer: 'BIS',
    issueDate: '2023-03-26'
  },
  {
    id: 'coating-certification',
    name: 'Coating Process Certification',
    description: 'Certificate for application of coatings on ductile iron pipes',
    imageSrc: '/lovable-uploads/3437c30d-36ca-44d3-aa67-782fc70b5d62.png',
    category: 'pipes',
    issuer: 'Bureau Veritas',
    issueDate: '2023-04-03',
    expiryDate: '2025-04-17'
  }
];

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'company' | 'pipes' | 'fittings'>('all');
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const certificateContainerRef = useRef<HTMLDivElement>(null);

  // Filter certificates by category
  const filteredCertificates = activeCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === activeCategory);

  // Handle certificate preview
  const openPreview = (certificate: Certificate) => {
    setPreviewCert(certificate);
    const index = filteredCertificates.findIndex(cert => cert.id === certificate.id);
    setCurrentCertIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when preview is open
  };

  const closePreview = () => {
    setPreviewCert(null);
    document.body.style.overflow = 'auto'; // Enable scrolling again
  };

  const goToNextCert = () => {
    if (currentCertIndex < filteredCertificates.length - 1) {
      setCurrentCertIndex(currentCertIndex + 1);
      setPreviewCert(filteredCertificates[currentCertIndex + 1]);
    } else {
      setCurrentCertIndex(0);
      setPreviewCert(filteredCertificates[0]);
    }
  };

  const goToPrevCert = () => {
    if (currentCertIndex > 0) {
      setCurrentCertIndex(currentCertIndex - 1);
      setPreviewCert(filteredCertificates[currentCertIndex - 1]);
    } else {
      setCurrentCertIndex(filteredCertificates.length - 1);
      setPreviewCert(filteredCertificates[filteredCertificates.length - 1]);
    }
  };

  // Handle keyboard navigation in preview
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!previewCert) return;
      
      if (e.key === 'Escape') {
        closePreview();
      } else if (e.key === 'ArrowRight') {
        goToNextCert();
      } else if (e.key === 'ArrowLeft') {
        goToPrevCert();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewCert, currentCertIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/80 mix-blend-multiply z-10"></div>
          <img 
            src="/lovable-uploads/becbcd49-911e-47a1-98f4-2c472eb8b3fe.png" 
            alt="Certifications Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-2 text-white/80">
              <a href="/" className="hover:text-rashmi-red transition-colors">Home</a>
              <span>/</span>
              <span>Certifications</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="block"
              >
                Our <span className="text-rashmi-red">Certifications</span>
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl max-w-2xl mb-8"
            >
              Rashmi Metaliks Limited is proud to be certified by international and national standards bodies,
              reflecting our commitment to quality, safety and environmental responsibility.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-2 rounded-full transition-all text-sm md:text-base ${
                  activeCategory === 'all' 
                    ? 'bg-rashmi-red text-white' 
                    : 'bg-muted/60 hover:bg-muted text-foreground'
                }`}
              >
                All Certifications
              </button>
              <button 
                onClick={() => setActiveCategory('company')}
                className={`px-6 py-2 rounded-full transition-all flex items-center text-sm md:text-base ${
                  activeCategory === 'company' 
                    ? 'bg-rashmi-red text-white' 
                    : 'bg-muted/60 hover:bg-muted text-foreground'
                }`}
              >
                <Award size={16} className="mr-1.5" />
                Company
              </button>
              <button 
                onClick={() => setActiveCategory('pipes')}
                className={`px-6 py-2 rounded-full transition-all flex items-center text-sm md:text-base ${
                  activeCategory === 'pipes' 
                    ? 'bg-rashmi-red text-white' 
                    : 'bg-muted/60 hover:bg-muted text-foreground'
                }`}
              >
                <Shield size={16} className="mr-1.5" />
                DI Pipes
              </button>
              <button 
                onClick={() => setActiveCategory('fittings')}
                className={`px-6 py-2 rounded-full transition-all flex items-center text-sm md:text-base ${
                  activeCategory === 'fittings' 
                    ? 'bg-rashmi-red text-white' 
                    : 'bg-muted/60 hover:bg-muted text-foreground'
                }`}
              >
                <Shield size={16} className="mr-1.5" />
                DI Fittings
              </button>
            </div>
            
            <div 
              ref={certificateContainerRef} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <img 
                      src={certificate.imageSrc} 
                      alt={certificate.name} 
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => openPreview(certificate)}
                          className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                          aria-label="View certificate"
                        >
                          <ExternalLink size={20} className="text-rashmi-red" />
                        </button>
                        <a 
                          href={certificate.imageSrc} 
                          download
                          className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
                          aria-label="Download certificate"
                        >
                          <Download size={20} className="text-rashmi-red" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="absolute top-2 right-2">
                      <div className="px-2 py-1 text-xs bg-rashmi-red text-white rounded-md">
                        {certificate.category === 'company' && 'Company'}
                        {certificate.category === 'pipes' && 'DI Pipes'}
                        {certificate.category === 'fittings' && 'DI Fittings'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-card">
                    <h3 className="font-semibold line-clamp-2 mb-2">{certificate.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{certificate.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-rashmi-red font-medium">{certificate.issuer}</span>
                      <span className="text-muted-foreground">
                        {new Date(certificate.issueDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => openPreview(certificate)}
                    aria-label={`View ${certificate.name}`}
                  ></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Certificate Quality Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Quality Assurance & <span className="text-rashmi-red">Compliance</span>
            </h2>
            <p className="text-muted-foreground">
              Our certifications are a testament to our commitment to quality, safety and environmental responsibility.
              Rashmi Metaliks Limited adheres to the highest standards in the industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center mb-4">
                <Award size={24} className="text-rashmi-red" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Management</h3>
              <p className="text-muted-foreground mb-4">
                Our ISO 9001 certification ensures that our quality management systems meet the highest international standards.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Consistent product quality</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Rigorous testing protocols</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Continuous improvement</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center mb-4">
                <Shield size={24} className="text-rashmi-red" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Product Standards</h3>
              <p className="text-muted-foreground mb-4">
                Our products are certified to meet national and international standards, ensuring reliability and performance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>EN 545 & ISO 2531 compliance</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>BIS certification for Indian market</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>SASO certification for Gulf markets</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center mb-4">
                <Award size={24} className="text-rashmi-red" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Testing Excellence</h3>
              <p className="text-muted-foreground mb-4">
                Our NABL accredited laboratory ensures reliable and accurate testing of our products.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>ISO/IEC 17025:2017 accredited</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Advanced testing equipment</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Qualified testing personnel</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Certificate Preview Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-4xl bg-background rounded-lg overflow-hidden shadow-xl"
          >
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h3 className="font-semibold text-lg">{previewCert.name}</h3>
              <button 
                onClick={closePreview}
                className="p-1 rounded-full hover:bg-muted transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <div className="md:col-span-2 flex items-center justify-center bg-muted rounded-lg overflow-hidden">
                <img 
                  src={previewCert.imageSrc} 
                  alt={previewCert.name} 
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Issued By</h4>
                  <p className="font-semibold">{previewCert.issuer}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Issue Date</h4>
                  <p>{new Date(previewCert.issueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                
                {previewCert.expiryDate && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Expiry Date</h4>
                    <p>{new Date(previewCert.expiryDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Category</h4>
                  <p className="capitalize">{previewCert.category}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                  <p className="text-sm">{previewCert.description}</p>
                </div>
                
                <div className="pt-4">
                  <a 
                    href={previewCert.imageSrc}
                    download
                    className="w-full flex items-center justify-center bg-rashmi-red hover:bg-rashmi-red/90 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <Download size={18} className="mr-2" />
                    Download Certificate
                  </a>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <button 
                onClick={goToPrevCert}
                className="p-2 rounded-full bg-background/80 hover:bg-background transition-colors shadow-md"
                aria-label="Previous certificate"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            
            <div className="absolute top-1/2 right-4 -translate-y-1/2">
              <button 
                onClick={goToNextCert}
                className="p-2 rounded-full bg-background/80 hover:bg-background transition-colors shadow-md"
                aria-label="Next certificate"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Call to Action */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Need More Information?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our team to learn more about our certifications and how they ensure the quality and reliability of our products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="bg-rashmi-red hover:bg-rashmi-red/90 text-white px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors">
                Contact Us
              </a>
              <a href="/di-pipes" className="bg-transparent hover:bg-card text-foreground border border-border px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors">
                Explore Our Products
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Certifications;
