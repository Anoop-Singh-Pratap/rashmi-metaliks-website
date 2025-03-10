
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealText from '@/components/ui/RevealText';
import ExploreButton from '@/components/ui/ExploreButton';
import { motion } from 'framer-motion';
import { Award, Factory, Check, MapPin, FileText, Briefcase, Clock, Users, Globe, Target, Lightbulb } from 'lucide-react';

const AboutRashmi = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Rashmi Group | Global Leader in Steel Manufacturing</title>
        <meta name="description" content="Learn about Rashmi Group - World's 2nd largest DI pipe manufacturer with 7.7L MT annual capacity and ISO certified manufacturing facilities in West Bengal, India." />
        <meta name="keywords" content="Rashmi Group, DI pipe manufacturer, steel production India, ISO certified pipes" />
      </Helmet>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-rashmi-dark to-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
              {Array.from({ length: 100 }).map((_, index) => (
                <div key={index} className="border border-rashmi-red/5"></div>
              ))}
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-3xl mx-auto">
              <RevealText
                text="Global Leadership in Metallurgy"
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-xl text-muted-foreground mb-8">
                Forging the future of infrastructure with precision, innovation, and sustainability
              </p>
              <ExploreButton text="Discover Our Journey" targetId="company-overview" />
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section id="company-overview" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="text-rashmi-red font-medium mb-3">
                  <RevealText text="Our Company" />
                </div>
                <RevealText
                  text="World's 2nd Largest DI Pipe Manufacturer"
                  as="h2"
                  className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
                />
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Rashmi Metaliks Limited is a name synonymous with reliability & quality in Eastern India's iron & 
                    steel manufacturing industry. Incorporated in 2004 in West Bengal, we have expanded at an unbeatable 
                    CAGR of 62% to become one of the flagship companies of Rashmi Group.
                  </p>
                  <p>
                    We have a State-Of-The-Art Integrated Steel manufacturing facility comprised of Pellet, Sinter, 
                    Pig iron, Sponge Iron, Ductile Iron Pipe and Fittings, Billet, TMT & Wire Rod.
                  </p>
                  <p>
                    Today, Rashmi Metaliks stands as the largest manufacturer of DI Pipes & Fittings in India and 
                    holds the second position globally, with an annual production capacity of 7,70,000 Metric Tonnes 
                    of DI Pipes & 26,000 Metric Tonnes of DI Fittings.
                  </p>
                </div>
                
                {/* Achievement Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                  <motion.div 
                    className="bg-card rounded-xl p-5 border border-border/40 shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-rashmi-red text-3xl font-bold mb-1">7.7L MT</div>
                    <div className="text-sm text-muted-foreground">Annual Pipe Capacity</div>
                  </motion.div>
                  <motion.div 
                    className="bg-card rounded-xl p-5 border border-border/40 shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-rashmi-red text-3xl font-bold mb-1">62%</div>
                    <div className="text-sm text-muted-foreground">Industry-Leading CAGR</div>
                  </motion.div>
                  <motion.div 
                    className="bg-card rounded-xl p-5 border border-border/40 shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-rashmi-red text-3xl font-bold mb-1">#2</div>
                    <div className="text-sm text-muted-foreground">Global Ranking</div>
                  </motion.div>
                </div>
              </div>
              
              {/* Image Side */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden group h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-rashmi-red/20 to-rashmi-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1618761299062-ba2dbbcebd92?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                    alt="Rashmi Group Factory" 
                    className="w-full h-full object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Location Markers */}
                  <div className="absolute top-1/4 left-1/4 z-20">
                    <div className="relative">
                      <div className="absolute w-6 h-6 bg-rashmi-red rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-6 h-6 bg-rashmi-red rounded-full flex items-center justify-center">
                        <MapPin className="text-white w-4 h-4" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
                        Kolkata HQ
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1/3 right-1/3 z-20">
                    <div className="relative">
                      <div className="absolute w-6 h-6 bg-rashmi-red rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-6 h-6 bg-rashmi-red rounded-full flex items-center justify-center">
                        <MapPin className="text-white w-4 h-4" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
                        Factory Location
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 right-1/4 z-20">
                    <div className="relative">
                      <div className="absolute w-6 h-6 bg-rashmi-red rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-6 h-6 bg-rashmi-red rounded-full flex items-center justify-center">
                        <MapPin className="text-white w-4 h-4" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs">
                        Ideal Center, A J C Bose Road
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CEO Section */}
        <section className="py-20 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative z-10">
                  <div className="overflow-hidden rounded-2xl transform">
                    <motion.div
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                    >
                      <img 
                        src="/lovable-uploads/Ceo-pic.png" 
                        alt="Mr. Sunil Kumar Patwari, CEO of Rashmi Group" 
                        className="w-full rounded-2xl object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
                
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-rashmi-red/5 rounded-full filter blur-3xl z-0"></div>
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-rashmi-red/5 rounded-full filter blur-3xl z-0"></div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-md p-4 rounded-xl z-10 border border-border/20"
                >
                  <h3 className="text-xl font-semibold flex items-center">
                    <Globe className="w-5 h-5 text-rashmi-red mr-2" />
                    Global Business Leader
                  </h3>
                  <p className="text-sm text-muted-foreground">Transforming Rashmi Group into a global conglomerate</p>
                </motion.div>
              </motion.div>
              
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-6"
              >
                <div className="text-rashmi-red font-medium mb-3">
                  <RevealText text="Leadership" />
                </div>
                <RevealText
                  text="About our CEO"
                  as="h2"
                  className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
                />
                
                <motion.div 
                  className="space-y-4 text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p>
                    Mr. Sunil Kumar Patwari, a Commerce Graduate, joined the family business which then was centered 
                    around the steel industry. Within a very short period of time, Mr. Patwari turned the greatest 
                    chapter in the group's history with his highly effective managerial and leadership skills.
                  </p>
                  <p>
                    His largest focus areas have been infusing the latest cutting-edge technology into the businesses 
                    and constantly innovate and produce world class products. He is the main reason why Rashmi Group 
                    has become a force to reckon with – not just in India, but so also in global markets.
                  </p>
                  <p>
                    Mr. Patwari has singlehandedly led the group towards its current transformation as a global business 
                    conglomerate. The technology adopted under his guidance is world class. This combined with the constant 
                    capacity expansion has led to market domination by Rashmi Group.
                  </p>
                </motion.div>
                
                {/* Key Achievements */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-rashmi-red/10 p-1.5 rounded-full text-rashmi-red">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Technology Integration</h4>
                      <p className="text-sm text-muted-foreground">Implementing cutting-edge manufacturing processes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-rashmi-red/10 p-1.5 rounded-full text-rashmi-red">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Global Expansion</h4>
                      <p className="text-sm text-muted-foreground">Strategic market penetration worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-rashmi-red/10 p-1.5 rounded-full text-rashmi-red">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Product Innovation</h4>
                      <p className="text-sm text-muted-foreground">Continuous development of world-class products</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 bg-rashmi-red/10 p-1.5 rounded-full text-rashmi-red">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Capacity Expansion</h4>
                      <p className="text-sm text-muted-foreground">Driving growth through strategic capacity increase</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Quality & Certification */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="Quality Assurance" />
              </div>
              <RevealText
                text="International Standards & Certifications"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-muted-foreground">
                Maintaining quality as per international benchmarks, we make use of the most modern casting
                techniques for manufacturing that result in good-quality casting for transportation of potable 
                drinking water, raw water, and wastewater.
              </p>
            </div>
            
            {/* Certification Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border/40 shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">ISO 9001:2015</h3>
                <p className="text-muted-foreground text-sm">
                  Quality Management System certified for consistent product quality and customer satisfaction.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border/40 shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">EN 545 / ISO 2531</h3>
                <p className="text-muted-foreground text-sm">
                  European and international standards compliance for ductile iron pipe systems for water pipelines.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-card rounded-xl p-6 border border-border/40 shadow-sm"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mb-4">
                  <Factory className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ultra Mega Project</h3>
                <p className="text-muted-foreground text-sm">
                  Recognized by the Government of West Bengal for significant industrial contribution.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Leadership Timeline */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="Our Journey" />
              </div>
              <RevealText
                text="Timeline of Excellence"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
            </div>
            
            {/* Timeline Component */}
            <div className="relative mx-auto max-w-4xl">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-border"></div>
              
              {/* Timeline Items */}
              <div className="space-y-20">
                <TimelineItem 
                  year="2004" 
                  title="Founding in West Bengal" 
                  description="Rashmi Metaliks Limited was incorporated as one of the flagship companies of Rashmi Group."
                  icon={<Briefcase />}
                  position="left"
                />
                
                <TimelineItem 
                  year="2010" 
                  title="Expansion Phase" 
                  description="Significant capacity expansion and introduction of new product lines."
                  icon={<Factory />}
                  position="right"
                />
                
                <TimelineItem 
                  year="2015" 
                  title="Ultra Mega Project Award" 
                  description="Recognized by the Government of West Bengal for industrial contribution."
                  icon={<Award />}
                  position="left"
                />
                
                <TimelineItem 
                  year="2020" 
                  title="Production Milestone" 
                  description="Reached 5,00,000 MT annual production capacity for DI pipes."
                  icon={<Clock />}
                  position="right"
                />
                
                <TimelineItem 
                  year="2024" 
                  title="Global Leadership" 
                  description="Became 2nd largest global manufacturer with 7,70,000 MT annual capacity."
                  icon={<Users />}
                  position="left"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Product Range Highlight */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-rashmi-red font-medium mb-3">
                <RevealText text="Product Excellence" />
              </div>
              <RevealText
                text="Comprehensive Product Range"
                as="h2"
                className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
              />
              <p className="text-muted-foreground">
                We supply A+ grade quality of DI Pipes (DN 80 to DN 1200) and Fittings (DN 80 to DN 1600), 
                manufactured for a wide range of applications with high dimensional accuracy and proper fitment.
              </p>
            </div>
            
            {/* Product Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductFeature 
                title="High Safety Factor" 
                description="Perfect pipeline solutions for critical infrastructure needs" 
              />
              <ProductFeature 
                title="Wide Size Range" 
                description="DN 80 to DN 1600 to meet diverse project requirements" 
              />
              <ProductFeature 
                title="Coating Options" 
                description="Various internal and external coating types for different conditions" 
              />
              <ProductFeature 
                title="Dimensional Accuracy" 
                description="Precision manufacturing for proper fitment in all applications" 
              />
            </div>
          </div>
        </section>
        
        {/* Mission & Vision Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 15 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute bg-rashmi-red/5 rounded-full filter blur-3xl"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Mission Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-card rounded-xl border border-border/40 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Target className="w-32 h-32 text-rashmi-red" />
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rashmi-red/10 text-rashmi-red mb-6">
                    <Target className="w-7 h-7" />
                  </div>
                  
                  <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
                  
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                    <p>
                      Our mission is to achieve business excellence through delivering superior value to our customers, 
                      shareholders, employees and society at large. We are committed to work in the true spirit of 
                      entrepreneurship by making optimum utilization of resources, using environment friendly procedures 
                      and practices, maintaining highest work ethics, hiring the best people and providing them with a 
                      safe and healthy working environment.
                    </p>
                    <p>
                      We aim to achieve leadership status in Iron & Steel, Cement, Power and Ferro Alloy industries by 
                      being a customer-driven, quality-obsessed and socially responsible corporate entity. We uphold the 
                      following values – integrity, empathy, commitment, trust, passion, concern, and loyalty and ensure 
                      to be wedded to these ideals while we work our way to the top and offer best quality products and 
                      services at most competitive prices.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    {["Excellence", "Sustainability", "Ethics", "Innovation", "Responsibility"].map((value, index) => (
                      <motion.span 
                        key={value}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--rashmi-red))", color: "white" }}
                        className="inline-flex items-center px-3 py-1 bg-rashmi-red/10 text-rashmi-red rounded-full text-xs font-medium transition-all duration-300"
                      >
                        {value}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Vision Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-card rounded-xl border border-border/40 p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Lightbulb className="w-32 h-32 text-rashmi-red" />
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rashmi-red/10 text-rashmi-red mb-6">
                    <Lightbulb className="w-7 h-7" />
                  </div>
                  
                  <h2 className="text-3xl font-display font-bold mb-6">Our Vision</h2>
                  
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                    <p>
                      Our vision is to be a premium global business conglomerate, consistently achieving breakthroughs 
                      and setting new benchmarks in Iron & Steel, Cement, Power and Ferro Alloy industries. Going 
                      forward, we plan to employ more ingenious technologies that empower us to meet the highest 
                      global standards in products and services and enrich lives of all through sustainable industrial 
                      and business development.
                    </p>
                  </div>
                  
                  <motion.div 
                    className="mt-8 grid grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                  >
                    {[
                      { label: "Target expansion", value: "2025" },
                      { label: "Production capacity goal", value: "10M MT" },
                      { label: "Global export destinations", value: "40+" },
                      { label: "Global leadership position goal", value: "#1" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--muted))" }}
                        className="bg-muted/30 rounded-lg p-4 text-center transition-all duration-300"
                      >
                        <h4 className="text-xl font-bold text-rashmi-red mb-1">{item.value}</h4>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Timeline Item Component
interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: "left" | "right";
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, icon, position }) => {
  return (
    <div className="relative">
      {/* Dot on timeline */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-rashmi-red flex items-center justify-center z-10">
        <div className="text-white">
          {icon}
        </div>
      </div>
      
      {/* Content box */}
      <motion.div 
        className={`w-5/12 ${position === "left" ? "mr-auto pr-8" : "ml-auto pl-8"}`}
        initial={{ opacity: 0, x: position === "left" ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-card p-6 rounded-xl border border-border/40 shadow-sm">
          <div className="text-rashmi-red font-bold mb-2">{year}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

// Product Feature Component
interface ProductFeatureProps {
  title: string;
  description: string;
}

const ProductFeature: React.FC<ProductFeatureProps> = ({ title, description }) => {
  return (
    <motion.div 
      className="bg-card border border-border/40 rounded-xl p-6 shadow-sm"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mr-3">
          <Check className="w-4 h-4" />
        </div>
        <h3 className="font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

export default AboutRashmi;
