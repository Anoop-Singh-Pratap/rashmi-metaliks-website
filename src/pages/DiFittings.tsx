import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Layers, Shield, Zap, Award, Factory, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpecificationTable from '../components/ui/SpecificationTable';
import InteractiveSpecTable from '../components/ui/InteractiveSpecTable';
import ExploreButton from '../components/ui/ExploreButton';

interface TableRow {
  [key: string]: string | number;
}

const DiFittings = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const socketsData = [
    {
      "nominal_size": "80",
      "outside_diameter": 98,
      "socket_depth": 84,
      "weight": 2.3
    },
    {
      "nominal_size": "100",
      "outside_diameter": 118,
      "socket_depth": 87,
      "weight": 2.84
    },
    {
      "nominal_size": "150",
      "outside_diameter": 170,
      "socket_depth": 91,
      "weight": 4.15
    },
    {
      "nominal_size": "200",
      "outside_diameter": 222,
      "socket_depth": 95,
      "weight": 5.63
    },
    {
      "nominal_size": "250",
      "outside_diameter": 274,
      "socket_depth": 99,
      "weight": 7.34
    },
    {
      "nominal_size": "300",
      "outside_diameter": 326,
      "socket_depth": 103,
      "weight": 9.28
    }
  ];

  const flangesData = [
    {
      "nominal_size": "80",
      "outside_diameter": 200,
      "bolt_circle": 160,
      "no_of_bolts": 8,
      "weight": 5.6
    },
    {
      "nominal_size": "100",
      "outside_diameter": 220,
      "bolt_circle": 180,
      "no_of_bolts": 8,
      "weight": 6.7
    },
    {
      "nominal_size": "150",
      "outside_diameter": 285,
      "bolt_circle": 240,
      "no_of_bolts": 8,
      "weight": 10.2
    },
    {
      "nominal_size": "200",
      "outside_diameter": 340,
      "bolt_circle": 295,
      "no_of_bolts": 12,
      "weight": 13.6
    },
    {
      "nominal_size": "250",
      "outside_diameter": 400,
      "bolt_circle": 350,
      "no_of_bolts": 12,
      "weight": 17.3
    },
    {
      "nominal_size": "300",
      "outside_diameter": 455,
      "bolt_circle": 400,
      "no_of_bolts": 12,
      "weight": 21.5
    }
  ];

  const bendData = [
    {
      "nominal_size": "80",
      "l_mm": 170,
      "weight_11_deg": 3.2,
      "weight_22_deg": 3.5,
      "weight_45_deg": 4.1,
      "weight_90_deg": 6.8
    },
    {
      "nominal_size": "100",
      "l_mm": 180,
      "weight_11_deg": 4.1,
      "weight_22_deg": 4.5,
      "weight_45_deg": 5.2,
      "weight_90_deg": 8.6
    },
    {
      "nominal_size": "150",
      "l_mm": 200,
      "weight_11_deg": 6.5,
      "weight_22_deg": 7.2,
      "weight_45_deg": 8.5,
      "weight_90_deg": 14.1
    },
    {
      "nominal_size": "200",
      "l_mm": 220,
      "weight_11_deg": 9.8,
      "weight_22_deg": 10.9,
      "weight_45_deg": 12.7,
      "weight_90_deg": 21.3
    },
    {
      "nominal_size": "250",
      "l_mm": 240,
      "weight_11_deg": 13.8,
      "weight_22_deg": 15.3,
      "weight_45_deg": 17.9,
      "weight_90_deg": 30.1
    },
    {
      "nominal_size": "300",
      "l_mm": 260,
      "weight_11_deg": 18.6,
      "weight_22_deg": 20.6,
      "weight_45_deg": 24.1,
      "weight_90_deg": 40.5
    }
  ];

  const advantages = [
    {
      title: "Perfect Compatibility",
      description: "Engineered to seamlessly integrate with our DI pipe systems, ensuring a cohesive and reliable pipeline network."
    },
    {
      title: "Same Durability",
      description: "Manufactured with the same high-quality ductile iron as our pipes, guaranteeing exceptional strength and longevity."
    },
    {
      title: "Diverse Joints",
      description: "Available in a variety of joint configurations, including flanged, spigot and socket, and mechanical joints, to suit any project requirement."
    },
    {
      title: "Pressure Capable",
      description: "Designed to withstand high-pressure conditions, ensuring safe and efficient fluid transfer in demanding applications."
    }
  ];

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

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <Header />
      
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Precision <span className="text-rashmi-red">DI Fittings</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              High-quality ductile iron fittings that complement our DI pipe systems for complete water management solutions.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-2xl mx-auto"
            >
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">Perfect Fit</h3>
                <p className="text-muted-foreground">Seamless Integration</p>
              </motion.div>
              <motion.div 
                className="bg-card hover:bg-card/90 border border-border p-6 rounded-lg transition-colors duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
              >
                <h3 className="text-2xl font-bold mb-1">High Pressure</h3>
                <p className="text-muted-foreground">Capable Performance</p>
              </motion.div>
            </motion.div>
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

        <ExploreButton 
          text="Explore Specifications" 
          targetId="specifications" 
          className="mt-12" 
        />
      </section>

      <section id="advantages" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Key <span className="text-rashmi-red">Advantages</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Our DI Fittings offer significant advantages over conventional fittings
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)"
                }}
                className="bg-card border border-border rounded-lg p-6 transition-all duration-300"
              >
                <div className="mb-4 bg-rashmi-red/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-rashmi-red" size={22} />
                </div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="specifications" className="py-16 mt-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Technical <span className="text-rashmi-red">Specifications</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg"
            >
              Detailed specifications for our range of DI Fittings
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card shadow-sm border border-border rounded-xl p-6 md:p-8 mb-12"
          >
            <InteractiveSpecTable 
              data={{
                sockets: socketsData,
                flanges: flangesData,
                bends: bendData
              }}
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border p-6 rounded-lg"
            >
              <div className="w-12 h-12 bg-rashmi-red/10 text-rashmi-red flex items-center justify-center rounded-full mb-4">
                <AlertCircle />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
              <p className="text-muted-foreground text-sm">
                All our fittings undergo rigorous testing and quality checks to ensure durability and perfect fitment.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border p-6 rounded-lg"
            >
              <div className="w-12 h-12 bg-rashmi-red/10 text-rashmi-red flex items-center justify-center rounded-full mb-4">
                <Factory />
              </div>
              <h3 className="text-lg font-semibold mb-2">Manufacturing Process</h3>
              <p className="text-muted-foreground text-sm">
                Manufactured using state-of-the-art technology and precision casting techniques.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card border border-border p-6 rounded-lg"
            >
              <div className="w-12 h-12 bg-rashmi-red/10 text-rashmi-red flex items-center justify-center rounded-full mb-4">
                <Layers />
              </div>
              <h3 className="text-lg font-semibold mb-2">Coating Options</h3>
              <p className="text-muted-foreground text-sm">
                Available with various coating options to suit different environmental conditions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto text-center bg-card border border-border p-10 md:p-16 rounded-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl z-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl">
                <div className="bg-rashmi-red/5 rounded-full w-[600px] h-[600px] blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to integrate Rashmi DI Fittings into your <span className="text-rashmi-red">water systems?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Contact our experts to learn more about our high-quality DI Fittings and how they can benefit your water management solutions.
              </p>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center px-6 py-3 bg-rashmi-red text-white font-medium rounded-lg transition-colors hover:bg-rashmi-red/90"
              >
                Contact Us Today
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DiFittings;
