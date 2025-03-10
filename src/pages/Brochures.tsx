
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FileText, Download, Check, Info } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BrochureCardProps {
  title: string;
  description: string;
  image: string;
  downloadUrl: string;
  fileSize: string;
  fileType: string;
}

const BrochureCard: React.FC<BrochureCardProps> = ({ title, description, image, downloadUrl, fileSize, fileType }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rashmi-dark/90 to-transparent flex items-end">
          <div className="p-4">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-white/80 text-sm">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <FileText size={16} className="mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{fileType} · {fileSize}</span>
          </div>
        </div>
        <a 
          href={downloadUrl}
          className="inline-flex items-center justify-center w-full py-2 px-4 bg-rashmi-red text-white rounded-lg hover:bg-rashmi-red/90 transition-colors font-medium"
          download
        >
          <Download size={18} className="mr-2" />
          Download Brochure
        </a>
      </div>
    </motion.div>
  );
};

const Brochures: React.FC = () => {
  const brochures = [
    {
      title: "Ductile Iron Pipes Brochure",
      description: "Complete technical specifications and applications",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      downloadUrl: "/brochures/ductile-iron-pipes.pdf", 
      fileSize: "4.2 MB",
      fileType: "PDF"
    },
    {
      title: "TMT Bar Product Catalog",
      description: "Size guide and strength specifications",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      downloadUrl: "/brochures/tmt-bars.pdf", 
      fileSize: "3.8 MB",
      fileType: "PDF"
    },
    {
      title: "DI Fittings Technical Guide",
      description: "Installation procedures and specifications",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      downloadUrl: "/brochures/di-fittings.pdf", 
      fileSize: "5.1 MB",
      fileType: "PDF"
    },
    {
      title: "Pig Iron Quality Standards",
      description: "Chemical composition and applications",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      downloadUrl: "/brochures/pig-iron.pdf", 
      fileSize: "2.7 MB",
      fileType: "PDF"
    },
    {
      title: "Iron Ore Pellet Specifications",
      description: "Technical details and usage guidelines",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      downloadUrl: "/brochures/iron-ore-pellet.pdf", 
      fileSize: "3.5 MB",
      fileType: "PDF"
    },
    {
      title: "Sinter Production Brochure",
      description: "Manufacturing process and applications",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      downloadUrl: "/brochures/sinter.pdf", 
      fileSize: "4.0 MB",
      fileType: "PDF"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Product Brochures | Rashmi Metaliks</title>
        <meta name="description" content="Download detailed brochures for Rashmi Metaliks' products, including technical specifications, applications, and quality standards." />
      </Helmet>

      <Header />
      
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Product <span className="text-rashmi-red">Brochures</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Download detailed information about our high-quality products, including technical 
              specifications, applications, and quality standards.
            </p>
          </motion.div>

          <div className="bg-muted/30 p-5 rounded-xl mb-10">
            <div className="flex items-start gap-4">
              <Info size={24} className="text-rashmi-red flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-foreground mb-1">Need More Information?</h3>
                <p className="text-muted-foreground">
                  Can't find what you're looking for? Contact our team for custom product 
                  specifications or schedule a consultation.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a 
                    href="/contact-us" 
                    className="inline-flex items-center px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    Contact Sales
                  </a>
                  <a 
                    href="mailto:info@rashmi.com" 
                    className="inline-flex items-center px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brochures.map((brochure, index) => (
              <motion.div
                key={brochure.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BrochureCard {...brochure} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Why Download Our Brochures?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <Check className="text-rashmi-red mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Complete Specifications</h3>
                  <p className="text-muted-foreground">
                    Access detailed technical specifications, dimensions, and performance characteristics
                    for all of our products.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="text-rashmi-red mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Installation Guidelines</h3>
                  <p className="text-muted-foreground">
                    Step-by-step instructions for proper installation and handling of our products
                    to ensure optimal performance.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="text-rashmi-red mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Quality Certifications</h3>
                  <p className="text-muted-foreground">
                    Information about our product certifications, quality standards, and 
                    testing procedures.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="text-rashmi-red mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Application Examples</h3>
                  <p className="text-muted-foreground">
                    Real-world examples of how our products are used in various industries
                    and applications around the globe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Brochures;
