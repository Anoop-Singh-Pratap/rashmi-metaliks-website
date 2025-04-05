import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';

const ProjectCalculator: React.FC = () => {
  const [pipeSize, setPipeSize] = useState('DN 100');
  const [length, setLength] = useState(100);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  
  const pipeData = {
    'DN 80': { weight: 14.0, pricePerMeter: 85 },
    'DN 100': { weight: 17.0, pricePerMeter: 105 },
    'DN 150': { weight: 25.0, pricePerMeter: 155 },
    'DN 200': { weight: 34.0, pricePerMeter: 210 },
    'DN 300': { weight: 58.0, pricePerMeter: 340 },
  };
  
  useEffect(() => {
    if (pipeData[pipeSize as keyof typeof pipeData]) {
      const weight = pipeData[pipeSize as keyof typeof pipeData].weight * length;
      setTotalWeight(weight);
      setTotalCost(pipeData[pipeSize as keyof typeof pipeData].pricePerMeter * length);
    }
  }, [pipeSize, length]);
  
  return (
    <div className="bg-card dark:bg-card/90 border border-border rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-border flex items-center gap-3">
        <Calculator className="text-rashmi-red" size={24} />
        <h3 className="text-xl font-bold">Project Calculator</h3>
      </div>
      
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Pipe Size</label>
            <select 
              value={pipeSize}
              onChange={(e) => setPipeSize(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-rashmi-red/30 focus:border-rashmi-red transition-all duration-300"
            >
              {Object.keys(pipeData).map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Pipe Length (meters)</label>
            <input 
              type="number" 
              min="1"
              value={length}
              onChange={(e) => setLength(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-rashmi-red/30 focus:border-rashmi-red transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border grid md:grid-cols-2 gap-6">
          <div className="bg-rashmi-dark/5 dark:bg-rashmi-red/5 p-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Total Pipe Weight:</p>
            <motion.div 
              key={totalWeight}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold flex items-baseline"
            >
              {totalWeight.toLocaleString()} <span className="text-base ml-1">kg</span>
            </motion.div>
          </div>
          
          <div className="bg-rashmi-red/10 dark:bg-rashmi-red/10 p-4 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Estimated Cost:</p>
            <motion.div 
              key={totalCost}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold flex items-baseline text-rashmi-red"
            >
              ₹{totalCost.toLocaleString()} <span className="text-base ml-1">INR</span>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp size={16} />
            <span>This is an estimate. Contact us for accurate project pricing.</span>
          </div>
          
          <motion.a
            href="/contact-us"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="block w-full mt-4 bg-rashmi-red hover:bg-rashmi-red/90 text-white py-4 rounded-xl font-medium transition-all duration-300 text-center"
          >
            Request Detailed Quote
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCalculator; 