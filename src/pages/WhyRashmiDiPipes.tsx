
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Factory, Globe, BarChart, FileCheck, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const WhyRashmiDiPipes = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const milestones = [
    {
      year: "2004",
      title: "Founded in West Bengal",
      description: "Rashmi Metaliks Limited was incorporated in West Bengal."
    },
    {
      year: "2010",
      title: "Production Expansion",
      description: "Expanded facilities with state-of-the-art integrated steel manufacturing."
    },
    {
      year: "2015",
      title: "Leading Manufacturer",
      description: "Became one of the leading DI Pipes & Fittings manufacturers in India."
    },
    {
      year: "2023",
      title: "Global Leadership",
      description: "Secured position as India's largest and world's second-largest DI pipe manufacturer."
    }
  ];

  const qualities = [
    {
      icon: <Shield size={24} />,
      title: "Reliability",
      description: "Synonymous with reliability in Eastern India's iron & steel manufacturing industry."
    },
    {
      icon: <Award size={24} />,
      title: "Quality Excellence",
      description: "ISO certified with quality as per international benchmarks."
    },
    {
      icon: <Factory size={24} />,
      title: "Modern Manufacturing",
      description: "State-of-the-art integrated steel manufacturing facility."
    },
    {
      icon: <Globe size={24} />,
      title: "Global Standards",
      description: "Products following numerous international and European standards."
    }
  ];

  const stats = [
    {
      value: "7.7L MT",
      label: "Annual Production Capacity",
      icon: <Factory className="text-rashmi-red" size={24} />
    },
    {
      value: "62%",
      label: "CAGR Since Inception",
      icon: <BarChart className="text-rashmi-red" size={24} />
    },
    {
      value: "26K MT",
      label: "DI Fittings Production",
      icon: <Factory className="text-rashmi-red" size={24} />
    }
  ];

  const products = [
    {
      range: "DN 80 to DN 1200",
      type: "DI Pipes",
      applications: "Potable water, raw water, and wastewater transportation"
    },
    {
      range: "DN 80 to DN 1600",
      type: "DI Fittings",
      applications: "Various jointing options with different coating types"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Why Choose <span className="text-rashmi-red">Rashmi DI Pipes</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              A name synonymous with reliability & quality in Eastern India's iron & steel manufacturing industry.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none z-[-1]"
        >
          <div className="bg-rashmi-red/20 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-bold">
                  Global Leadership in <span className="text-rashmi-red">Metallurgy</span>
                </motion.h2>
                <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
                  Rashmi Metaliks Limited is one of the flagship companies of Rashmi Group, incorporated in 
                  the year 2004 in West Bengal. We have a State-Of-The-Art Integrated Steel manufacturing facility 
                  comprised of Pellet, Sinter, Pig iron, Sponge Iron, Ductile Iron Pipe and Fittings, Billet, TMT & Wire 
                  Rod.
                </motion.p>
                <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed">
                  Since its inception, Rashmi Metaliks has been expanding at an unbeatable CAGR 
                  of 62%. We have upgraded our production to 7,70,000 Metric Tonnes of DI Pipes & 26,000 Metric 
                  Tonnes of DI Fittings annually.
                </motion.p>
                <motion.p variants={itemVariants} className="font-semibold text-foreground">
                  Today, Rashmi Metaliks stands as the largest manufacturer of DI Pipes 
                  & Fittings in India and holds the second position in the globe.
                </motion.p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="relative rounded-2xl overflow-hidden group p-1 bg-gradient-to-br from-rashmi-red/20 to-rashmi-red/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rashmi-red/20 to-rashmi-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1568576642545-4a383410d335?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                  alt="Rashmi DI Pipes Manufacturing" 
                  className="w-full h-full rounded-xl object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
            >
              Our <span className="text-rashmi-red">Production Capacity</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4 bg-rashmi-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-foreground">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Quality & Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-center mb-6"
            >
              Quality <span className="text-rashmi-red">Certifications</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto"
            >
              Maintaining quality as per international benchmarks, we make use of the most modern casting
              techniques for manufacturing that result in good-quality casting.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {qualities.map((quality, index) => (
                <motion.div
                  key={quality.title}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4 bg-rashmi-red/10 w-12 h-12 rounded-full flex items-center justify-center text-rashmi-red">
                    {quality.icon}
                  </div>
                  <h3 className="font-bold mb-2 text-foreground">{quality.title}</h3>
                  <p className="text-sm text-muted-foreground">{quality.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Product Range */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-center mb-6"
            >
              Product <span className="text-rashmi-red">Range</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto"
            >
              Our pipes and fittings are ideally suitable for the transportation of potable drinking water, 
              raw water, and wastewater and follow numerous international and European standards.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.type}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  <div className="border-b border-border p-6">
                    <h3 className="text-2xl font-bold text-foreground">{product.type}</h3>
                    <p className="text-rashmi-red font-medium mt-1">Range: {product.range}</p>
                  </div>
                  <div className="p-6">
                    <h4 className="font-medium mb-3 text-foreground">Applications:</h4>
                    <p className="text-muted-foreground">{product.applications}</p>
                    
                    <div className="mt-6">
                      <Link 
                        to={product.type === "DI Pipes" ? "/di-pipes" : "/di-fittings"}
                        className="flex items-center text-rashmi-red hover:underline"
                      >
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-display font-bold text-center mb-6"
            >
              Our <span className="text-rashmi-red">Journey</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto"
            >
              Tracing our growth from inception to becoming India's largest DI Pipes & Fittings manufacturer.
            </motion.p>
            
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    variants={itemVariants}
                    className="pt-12 relative"
                  >
                    {/* Circle on timeline */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rashmi-red"></div>
                    
                    <div className="rounded-xl p-6 bg-card border border-border h-full">
                      <div className="text-rashmi-red font-bold text-xl mb-2">{milestone.year}</div>
                      <h3 className="font-semibold mb-2 text-foreground">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="max-w-5xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Choose the Best?</h2>
                <p className="text-muted-foreground mb-6">
                  Discover why Rashmi DI Pipes are the preferred choice for water management solutions worldwide.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="text-rashmi-red mr-2 mt-1 flex-shrink-0" size={18} />
                    <p className="text-sm text-muted-foreground">High dimensional accuracy leads to proper fitment</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-rashmi-red mr-2 mt-1 flex-shrink-0" size={18} />
                    <p className="text-sm text-muted-foreground">Varied options for coating and lining</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-rashmi-red mr-2 mt-1 flex-shrink-0" size={18} />
                    <p className="text-sm text-muted-foreground">Perfect pipeline solutions for a variety of applications</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Link 
                    to="/di-pipes"
                    className="bg-rashmi-red hover:bg-rashmi-red/90 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Explore Our Products
                  </Link>
                </div>
              </div>
              <div className="bg-muted relative hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1631087376178-05d7e2626988?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                  alt="Rashmi DI Pipes" 
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WhyRashmiDiPipes;
