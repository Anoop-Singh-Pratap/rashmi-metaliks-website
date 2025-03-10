
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BrochureItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  fileUrl: string;
  fileSize: string;
  category: string;
}

const Brochures = () => {
  const brochures: BrochureItem[] = [
    {
      id: 'di-pipes-brochure',
      title: 'DI Pipes Product Catalogue',
      description: 'Complete specifications and applications for our premium Ductile Iron Pipes range.',
      thumbnail: 'https://images.unsplash.com/photo-1518281361980-b26bfd556770?q=80&w=1374&auto=format&fit=crop',
      fileUrl: '#',
      fileSize: '4.2 MB',
      category: 'Products'
    },
    {
      id: 'di-fittings-brochure',
      title: 'DI Fittings Technical Guide',
      description: 'Technical specifications and installation guide for Ductile Iron Fittings.',
      thumbnail: 'https://images.unsplash.com/photo-1581093806997-124204d9fa9d?q=80&w=1470&auto=format&fit=crop',
      fileUrl: '#',
      fileSize: '3.8 MB',
      category: 'Products'
    },
    {
      id: 'tmt-bar-brochure',
      title: 'TMT Bar Product Range',
      description: 'Comprehensive guide to our TMT Bar range with technical specifications.',
      thumbnail: 'https://images.unsplash.com/photo-1629115576910-40164a4e90cc?q=80&w=1470&auto=format&fit=crop',
      fileUrl: '#',
      fileSize: '5.1 MB',
      category: 'Products'
    },
    {
      id: 'csr-report',
      title: 'Corporate Social Responsibility Report',
      description: 'Annual CSR report detailing our initiatives and impacts across communities.',
      thumbnail: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1480&auto=format&fit=crop',
      fileUrl: '#',
      fileSize: '6.3 MB',
      category: 'Corporate'
    },
    {
      id: 'sustainability-report',
      title: 'Sustainability Performance Report',
      description: 'Our commitment to sustainable manufacturing and environmental stewardship.',
      thumbnail: 'https://images.unsplash.com/photo-1623011132181-e2cee3ce2ceb?q=80&w=1471&auto=format&fit=crop',
      fileUrl: '#',
      fileSize: '5.7 MB',
      category: 'Corporate'
    },
    {
      id: 'company-profile',
      title: 'Rashmi Group Company Profile',
      description: 'Complete overview of Rashmi Group, our vision, values and achievements.',
      thumbnail: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1374&auto=format&fit=crop',
      fileUrl: '#',
      fileSize: '7.2 MB',
      category: 'Corporate'
    }
  ];

  const categories = Array.from(new Set(brochures.map(item => item.category)));
  const [activeCategory, setActiveCategory] = React.useState('All');
  
  const filteredBrochures = activeCategory === 'All' 
    ? brochures 
    : brochures.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Brochures & Downloads | Rashmi Group</title>
        <meta name="description" content="Download brochures, technical specifications, and product catalogs from Rashmi Group." />
      </Helmet>

      <Header />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Brochures & Downloads</h1>
            <p className="text-muted-foreground text-lg">
              Access our product catalogs, technical guides, and corporate publications
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'All' 
                  ? 'bg-rashmi-red text-white' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-rashmi-red text-white' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredBrochures.map((brochure) => (
              <motion.div
                key={brochure.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-border"
              >
                <div className="relative h-52">
                  <img 
                    src={brochure.thumbnail} 
                    alt={brochure.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      {brochure.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{brochure.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {brochure.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      <FileText size={14} className="inline mr-1" />
                      {brochure.fileSize}
                    </span>
                    <div className="flex gap-2">
                      <a 
                        href={brochure.fileUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </a>
                      <a 
                        href={brochure.fileUrl} 
                        download
                        className="p-2 rounded-full bg-rashmi-red text-white hover:bg-rashmi-red/90 transition-colors"
                        title="Download"
                      >
                        <Download size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <a 
              href="/contact-us" 
              className="inline-flex items-center text-rashmi-red hover:underline"
            >
              Contact our team for assistance
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brochures;
