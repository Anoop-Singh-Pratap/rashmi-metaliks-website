
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';

const CSR = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Corporate Social Responsibility | Rashmi Metaliks</title>
        <meta name="description" content="Learn about Rashmi Group's commitment to corporate social responsibility, environmental conservation, and community engagement initiatives." />
        <meta name="keywords" content="Rashmi CSR, corporate social responsibility, environmental conservation, community engagement" />
        <link rel="canonical" href="https://www.rashmi.com/csr" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-rashmi-dark to-background/80">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1444313431167-e7921088a9d3?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-fixed bg-center bg-cover opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <RevealText
              text="Corporate Social Responsibility"
              as="h1"
              className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
              staggerDelay={0.08}
            />
            <RevealText
              text="Creating Positive Impact"
              as="h2"
              className="text-2xl md:text-3xl font-display text-muted-foreground mb-6"
              staggerDelay={0.05}
              initialDelay={0.5}
            />
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              At the Rashmi Group, CSR is at the core of our business philosophy. We are dedicated to the well-being of the ecosystem from which we derive our business.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <p>
                At the Rashmi Group, all facets of CSR is a self-regulation that has been imposed by the leaders. We constantly dedicate the organisation to the well being of the eco-system from which we derive our business.
              </p>
              
              <p>
                Accordingly, CSR is a core business operation philosophy, held in high regard by the management as well as the employees. We sincerely believe in reducing and minimizing the impact our business operations may have on the environment.
              </p>
              
              <h3 className="text-2xl font-bold text-rashmi-red mt-8 mb-4">Environmental Initiatives</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <div className="bg-card border border-border/40 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold mb-3">Rainwater Harvesting</h4>
                  <p className="text-muted-foreground">
                    At our plants, we have successfully implemented rain water harvesting programs. We aim to set an example on conserving every drop of rain water.
                  </p>
                </div>
                
                <div className="bg-card border border-border/40 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold mb-3">Solar Energy</h4>
                  <p className="text-muted-foreground">
                    Our plants harvest the solar energy to the most extensive levels, reducing our carbon footprint and promoting renewable energy.
                  </p>
                </div>
                
                <div className="bg-card border border-border/40 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold mb-3">Green Coverage</h4>
                  <p className="text-muted-foreground">
                    Over fifty thousand trees of various varieties have been planted by us and we truly believe that taking care of our green cover is an important part of our corporate responsibility to our environment.
                  </p>
                </div>
                
                <div className="bg-card border border-border/40 rounded-xl p-6 hover:shadow-lg transition-all">
                  <h4 className="text-xl font-bold mb-3">Employee Healthcare</h4>
                  <p className="text-muted-foreground">
                    Not only do we deeply believe in environmental conservation, we also believe in providing adequate healthcare facilities to employees and their constant skill development.
                  </p>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-rashmi-red mt-8 mb-4">Community Engagement</h3>
              
              <p>
                We constantly engage with several communities at ground level, understand their requirements and assist them monetarily in the implementation of projects.
                In other words, we are truly invested in CSR initiatives and sincerely believe that Rashmi Group can truly make a positive impact in the social and environmental ecosystem.
              </p>
              
              <div className="my-10 p-8 bg-muted rounded-xl border border-border/40">
                <h4 className="text-xl font-bold mb-4 text-center">Our CSR Commitment</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-rashmi-red mb-2">50,000+</div>
                    <p className="text-muted-foreground">Trees Planted</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-rashmi-red mb-2">100%</div>
                    <p className="text-muted-foreground">Rainwater Harvesting</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-rashmi-red mb-2">Multiple</div>
                    <p className="text-muted-foreground">Community Projects</p>
                  </div>
                </div>
              </div>
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
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Join Our <span className="text-rashmi-red">CSR Initiatives</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              If you're interested in collaborating on our CSR projects or learning more about our initiatives, please contact us.
            </p>
            
            <motion.a
              href="/contact-us"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
            >
              Contact CSR Team
            </motion.a>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CSR;
