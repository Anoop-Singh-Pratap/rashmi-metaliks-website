
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Fire, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// TMT Bar grades data
const tmtGrades = [
  "Rashmi TMT Fe 415",
  "Rashmi TMT Fe 415D",
  "Rashmi TMT Fe 500",
  "Rashmi TMT Fe 500D",
  "Rashmi TMT Fe 550 EQCR"
];

// Production process steps
const productionProcess = [
  {
    title: "Raw Material Treatment",
    description: "Raw materials are treated at the DRI (Direct Reduced Iron) plant."
  },
  {
    title: "High Quality Billets",
    description: "High quality billets are obtained from the steel melting shop."
  },
  {
    title: "Rolling Mill Processing",
    description: "Billets are passed through the state-of-the-art rolling mill."
  },
  {
    title: "Self-Tempering Process",
    description: "Self-Tempering process is used to result in a structure called 'Tempered Martensite'."
  },
  {
    title: "Atmospheric Cooling",
    description: "Atmospheric Cooling process comes into play where heat of the core area tempers the Martensite part and the ductile core becomes the Ferrite Pearlite structure."
  },
  {
    title: "Structural Formation",
    description: "Martensite part is hardened, apt to withstand load of bigger proportions, while the Ferrite-Pearlite part is ductile and endowed with elongation properties."
  },
  {
    title: "Quality Testing",
    description: "Mechanical & chemical tests are done at par with IS 1786:2008."
  },
  {
    title: "Packaging & Tagging",
    description: "TMT Bars are cut into required length, bundled up and tagged."
  }
];

// TMT Bar advantages
const advantages = [
  {
    title: "Earthquake Resistant",
    description: "The Thermo Mechanical Treatment attributes higher elongation to the Rashmi 500D TMT Bars that make them resistant against earthquakes."
  },
  {
    title: "Corrosion Resistant",
    description: "At the time of manufacturing, the outer surface of Rashmi 500D TMT Bars form a hard Ferric Oxide layer in presence of moisture and air when they are treated on the Cooling Bed. This coating helps the bars resist against corrosion."
  },
  {
    title: "Fire Resistant",
    description: "In comparison to ordinary CTD bars and TOR steel bars, Rashmi TMT Bars are specially manufactured to tolerate heat up to 600ᵒ centigrade."
  },
  {
    title: "Extra Strength and Ductility",
    description: "Combination of tempered martensite on the surface and fine grain ferrite-pearlite in the core provides higher strength, toughness and ductility to the TMT Bars."
  },
  {
    title: "Super Bondability",
    description: "TMT Bars strongly bond with their surrounding concrete that adds to the strength and firmness of the construction."
  },
  {
    title: "Higher Weldability",
    description: "Raw materials used in the production of TMT Bars have low carbon. This ensures higher weldability of the bars."
  },
  {
    title: "Steel Saving",
    description: "Maintaining a low tolerance of sectional weight enables Rashmi TMT Bars to save 15% approx. in steel consumption, compared to others."
  }
];

const TmtBar = () => {
  const productionRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const gradesRef = useRef<HTMLDivElement>(null);
  
  const productionInView = useInView(productionRef, { once: true, amount: 0.3 });
  const advantagesInView = useInView(advantagesRef, { once: true, amount: 0.3 });
  const gradesInView = useInView(gradesRef, { once: true, amount: 0.3 });
  
  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/80 mix-blend-multiply z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1590496794008-383c8070b257?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
            alt="TMT Bars Manufacturing" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6"
            >
              <span className="block">World-Class</span>
              <span className="block text-rashmi-red">TMT Bars</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl max-w-2xl mb-8"
            >
              Exceptional strength and ductility for critical infrastructure projects. Perfectly suited for flyovers, dams, bridges, and more.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => scrollTo(advantagesRef)}
                className="bg-rashmi-red hover:bg-rashmi-red/90 text-white px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors"
              >
                Explore Advantages <ArrowRight size={16} className="ml-2" />
              </button>
              <button 
                onClick={() => scrollTo(productionRef)}
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors"
              >
                View Production Process <ChevronDown size={16} className="ml-2" />
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Key stats badges */}
        <div className="container mx-auto px-4 relative z-20 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white">4 Lakh MTPA</h3>
              <p className="text-white/80">Pig Iron & Sinter Plant Capacity</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white">Est. 2009</h3>
              <p className="text-white/80">Steel Melting Shop</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white">600°C</h3>
              <p className="text-white/80">Heat Tolerance</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Introduction Section */}
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
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Superior TMT Bars for <span className="text-rashmi-red">Critical Infrastructure</span>
              </h2>
              <p>
                The TMT Bars produced by Rashmi Metaliks is a world class product. Not only does the company have its own Billet producing steel melting shop (established in 2009), and Rolling Mill (set up in 2010), the production capacity of Pig Iron & Sinter Plant is gigantic at 4 lakh MTPA.
              </p>
              <p>
                We produce TMT Bars keeping in mind the international standards in mind and our esteemed customers include the Government, major Industrial Houses, Real Estate Developers, Civil Contractors. The product has high utility when it comes to building flyovers, dams, bridges and other large and critical infrastructure projects where we need to marry high yield load with ductility & quality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* TMT Grades Section */}
      <section ref={gradesRef} className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gradesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
              Rashmi TMT <span className="text-rashmi-red">Grades</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tmtGrades.map((grade, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={gradesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow flex items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <div className="w-8 h-8 rounded-full bg-rashmi-red/30 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-rashmi-red"></div>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold">{grade}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Production Process Timeline */}
      <section ref={productionRef} className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={productionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-12">
              <Fire size={30} className="text-rashmi-red mr-3" />
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Production <span className="text-rashmi-red">Process</span>
              </h2>
            </div>
            
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border -ml-0.5 md:-ml-px"></div>
              
              {productionProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={productionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } mb-12 last:mb-0`}
                >
                  <div className="ml-8 md:ml-0 md:w-1/2 flex justify-start md:justify-end items-center order-2 md:order-none pr-0 md:pr-8">
                    <div className={`bg-card border border-border rounded-lg p-6 max-w-sm ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}>
                      <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-0 md:left-1/2 top-3 -ml-3 md:-ml-3 flex justify-center">
                    <div className="w-6 h-6 bg-rashmi-red rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 pl-0 md:pl-8 order-1 md:order-none"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Advantages Section */}
      <section ref={advantagesRef} className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={advantagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
              Advantages of <span className="text-rashmi-red">Rashmi TMT Bars</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={advantagesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start mb-4">
                    <CheckCircle size={24} className="text-rashmi-red mr-3 mt-1 flex-shrink-0" />
                    <h4 className="text-xl font-semibold">{advantage.title}</h4>
                  </div>
                  <p className="text-muted-foreground pl-9">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to build with the best?</h3>
                <p className="text-muted-foreground mb-6">
                  Discover how Rashmi TMT Bars can enhance the strength and durability of your next infrastructure project.
                </p>
                <Link 
                  to="/contact" 
                  className="bg-rashmi-red hover:bg-rashmi-red/90 text-white px-6 py-3 rounded-md inline-flex items-center justify-center transition-colors"
                >
                  Contact Us <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
              <div className="md:w-1/2 bg-rashmi-red/10 p-8 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-rashmi-red/20 flex items-center justify-center mr-4">
                    <Fire size={24} className="text-rashmi-red" />
                  </div>
                  <h4 className="text-xl font-bold">15% Steel Saving</h4>
                </div>
                <p className="text-muted-foreground">
                  Our TMT Bars help save approximately 15% in steel consumption compared to other manufacturers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TmtBar;
