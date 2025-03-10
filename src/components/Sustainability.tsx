
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Droplets, 
  Factory, 
  Recycle, 
  Wind, 
  TreePine, 
  Zap, 
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { AreaChart } from './ui/area-chart';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      delay: 0.2 + i * 0.1 
    }
  })
};

const Sustainability = () => {
  const [activeChart, setActiveChart] = useState('emissions');
  const [animateChart, setAnimateChart] = useState(false);
  
  // Data for emissions chart
  const emissionsData = [
    { date: '2020-01', co2: 100 },
    { date: '2020-02', co2: 98 },
    { date: '2020-03', co2: 96 },
    { date: '2020-04', co2: 94 },
    { date: '2020-05', co2: 90 },
    { date: '2020-06', co2: 88 },
    { date: '2020-07', co2: 85 },
    { date: '2020-08', co2: 82 },
    { date: '2020-09', co2: 79 },
    { date: '2020-10', co2: 75 },
    { date: '2020-11', co2: 72 },
    { date: '2020-12', co2: 70 },
    { date: '2021-01', co2: 68 },
    { date: '2021-02', co2: 65 },
    { date: '2021-03', co2: 63 },
    { date: '2021-04', co2: 60 },
    { date: '2021-05', co2: 58 },
    { date: '2021-06', co2: 55 },
    { date: '2021-07', co2: 53 },
    { date: '2021-08', co2: 50 },
    { date: '2021-09', co2: 48 },
    { date: '2021-10', co2: 45 },
    { date: '2021-11', co2: 43 },
    { date: '2021-12', co2: 40 },
  ];

  // Data for water usage chart
  const waterUsageData = [
    { date: '2021-01', recycled: 60, fresh: 40 },
    { date: '2021-02', recycled: 62, fresh: 38 },
    { date: '2021-03', recycled: 65, fresh: 35 },
    { date: '2021-04', recycled: 68, fresh: 32 },
    { date: '2021-05', recycled: 70, fresh: 30 },
    { date: '2021-06', recycled: 72, fresh: 28 },
    { date: '2021-07', recycled: 75, fresh: 25 },
    { date: '2021-08', recycled: 78, fresh: 22 },
    { date: '2021-09', recycled: 80, fresh: 20 },
    { date: '2021-10', recycled: 82, fresh: 18 },
    { date: '2021-11', recycled: 85, fresh: 15 },
    { date: '2021-12', recycled: 88, fresh: 12 },
  ];

  const emissionsChartConfig = {
    co2: {
      label: "CO₂ Emissions",
      color: "#16a34a",
    }
  };

  const waterChartConfig = {
    recycled: {
      label: "Recycled Water",
      color: "#3b82f6",
    },
    fresh: {
      label: "Fresh Water",
      color: "#64748b",
    }
  };

  useEffect(() => {
    setAnimateChart(false);
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeChart]);

  return (
    <div id="sustainability" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <motion.h2 
            variants={textVariants}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Commitment to <span className="text-rashmi-red">Sustainability</span>
          </motion.h2>
          <motion.p 
            variants={textVariants}
            className="text-muted-foreground text-lg max-w-3xl mx-auto"
          >
            Rashmi Group is dedicated to responsible manufacturing through environmental stewardship, 
            resource conservation, and community development.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {[
            {
              icon: <Leaf className="h-6 w-6 text-white" />,
              title: "Environmental Protection",
              description: "Minimizing our ecological footprint through sustainable practices and technologies.",
              color: "from-green-400 to-green-600",
              borderColor: "border-green-400"
            },
            {
              icon: <Recycle className="h-6 w-6 text-white" />,
              title: "Circular Economy",
              description: "Reducing waste and promoting recycling throughout our production chain.",
              color: "from-blue-400 to-blue-600",
              borderColor: "border-blue-400"
            },
            {
              icon: <Factory className="h-6 w-6 text-white" />,
              title: "Sustainable Manufacturing",
              description: "Investing in clean technologies to reduce emissions and energy consumption.",
              color: "from-amber-400 to-amber-600",
              borderColor: "border-amber-400"
            },
            {
              icon: <Droplets className="h-6 w-6 text-white" />,
              title: "Water Conservation",
              description: "Implementing comprehensive water recycling systems across our facilities.",
              color: "from-cyan-400 to-cyan-600",
              borderColor: "border-cyan-400"
            },
            {
              icon: <Wind className="h-6 w-6 text-white" />,
              title: "Clean Energy",
              description: "Transitioning to renewable energy sources to power our operations.",
              color: "from-sky-400 to-sky-600",
              borderColor: "border-sky-400"
            },
            {
              icon: <TreePine className="h-6 w-6 text-white" />,
              title: "Reforestation Efforts",
              description: "Supporting large-scale tree planting initiatives to offset carbon emissions.",
              color: "from-emerald-400 to-emerald-600",
              borderColor: "border-emerald-400"
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-sm group"
            >
              <div className="p-6">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              <div className={`h-1 w-full bg-gradient-to-r ${item.color}`}></div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={textVariants}
            className="mb-8 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Measuring Our <span className="text-rashmi-red">Impact</span>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Tracking our environmental performance with transparent metrics and continuous improvement.
            </p>
          </motion.div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8 lg:p-10 shadow-sm">
            <div className="flex justify-center mb-8 space-x-4">
              <button 
                onClick={() => setActiveChart('emissions')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeChart === 'emissions' 
                    ? 'bg-rashmi-red text-white'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <Zap size={18} className="mr-2" />
                Emissions Reduction
              </button>
              <button 
                onClick={() => setActiveChart('water')}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeChart === 'water' 
                    ? 'bg-rashmi-red text-white'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <Droplets size={18} className="mr-2" />
                Water Usage
              </button>
            </div>

            <div className="h-[400px]">
              {activeChart === 'emissions' && (
                <div className={`transition-opacity duration-700 h-full ${animateChart ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-center mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">CO₂ Emissions Reduction</h3>
                    <p className="text-muted-foreground text-sm">Tracking our progress in reducing carbon emissions</p>
                  </div>
                  <AreaChart 
                    data={emissionsData}
                    config={emissionsChartConfig}
                    height={300}
                  />
                </div>
              )}

              {activeChart === 'water' && (
                <div className={`transition-opacity duration-700 h-full ${animateChart ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-center mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">Water Usage Efficiency</h3>
                    <p className="text-muted-foreground text-sm">Recycled vs Fresh Water Consumption</p>
                  </div>
                  <AreaChart 
                    data={waterUsageData}
                    config={waterChartConfig}
                    height={300}
                  />
                </div>
              )}
            </div>

            <div className="text-center mt-6">
              <a 
                href="/csr" 
                className="inline-flex items-center px-4 py-2 text-rashmi-red hover:text-rashmi-red/80 font-medium"
              >
                Learn more about our CSR initiatives
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
