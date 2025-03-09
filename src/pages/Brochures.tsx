
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';

// Sample brochure data - in a real app, this would come from an API or CMS
const brochuresData = [
  {
    id: 1,
    title: "DI Pipes Technical Specifications",
    category: "Product",
    format: "PDF",
    size: "2.5 MB",
    lastUpdated: "2023-06-15",
    thumbnail: "https://images.unsplash.com/photo-1607435097405-db48f377bff6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    downloadUrl: "#"
  },
  {
    id: 2,
    title: "Rashmi Group Corporate Profile",
    category: "Corporate",
    format: "PDF",
    size: "3.8 MB",
    lastUpdated: "2023-04-22",
    thumbnail: "https://images.unsplash.com/photo-1586523731382-c9747d1de42b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "TMT Bars Technical Manual",
    category: "Product",
    format: "PDF",
    size: "4.2 MB",
    lastUpdated: "2023-05-10",
    thumbnail: "https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    downloadUrl: "#"
  },
  {
    id: 4,
    title: "Sustainability Report 2023",
    category: "Corporate",
    format: "PDF",
    size: "5.1 MB",
    lastUpdated: "2023-03-30",
    thumbnail: "https://images.unsplash.com/photo-1604237316368-6ef27fd91724?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    downloadUrl: "#"
  },
  {
    id: 5,
    title: "Product Catalog 2023",
    category: "Product",
    format: "PDF",
    size: "8.7 MB",
    lastUpdated: "2023-01-15",
    thumbnail: "https://images.unsplash.com/photo-1616876195047-d815109e5e71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    downloadUrl: "#"
  },
  {
    id: 6,
    title: "Quality Assurance Documentation",
    category: "Technical",
    format: "PDF",
    size: "3.2 MB",
    lastUpdated: "2023-02-18",
    thumbnail: "https://images.unsplash.com/photo-1576086319675-3ead9bf5e525?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    downloadUrl: "#"
  }
];

const Brochures = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const categories = ['All', 'Product', 'Corporate', 'Technical'];
  
  const filteredBrochures = brochuresData.filter(item => 
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Brochures & Downloads | Rashmi Metaliks</title>
        <meta name="description" content="Download brochures, technical specifications, and product catalogs for Rashmi Metaliks steel products and corporate information." />
        <meta name="keywords" content="Rashmi Metaliks brochures, product catalogs, technical specifications, downloads" />
        <link rel="canonical" href="https://www.rashmi.com/brochures" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-rashmi-dark to-background/80">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <RevealText
              text="Brochures & Downloads"
              as="h1"
              className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
              staggerDelay={0.08}
            />
            <RevealText
              text="Product Information & Corporate Documents"
              as="h2"
              className="text-2xl md:text-3xl font-display text-muted-foreground mb-6"
              staggerDelay={0.05}
              initialDelay={0.5}
            />
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              Access and download our product catalogs, technical specifications, corporate brochures, and more.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="py-8 bg-card border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition-colors
                            ${selectedCategory === category 
                              ? 'bg-rashmi-red text-white' 
                              : 'bg-muted hover:bg-muted/80 text-foreground'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search brochures..."
                className="w-full py-2 pl-10 pr-4 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-rashmi-red/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Eye size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Brochures Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredBrochures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBrochures.map(brochure => (
                <motion.div
                  key={brochure.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-48">
                    <img 
                      src={brochure.thumbnail} 
                      alt={brochure.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 m-2 px-3 py-1 bg-card/80 backdrop-blur-sm text-xs font-medium rounded-full border border-border/40">
                      {brochure.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-2">{brochure.title}</h3>
                    
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <div className="flex flex-col text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <FileText size={12} className="mr-1" /> {brochure.format}, {brochure.size}
                        </span>
                        <span className="mt-1">Updated: {brochure.lastUpdated}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <a 
                          href={brochure.downloadUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <ExternalLink size={14} className="text-foreground" />
                        </a>
                        <a 
                          href={brochure.downloadUrl} 
                          download 
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rashmi-red hover:bg-rashmi-red/90 transition-colors"
                        >
                          <Download size={14} className="text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-card border border-border rounded-xl p-10 inline-block">
                <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">No brochures found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Request Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Need Specific <span className="text-rashmi-red">Documentation</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              If you can't find the brochure or technical documentation you're looking for, please contact our team.
            </p>
            
            <motion.a
              href="/contact-us"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
            >
              Request Documentation
            </motion.a>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Brochures;
