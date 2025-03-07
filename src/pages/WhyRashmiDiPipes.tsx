
import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { CheckCircle, Award, ShieldCheck, TrendingUp, Pipette, Factory, Recycle, BadgeCheck } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';
import { Link } from 'react-router-dom';

const WhyRashmiDiPipes = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const advantages = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Superior Quality",
      description: "Our DI pipes are manufactured using the most advanced technologies and strict quality control processes to ensure consistent, high-quality products."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Excellent Performance",
      description: "Our DI pipes offer exceptional hydraulic performance, with smooth linings that maximize flow capacity and reduce pumping costs."
    },
    {
      icon: <Award size={24} />,
      title: "International Standards",
      description: "Our products comply with all major international standards including ISO 2531, EN 545, and AWWA C151, ensuring global acceptability."
    },
    {
      icon: <Pipette size={24} />,
      title: "Corrosion Resistance",
      description: "Enhanced with special protective coatings, our DI pipes have superior resistance to corrosion, extending their operational lifespan."
    },
    {
      icon: <Factory size={24} />,
      title: "State-of-the-Art Facilities",
      description: "Our manufacturing facilities feature the latest technology and automation, ensuring precision and consistency in every pipe produced."
    },
    {
      icon: <Recycle size={24} />,
      title: "Sustainable Production",
      description: "Our eco-friendly production processes minimize environmental impact while maximizing resource efficiency."
    }
  ];

  const comparisonPoints = [
    "Higher tensile strength compared to industry standard",
    "Enhanced corrosion protection through advanced coating technologies",
    "Improved seismic resistance due to superior joints design",
    "Lower lifetime cost due to extended durability",
    "Reduced installation costs with innovative joint designs",
    "Better hydraulic performance with smoother inner linings",
    "Greater impact resistance in challenging environments",
    "Eco-friendly production with lower carbon footprint"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Why Choose Rashmi DI Pipes | Rashmi Metaliks</title>
        <meta name="description" content="Discover why Rashmi Metaliks ductile iron pipes are the preferred choice for water infrastructure projects worldwide." />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="text-rashmi-red font-medium mb-3">
              <RevealText text="Industry Leadership" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Why Choose <span className="text-rashmi-red">Rashmi</span> DI Pipes
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
              Discover the advantages that make Rashmi Metaliks the preferred choice for infrastructure projects worldwide. Our commitment to quality, innovation, and sustainability sets us apart in the industry.
            </p>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl">
            <div className="bg-rashmi-red/5 rounded-full w-[800px] h-[800px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </section>
      
      {/* Advantages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Our <span className="text-rashmi-red">Advantages</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Explore the exceptional features that make Rashmi DI pipes the industry benchmark
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "hsl(var(--card))"
                }}
                className="bg-card/30 border border-border rounded-lg p-6 transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mb-4">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Comparison Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-display font-bold mb-6"
              >
                <span className="text-rashmi-red">Industry</span> Comparison
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-lg"
              >
                See how Rashmi DI pipes outperform industry alternatives
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-lg p-8 shadow-sm"
            >
              <ul className="space-y-4">
                {comparisonPoints.map((point, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="text-rashmi-red mr-3 h-6 w-6 flex-shrink-0" />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Certifications & Standards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              <span className="text-rashmi-red">Certifications</span> & Standards
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our DI pipes meet and exceed global quality standards
            </motion.p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {[
                "ISO 2531", "EN 545", "EN 598", "AWWA C151/A21.51", 
                "ISO 9001", "ISO 14001"
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card/40 border border-border rounded-lg p-6 flex items-center justify-center"
                >
                  <div className="text-center">
                    <BadgeCheck className="text-rashmi-red mx-auto mb-2 h-8 w-8" />
                    <span className="font-medium">{cert}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
              Ready to Experience the <span className="text-rashmi-red">Rashmi</span> Difference?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
              Contact our team of experts to discuss your project requirements and discover how our DI pipes can provide reliable, long-lasting solutions for your infrastructure needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg shadow-md hover:bg-rashmi-red/90 transition-colors"
              >
                Request a Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-card border border-border text-foreground font-medium rounded-lg shadow-md hover:bg-card/80 transition-colors"
              >
                <Link to="/di-pipes">Back to DI Pipes</Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WhyRashmiDiPipes;
