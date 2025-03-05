
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Factory, 
  Package, 
  Globe, 
  CheckCircle2,
  ChevronDown,
  Download,
  Award,
  Droplets,
  Pipette,
  Unplug,
  Hammer,
  CircuitBoard,
  Clock,
  ArrowUpRight
} from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const DiPipes = () => {
  const [activeTab, setActiveTab] = useState("why-rashmi");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Handler for scrolling to advantages section
  const scrollToAdvantages = (e: React.MouseEvent) => {
    e.preventDefault();
    const advantagesSection = document.getElementById('advantages');
    if (advantagesSection) {
      advantagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Term highlighting effect for "Ductile Iron Pipe"
  useEffect(() => {
    const highlightTerms = () => {
      const terms = document.querySelectorAll('.highlight-term');
      terms.forEach((term, index) => {
        setTimeout(() => {
          term.classList.add('term-highlight-active');
          setTimeout(() => {
            term.classList.remove('term-highlight-active');
          }, 1500);
        }, index * 3000);
      });
    };
    
    const interval = setInterval(highlightTerms, 9000);
    highlightTerms(); // Run once immediately
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Industrial Grandeur */}
      <section className="relative pt-28 pb-24 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
        <motion.div 
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1618761299062-ba2dbbcebd92?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            style={{ opacity, y }}
          >
            <div className="inline-block bg-rashmi-red/10 px-4 py-1 rounded-full text-rashmi-red font-medium text-sm mb-4">
              Premium Quality
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Engineering Fluid Excellence
              <motion.span 
                className="block text-2xl mt-4 text-rashmi-red"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <span className="highlight-term">Ductile Iron Pressure Pipes</span>
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-muted-foreground text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              The <span className="highlight-term">DI Pipe</span> business is the newest and the most aggressive entrant to the business stable of Rashmi Metaliks. 
              The last 4 years have been very fulfilling and have returned a CAGR of 62%.
            </motion.p>
            
            {/* Floating Stats Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <motion.div 
                className="stat-badge bg-rashmi-red/80 text-white px-4 py-2 rounded-lg shadow-lg"
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
              >
                <span className="block text-2xl font-bold">62%</span>
                <span className="text-xs">CAGR</span>
              </motion.div>
              
              <motion.div 
                className="stat-badge bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg dark:bg-slate-700"
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5 }}
              >
                <span className="block text-2xl font-bold">7.7L MT</span>
                <span className="text-xs">Annual Capacity</span>
              </motion.div>
              
              <motion.div 
                className="stat-badge bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg"
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                transition={{ delay: 1 }}
              >
                <span className="block text-2xl font-bold">ISO</span>
                <span className="text-xs">8329:2000 Certified</span>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link 
                to="#advantages" 
                onClick={scrollToAdvantages}
                className="group bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-3 rounded-md inline-flex items-center transition-all"
              >
                Explore Advantages
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="ml-2 group-hover:animate-bounce" size={18} />
                </motion.span>
              </Link>
              
              <a 
                href="#specifications"
                className="bg-transparent border border-rashmi-red text-rashmi-red hover:bg-rashmi-red/10 px-8 py-3 rounded-md inline-flex items-center transition-colors"
              >
                Technical Specs <Download className="ml-2" size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="text-rashmi-red" size={28} />
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-rashmi-red/10 rounded-full flex items-center justify-center text-rashmi-red mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">ISO 8329:2000 Certified</h3>
              <p className="text-muted-foreground">
                We produce <span className="highlight-term">Ductile Iron Pressure Pipes</span> as per ISO 8329:2000 which helps us maintain excellent standards of production.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-rashmi-red/10 rounded-full flex items-center justify-center text-rashmi-red mb-4">
                <Factory size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">State-of-Art Facility</h3>
              <p className="text-muted-foreground">
                With our hard work and utmost dedication, we have upgraded our production to 7,70,000 Metric Tonnes of <span className="highlight-term">DI Pipes</span> annually.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-rashmi-red/10 rounded-full flex items-center justify-center text-rashmi-red mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Vision</h3>
              <p className="text-muted-foreground">
                The <span className="highlight-term">DI Pipes</span> made by Rashmi Metaliks conform to ISO1829 as well as International Standards ISO:2531, BSEN545, BSEN598, and more.
              </p>
            </motion.div>
          </div>
          
          {/* Interactive Advantages Showcase */}
          <div className="mb-16" id="advantages">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">
                Advantages of <span className="highlight-term">Ductile Iron Pipe</span>
              </h2>
              <p className="text-muted-foreground">
                What veins and arteries are to humans is what <span className="highlight-term">DI Pipes</span> are to the modern civilizations. 
                As cities, towns and villages grow, transporting water for human consumptions from its source is a growing challenge.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { text: "Tremendous Tensile Strength", icon: <Hammer className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Pressure bearing ability", icon: <Pipette className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Withstands Severe Crushing Loads", icon: <Package className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Great beam Strength", icon: <Shield className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Corrosion resistant", icon: <Droplets className="text-rashmi-red shrink-0" size={20} /> },
                { text: "High Impact Resistance", icon: <CircuitBoard className="text-rashmi-red shrink-0" size={20} /> },
                { text: "High Bursting Strength", icon: <Unplug className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Sustains external static/dynamic loading", icon: <Package className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Easy to Install", icon: <Award className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Minimal installation cost", icon: <Hammer className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Zero Maintenance", icon: <Clock className="text-rashmi-red shrink-0" size={20} /> },
                { text: "No Cathodic Protection", icon: <Shield className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Low pumping cost", icon: <CircuitBoard className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Excellent hydraulic features", icon: <Droplets className="text-rashmi-red shrink-0" size={20} /> },
                { text: "Extensive range of pipes, fittings and accessories", icon: <Award className="text-rashmi-red shrink-0" size={20} /> }
              ].map((advantage, index) => (
                <motion.div 
                  key={index}
                  className="bg-card/50 rounded-lg p-4 flex flex-col items-center text-center border border-border/30 hover:border-rashmi-red/30 hover:shadow-md transition-all"
                  variants={fadeIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="w-10 h-10 rounded-full bg-rashmi-red/10 flex items-center justify-center mb-3">
                    {advantage.icon}
                  </div>
                  <span className="text-sm">{advantage.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Tabs Section with Technical Specifications */}
          <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm border border-border" id="specifications">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8 bg-muted/50">
                <TabsTrigger value="why-rashmi" className="data-[state=active]:bg-rashmi-red data-[state=active]:text-white">
                  Why Rashmi DI Pipe
                </TabsTrigger>
                <TabsTrigger value="manufacturing" className="data-[state=active]:bg-rashmi-red data-[state=active]:text-white">
                  Manufacturing Facility
                </TabsTrigger>
                <TabsTrigger value="product-range" className="data-[state=active]:bg-rashmi-red data-[state=active]:text-white">
                  Product Range
                </TabsTrigger>
                <TabsTrigger value="global-vision" className="data-[state=active]:bg-rashmi-red data-[state=active]:text-white">
                  Indian Product: Global Vision
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="why-rashmi" className="mt-4">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h3 className="text-2xl font-display font-semibold mb-4">Why Choose Rashmi DI Pipes?</h3>
                  <p>
                    Rashmi Metaliks in the flag bearer of Rashmi Group. The company is an excellent amalgamation of dynamic top management, 
                    combined with young, energetic professionals with years of industry experience.
                  </p>
                  <p>
                    What veins and arteries are to humans is what <span className="highlight-term font-medium">DI Pipes</span> are to the modern civilizations. As cities, towns and villages grow, 
                    transporting water for human consumptions from its source is a growing challenge.
                  </p>
                  <p>
                    It is here that the range of high tensile strength, corrosion resistant and durable <span className="highlight-term font-medium">DI Pipes</span> from the Rashmi Metaliks find their usefulness.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <motion.div 
                      className="bg-muted/30 p-6 rounded-lg"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="text-xl font-semibold mb-2">Quality Assurance</h4>
                      <p>Our strict quality control measures ensure that every pipe meets international standards.</p>
                    </motion.div>
                    <motion.div 
                      className="bg-muted/30 p-6 rounded-lg"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="text-xl font-semibold mb-2">Customer Support</h4>
                      <p>Dedicated technical support and after-sales service for all your needs.</p>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Manufacturing Facility Tab with Process Visualization */}
              <TabsContent value="manufacturing" className="mt-4">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h3 className="text-2xl font-display font-semibold mb-4">State-of-the-Art Manufacturing Facility</h3>
                  <p>
                    The <span className="highlight-term font-medium">DI Pipe</span> from the Rashmi Metaliks stable is made in a state of the art and integrated plant located at Kharagpur, West Bengal. 
                    The plant is able to greatly control the quality of the DI Pipes as it has vertically integrated all its processes, including putting up its own:
                  </p>
                  
                  {/* Process Timeline Visualization */}
                  <div className="relative mt-10 mb-12 px-4">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-rashmi-red/20 z-0"></div>
                    
                    {[
                      { title: "Sintering Plant", desc: "Advanced material processing" },
                      { title: "Blast Furnace", desc: "High-temperature metal production" },
                      { title: "Committed Railway Sliding", desc: "Efficient logistics infrastructure" },
                      { title: "Pellet Plant", desc: "Raw material preparation" },
                      { title: "Captive Power Unit", desc: "Energy self-sufficiency" }
                    ].map((step, index) => (
                      <motion.div 
                        key={index}
                        className={`process-step relative z-10 flex items-center mb-12 ${
                          index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                        }`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className={`w-1/2 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                          <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                          <p className="text-muted-foreground text-sm">{step.desc}</p>
                        </div>
                        
                        <div className="process-node w-8 h-8 bg-rashmi-red rounded-full flex items-center justify-center border-4 border-background">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        
                        <div className="w-1/2"></div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <p>
                      This vertical integration ensures complete control over the manufacturing process, 
                      leading to superior quality and consistent performance of our <span className="highlight-term font-medium">DI Pipes</span>.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="product-range" className="mt-4">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h3 className="text-2xl font-display font-semibold mb-4">Comprehensive Product Range</h3>
                  <p>
                    The A+ grade quality of <span className="highlight-term font-medium">DI Pipe</span> is manufactured in a wide range of application – from DN 100 to DN 1200. 
                    The state-of-the-art plant has invested and shall stay invested in upgrading its technology so as to 
                    deliver quality products to its Domestic and International clients.
                  </p>
                  
                  <h4 className="text-xl font-semibold mt-8 mb-4">Mechanical Properties of DI Pipes</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Mechanical Properties</th>
                          <th className="border border-border p-3 text-left">Values</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3">Tensile Strength</td>
                          <td className="border border-border p-3">Min. 4,200 Kg/cm2 or 420 MPA</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">Yield Strength</td>
                          <td className="border border-border p-3">3,000 Kg/cm2 or 300 MPA</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3">Minimum Elongation</td>
                          <td className="border border-border p-3">10% (upto DN 1000 mm)</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">Modulus of Elasticity</td>
                          <td className="border border-border p-3">1.62 x 10<sup>6</sup> - 1.70 x 10<sup>6</sup> Kg/cm<sup>2</sup> or 162,000 - 170,000 MPA</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3">MPA Hardness</td>
                          <td className="border border-border p-3">Max. 230 BHN</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">Density</td>
                          <td className="border border-border p-3">7,050 Kg per cubic meter</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3">Coefficient of Thermal Expansion</td>
                          <td className="border border-border p-3">11.5 x 10<sup>-6</sup> per degree celcious (°C) (for temperature range 20°C - 100°C)</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">Impact Strength</td>
                          <td className="border border-border p-3">At Normal Temperature - 7 ft-lb (minimium) & At Low temperature - 3 ft-lb (minimum)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="text-xl font-semibold mt-8 mb-4">Technical Specifications</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Specification</th>
                          <th className="border border-border p-3 text-left">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3">Product</td>
                          <td className="border border-border p-3">Ductile Iron (DI) Pipes suitable for Push-on-Joints*</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">Size Range</td>
                          <td className="border border-border p-3">DN 100 to 1200</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3">Class of DI Pipes</td>
                          <td className="border border-border p-3">C20, C25, C30, C40, C50, C64, C100, PP, K-7 & K-9</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">Standard Length (in Meters)</td>
                          <td className="border border-border p-3">5.5</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3">Internal Linings</td>
                          <td className="border border-border p-3">
                            <ul className="pl-5">
                              <li>Cement Mortar Lining of OPC / BFSC / SRC / HAC</li>
                              <li>Cement Lining with Epoxy Seal Coat</li>
                              <li>Cement Lining with Bituminous Seal Coat</li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">External Coating – 1</td>
                          <td className="border border-border p-3">
                            <ul className="pl-5">
                              <li>Zinc Coating (130 grm/m<sup>2</sup>) or 200 grm/m<sup>2</sup> or 400 grm/m<sup>2</sup></li>
                              <li>Alloy of Zinc & Aluminium (ZnAl) with minimum mass of 400 grm/m<sup>2</sup></li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3">External Coating – 2</td>
                          <td className="border border-border p-3">
                            <ul className="pl-5">
                              <li>Bitumen Coating</li>
                              <li>Blue Epoxy</li>
                              <li>Red Epoxy</li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">Outside OnSite Protection</td>
                          <td className="border border-border p-3">Polyethylene Sleeving</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3">Coating of Joint Area</td>
                          <td className="border border-border p-3">Bitumen / Epoxy as per customer requirement</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">Conforming Specifications</td>
                          <td className="border border-border p-3">
                            <ul className="pl-5">
                              <li>EN 545:2010 / EN 545:2006</li>
                              <li>ISO 2531:2009 / ISO 2531:1998</li>
                              <li>EN 598:2007 / ISO 7186:2011</li>
                              <li>IS 8329 : 2000</li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="text-xl font-semibold mt-8 mb-4">Angular Deflection of DI Pipes</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-3 text-left">Diameter Range (DN)</th>
                          <th className="border border-border p-3 text-left">Angular Deflection</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3">DN 100 - DN 150</td>
                          <td className="border border-border p-3">5°</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">DN 200 - DN 300</td>
                          <td className="border border-border p-3">5°</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3">DN 300 - DN 600</td>
                          <td className="border border-border p-3">3°</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">DN 700 - DN 800</td>
                          <td className="border border-border p-3">2°</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3">DN 900 - DN 1000</td>
                          <td className="border border-border p-3">1.5°</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-border p-3">DN 1100 - DN 1200</td>
                          <td className="border border-border p-3">1°</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <motion.button
                      className="bg-rashmi-red text-white px-6 py-3 rounded-md inline-flex items-center hover:bg-rashmi-red/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Download Full Specifications <Download className="ml-2" size={16} />
                    </motion.button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Certifications & Global Vision Tab */}
              <TabsContent value="global-vision" className="mt-4">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h3 className="text-2xl font-display font-semibold mb-4">Indian Product: Global Vision</h3>
                  <p>
                    The <span className="highlight-term font-medium">DI Pipes</span> made by Rashmi Metaliks conform to ISO1829 as well as International Standards ISO:2531, 
                    BSEN545, BSEN598, ISO9001, OHSAS18001 & ISO14001. These parameters have made us win the trust of many 
                    domestic and international clients.
                  </p>
                  
                  {/* Certifications Wall */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                    {[
                      { name: "ISO 9001", desc: "Quality Management" },
                      { name: "ISO 14001", desc: "Environmental Management" },
                      { name: "OHSAS 18001", desc: "Occupational Health & Safety" },
                      { name: "ISO 8329:2000", desc: "Product Specification" }
                    ].map((cert, index) => (
                      <motion.div 
                        key={index}
                        className="cert-card bg-card rounded-lg p-4 flex flex-col items-center text-center border border-border/50 hover:border-rashmi-red/30 hover:shadow-md transition-all"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                      >
                        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-3 border-2 border-rashmi-red/20">
                          <Shield className="text-rashmi-red" size={28} />
                        </div>
                        <span className="font-bold">{cert.name}</span>
                        <span className="text-xs text-muted-foreground mt-1">{cert.desc}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-card rounded-lg p-6 border border-border/60">
                      <h4 className="text-xl font-semibold mb-4">International Standards</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>ISO:2531 - Ductile iron pipes, fittings, accessories and their joints for water applications</li>
                        <li>BSEN545 - Ductile iron pipes, fittings, accessories and their joints for water pipelines</li>
                        <li>BSEN598 - Ductile iron pipes, fittings, accessories and their joints for sewerage applications</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card rounded-lg p-6 border border-border/60">
                      <h4 className="text-xl font-semibold mb-4">Management Systems</h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>ISO9001 - Quality Management System</li>
                        <li>OHSAS18001 - Occupational Health and Safety Management</li>
                        <li>ISO14001 - Environmental Management System</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-xl font-semibold mb-4">Global Footprint</h4>
                    <p>
                      Our commitment to quality and international standards has enabled us to establish a presence in 
                      multiple countries across Asia, Africa, and the Middle East. We continue to expand our global 
                      footprint while maintaining our commitment to excellence.
                    </p>
                    <div className="bg-muted/30 p-6 rounded-lg mt-4">
                      <p className="font-semibold text-center italic">
                        "Excellence in quality is our promise, delivering globally competitive products from the heart of India."
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">
              Ready to Transform Your Water Management?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Contact our experts today to discuss your requirements and discover how Rashmi <span className="highlight-term">DI Pipes</span> can provide 
              the perfect solution for your water infrastructure needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button 
                className="bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-3 rounded-md transition-colors inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Request a Quote <ArrowUpRight className="ml-2" size={16} />
              </motion.button>
              <Link to="/#contact" className="bg-muted hover:bg-muted/80 text-foreground px-8 py-3 rounded-md transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
      
      {/* Custom CSS for term highlighting */}
      <style jsx="true">{`
        .highlight-term {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .term-highlight-active {
          color: #E7251F;
          font-weight: 600;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default DiPipes;
