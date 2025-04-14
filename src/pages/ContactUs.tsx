import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Map, Mail, Phone, Building, Globe, MapPin, Check, ChevronDown, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { organizationSchema, generateBreadcrumbSchema } from '../lib/schema';

const contactOffices = [
  {
    title: "Registered Office",
    address: "Premlata Building, 39, Shakespeare Sarani, 6th Floor, Kolkata – 700017 West Bengal, India.",
    phone: "+91 33 4023 7200",
    email: "info@rashmigroup.com"
  },
  {
    title: "Corporate Office",
    address: "9, AJC Bose Road, Ideal Center, First Floor, Kolkata – 700017 West Bengal, India.",
    phone: "+91 33 4023 7200",
    email: "info@rashmigroup.com"
  },
  {
    title: "Plant 1",
    address: "Gokulpur, P.O.: Shyamraipur, Dist.: West Midnapur, West Bengal, India.",
    phone: "+91 33 4023 7200",
    email: "plant1@rashmigroup.com"
  },
  {
    title: "Plant 2",
    address: "Gopinathpur and Jethia A.D.S.R., Khatranga, Changual, NH – 60, Kharagpur, West Bengal, India.",
    phone: "+91 33 4023 7200",
    email: "plant2@rashmigroup.com"
  }
];

const internationalOffices = [
  {
    country: "UNITED ARAB EMIRATES",
    company: "RASHMI PIPE & FITTING FZCO",
    address: "Cluster R, Jumeirah Lake Towers (JLT), Dubai, UAE",
    email: "dubai@rashmigroup.com"
  },
  {
    country: "UNITED KINGDOM",
    company: "RASHMI METALIKS UK LTD.",
    address: "3rd Floor, 5 Lloyd's Avenue, EC3N 3AE London, UK",
    email: "london@rashmigroup.com"
  },
  {
    country: "SINGAPORE",
    company: "RASHMI AQUA PTE LTD.",
    address: "137 Telok Ayer Street,#05-02 Singapore (068602)",
    email: "singapore@rashmigroup.com"
  }
];

// Include the product data
const products = [
  { id: 1, name: "Ductile Iron Pipe" },
  { id: 2, name: "DI Fittings" },
  { id: 3, name: "TMT Bars" },
  { id: 4, name: "Sponge Iron" },
  { id: 5, name: "Pig Iron" },
  { id: 6, name: "Iron Ore Pellet" },
  { id: 7, name: "Sinter" }
];

