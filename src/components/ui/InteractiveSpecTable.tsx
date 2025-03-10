
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TableRow {
  [key: string]: string | number;
}

interface InteractiveSpecTableProps {
  data: {
    sockets?: TableRow[];
    flanges?: TableRow[];
    bends?: TableRow[];
  };
  className?: string;
}

const InteractiveSpecTable: React.FC<InteractiveSpecTableProps> = ({
  data,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'sockets' | 'flanges' | 'bends'>('sockets');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Helper to determine max value in a column for visual scaling
  const getMaxValue = (rows: TableRow[], key: string): number => {
    const maxVal = Math.max(...rows.map(row => typeof row[key] === 'number' ? Number(row[key]) : 0));
    return maxVal || 1; // Avoid division by zero
  };

  // Get the headers for the active tab
  const getHeaders = () => {
    if (!data[activeTab] || data[activeTab]?.length === 0) return [];

    return Object.keys(data[activeTab]![0]).map(key => {
      const formattedKey = key.replace(/_/g, ' ');
      return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
    });
  };

  return (
    <div className={`${className}`}>
      {/* Tab Navigation */}
      <motion.div 
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setActiveTab('sockets')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'sockets' 
              ? 'bg-rashmi-red text-white' 
              : 'bg-muted/50 hover:bg-muted text-foreground'
          }`}
        >
          Sockets
        </button>
        <button
          onClick={() => setActiveTab('flanges')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'flanges' 
              ? 'bg-rashmi-red text-white' 
              : 'bg-muted/50 hover:bg-muted text-foreground'
          }`}
        >
          Flanges
        </button>
        <button
          onClick={() => setActiveTab('bends')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'bends' 
              ? 'bg-rashmi-red text-white' 
              : 'bg-muted/50 hover:bg-muted text-foreground'
          }`}
        >
          Bends
        </button>
      </motion.div>

      {/* Table Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-x-auto"
      >
        {data[activeTab] && data[activeTab]!.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <table className="w-full border-collapse text-sm hidden md:table">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {getHeaders().map((header, index) => (
                    <th 
                      key={index}
                      className="px-4 py-3 text-left font-medium text-foreground"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data[activeTab]!.map((row, rowIndex) => (
                  <motion.tr 
                    key={rowIndex}
                    onMouseEnter={() => setHoveredRow(rowIndex)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`border-b border-border transition-colors ${
                      hoveredRow === rowIndex ? 'bg-muted/70' : 'hover:bg-muted/50'
                    }`}
                  >
                    {Object.entries(row).map(([key, value], colIndex) => {
                      // For special columns that should have visual indicators
                      const isNumericCol = typeof value === 'number';
                      const isSpecialVisualCol = isNumericCol && 
                        (key.includes('weight') || key.includes('diameter') || 
                         key.includes('outside_diameter'));
                      
                      const maxValue = isNumericCol && data[activeTab] 
                        ? getMaxValue(data[activeTab]!, key) 
                        : 1;
                      
                      return (
                        <td 
                          key={`${rowIndex}-${colIndex}`}
                          className="px-4 py-3 text-muted-foreground"
                        >
                          {isSpecialVisualCol ? (
                            <div className="flex items-center gap-2">
                              <span className={hoveredRow === rowIndex ? 'font-medium text-foreground' : ''}>
                                {value}
                              </span>
                              <div 
                                className="h-2 bg-rashmi-red/30 rounded-full transition-all"
                                style={{ 
                                  width: `${Math.max(20, (Number(value) / maxValue) * 80)}px`,
                                  opacity: hoveredRow === rowIndex ? 0.8 : 0.4
                                }}
                              />
                            </div>
                          ) : (
                            <span className={hoveredRow === rowIndex ? 'font-medium text-foreground' : ''}>
                              {value || '-'}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {data[activeTab]!.map((row, rowIndex) => (
                <motion.div
                  key={rowIndex}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border rounded-lg p-4 space-y-3"
                >
                  {Object.entries(row).map(([key, value], colIndex) => {
                    const header = key.replace(/_/g, ' ');
                    const formattedHeader = header.charAt(0).toUpperCase() + header.slice(1);
                    
                    const isNumericCol = typeof value === 'number';
                    const isSpecialVisualCol = isNumericCol && 
                      (key.includes('weight') || key.includes('diameter') || 
                       key.includes('outside_diameter'));
                    
                    return (
                      <div key={`mobile-${rowIndex}-${colIndex}`} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{formattedHeader}:</span>
                        {isSpecialVisualCol ? (
                          <span className="font-medium text-rashmi-red">{value}</span>
                        ) : (
                          <span className="font-medium">{value || '-'}</span>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center p-8 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No data available for this category</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InteractiveSpecTable;
