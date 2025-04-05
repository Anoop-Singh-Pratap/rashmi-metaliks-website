import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SpecComparisonTool: React.FC = () => {
  const [selectedSizes, setSelectedSizes] = useState(['DN 100', 'DN 200']);
  
  const pipeSpecs = {
    'DN 80': { diameter: 98, thickness: 6.0, weight: 14.0, flow: 11.2 },
    'DN 100': { diameter: 118, thickness: 6.0, weight: 17.0, flow: 19.7 },
    'DN 150': { diameter: 170, thickness: 6.0, weight: 25.0, flow: 47.3 },
    'DN 200': { diameter: 222, thickness: 6.3, weight: 34.0, flow: 86.6 },
    'DN 300': { diameter: 326, thickness: 7.2, weight: 58.0, flow: 212.4 },
  };
  
  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else if (selectedSizes.length < 3) {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  return (
    <div className="bg-card dark:bg-card/80 border border-border rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Compare Pipe Specifications</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(pipeSpecs).map(size => (
          <button
            key={size}
            onClick={() => handleSizeToggle(size)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
              selectedSizes.includes(size) 
                ? 'bg-rashmi-red text-white' 
                : 'bg-card dark:bg-rashmi-dark/30 border border-border hover:bg-rashmi-red/10'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-rashmi-dark/10 dark:bg-rashmi-red/20 text-left">
              <th className="p-3 border border-border rounded-tl-lg">Property</th>
              {selectedSizes.map(size => (
                <th key={size} className="p-3 border border-border">
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-border font-medium">Outside Diameter (mm)</td>
              {selectedSizes.map(size => (
                <td key={size} className="p-3 border border-border">
                  {pipeSpecs[size as keyof typeof pipeSpecs].diameter}
                </td>
              ))}
            </tr>
            <tr className="bg-rashmi-dark/5 dark:bg-rashmi-red/5">
              <td className="p-3 border border-border font-medium">Wall Thickness (mm)</td>
              {selectedSizes.map(size => (
                <td key={size} className="p-3 border border-border">
                  {pipeSpecs[size as keyof typeof pipeSpecs].thickness}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 border border-border font-medium">Weight (kg/m)</td>
              {selectedSizes.map(size => (
                <td key={size} className="p-3 border border-border">
                  {pipeSpecs[size as keyof typeof pipeSpecs].weight}
                </td>
              ))}
            </tr>
            <tr className="bg-rashmi-dark/5 dark:bg-rashmi-red/5">
              <td className="p-3 border border-border font-medium">Flow Capacity (L/s)</td>
              {selectedSizes.map(size => (
                <td key={size} className="p-3 border border-border">
                  {pipeSpecs[size as keyof typeof pipeSpecs].flow}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-medium mb-2">Visual Comparison</h4>
        <div className="flex items-end h-40 gap-6 mt-4 justify-center">
          {selectedSizes.map(size => (
            <div key={size} className="flex flex-col items-center">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${(pipeSpecs[size as keyof typeof pipeSpecs].diameter / 326) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-12 sm:w-16 bg-gradient-to-t from-rashmi-red to-rashmi-red/70 rounded-t-full"
              />
              <span className="mt-2 text-sm">{size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecComparisonTool; 