const ContactUs = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle product selection
  const toggleProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Remove a selected product
  const removeProduct = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Get selected product names for the message
    const selectedProductNames = selectedProducts
      .map(id => products.find(p => p.id === id)?.name)
      .filter(Boolean);
    
    // In a real application, you would send this data to a server
    console.log({
      name,
      email,
      subject,
      selectedProducts: selectedProductNames,
      message
    });

    // Form validation and submission logic would go here
    alert('Thank you for your message. We will get back to you shortly.');
    
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setSelectedProducts([]);
    setMessage('');
  };

  // Generate the contact page breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact-us" }
  ]);

  // Create a contact page specific schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Rashmi Metaliks",
    "description": "Contact information for Rashmi Metaliks, world's 2nd largest DI pipe manufacturer with global offices and manufacturing plants.",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.rashmimetaliks.com/contact-us"
    }
  };

  // Combined schemas
  const schemas = [organizationSchema, breadcrumbSchema, contactPageSchema];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Us - Rashmi Metaliks | Global Offices & Customer Support"
        description="Contact Rashmi Metaliks for inquiries about our premium steel products and solutions. Get in touch with our global offices and manufacturing plants across India, UAE, UK and Singapore."
        keywords="Rashmi Metaliks contact, steel company contact, DI pipes contact, TMT bars inquiry, global steel offices, steel manufacturing plants"
        canonicalUrl="/contact-us"
        schema={schemas}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-muted-foreground mb-6 self-start">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span>Contact Us</span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              Contact <span className="text-rashmi-red">Us</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg max-w-2xl mb-10"
            >
              Reach out to Rashmi Metaliks through our global network of offices. We're here to assist you with inquiries, support, and product information.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center mb-12"
            >
              <a 
                href="mailto:sales.enquiry@rashmigroup.com" 
                className="flex items-center px-6 py-3 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </a>
              <a 
                href="tel:+914023723000" 
                className="flex items-center px-6 py-3 bg-card border border-border rounded-md hover:bg-card/80 transition-colors"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* India Offices Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Our <span className="text-rashmi-red">Offices</span> in India</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                With multiple offices and manufacturing facilities across India, we ensure seamless service and product delivery.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {contactOffices.map((office, index) => (
                <motion.div
                  key={office.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:border-rashmi-red/30 transition-colors"
                >
                  <div className="flex items-start mb-4">
                    <div className="bg-rashmi-red/10 p-3 rounded-full mr-4">
                      {office.title.includes("Plant") ? (
                        <Building className="h-6 w-6 text-rashmi-red" />
                      ) : (
                        <MapPin className="h-6 w-6 text-rashmi-red" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{office.title}</h3>
                      <p className="text-muted-foreground mt-1">{office.address}</p>
                    </div>
                  </div>
                  
                  <div className="ml-16 space-y-3">
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`tel:${office.phone}`} className="hover:text-rashmi-red transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href={`mailto:${office.email}`} className="hover:text-rashmi-red transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* International Offices */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">International <span className="text-rashmi-red">Sales Offices</span></h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our global presence allows us to serve clients worldwide with the same commitment to quality and service.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {internationalOffices.map((office, index) => (
                <motion.div
                  key={office.country}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:border-rashmi-red/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-5 w-5 text-rashmi-red" />
                    <h3 className="text-lg font-bold">{office.country}</h3>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <p className="font-medium">{office.company}</p>
                    <p className="text-muted-foreground text-sm">{office.address}</p>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href={`mailto:${office.email}`} className="hover:text-rashmi-red transition-colors">
                      {office.email}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Map and Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-card border border-border rounded-xl overflow-hidden h-[400px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.366419935659!2d88.34853467507993!3d22.57010427948669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02773d38609be7%3A0x6a3dfd4a9081d5a5!2s39%2C%20Shakespeare%20Sarani%20Rd%2C%20Kolkata%2C%20West%20Bengal%20700017!5e0!3m2!1sen!2sin!4v1696874519858!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rashmi Metaliks Registered Office"
                />
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-bold mb-6">Get In Touch</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        placeholder="Your name" 
                        className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="Your email" 
                        className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      placeholder="How can we help you?" 
                      className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Product Selection Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <label htmlFor="products" className="block text-sm font-medium mb-1 flex items-center justify-between">
                      <span>Products of Interest</span>
                      {selectedProducts.length > 0 && (
                        <span className="inline-flex items-center justify-center bg-rashmi-red text-white rounded-full text-xs w-5 h-5">
                          {selectedProducts.length}
                        </span>
                      )}
                    </label>
                    <div 
                      className="w-full min-h-[42px] px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-rashmi-red/50 cursor-pointer flex flex-wrap items-center gap-2"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {selectedProducts.length === 0 ? (
                        <span className="text-muted-foreground">Select products you're interested in</span>
                      ) : (
                        <>
                          {selectedProducts.map(productId => {
                            const product = products.find(p => p.id === productId);
                            return (
                              <span key={productId} className="inline-flex items-center px-2 py-1 rounded-md bg-rashmi-red/10 text-rashmi-red text-sm">
                                {product?.name}
                                <button 
                                  onClick={(e) => removeProduct(productId, e)}
                                  className="ml-1 hover:text-rashmi-red/80"
                                  aria-label={`Remove ${product?.name}`}
                                >
                                  <X size={14} />
                                </button>
                              </span>
                            );
                          })}
                        </>
                      )}
                      <ChevronDown className={`ml-auto text-muted-foreground transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} size={18} />
                    </div>
                    
                    {/* Dropdown */}
                    {dropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-20 mt-1 w-full rounded-md bg-card border border-border shadow-lg max-h-60 overflow-y-auto"
                      >
                        <div className="sticky top-0 bg-card border-b border-border z-10">
                          <button
                            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between font-medium text-rashmi-red"
                            onClick={() => {
                              if (selectedProducts.length === products.length) {
                                setSelectedProducts([]);
                              } else {
                                setSelectedProducts(products.map(p => p.id));
                              }
                            }}
                          >
                            <span>{selectedProducts.length === products.length ? 'Deselect All' : 'Select All Products'}</span>
                            {selectedProducts.length === products.length && (
                              <Check size={16} className="text-rashmi-red" />
                            )}
                          </button>
                        </div>
                        
                        <ul className="py-1">
                          {products.map(product => (
                            <motion.li 
                              key={product.id} 
                              className={`px-4 py-2 cursor-pointer hover:bg-muted flex items-center justify-between transition-colors duration-150 ${
                                selectedProducts.includes(product.id) ? 'bg-muted/50' : ''
                              }`}
                              onClick={() => toggleProduct(product.id)}
                              whileHover={{ x: 2 }}
                            >
                              <span>{product.name}</span>
                              {selectedProducts.includes(product.id) && (
                                <Check size={16} className="text-rashmi-red" />
                              )}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      placeholder="Your message" 
                      className="w-full px-4 py-2 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-rashmi-red text-white rounded-md hover:bg-rashmi-red/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
