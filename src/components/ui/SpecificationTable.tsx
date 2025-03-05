
import React from 'react';
import { motion } from 'framer-motion';

interface TableRow {
  [key: string]: string | number;
}

interface SpecificationTableProps {
  headers: string[];
  rows: TableRow[];
  className?: string;
}

const SpecificationTable: React.FC<SpecificationTableProps> = ({
  headers,
  rows,
  className = '',
}) => {
  return (
    <motion.div 
      className={`overflow-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted">
            {headers.map((header, index) => (
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
          {rows.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className="border-b border-border hover:bg-muted/50 transition-colors"
            >
              {headers.map((header, colIndex) => {
                const key = header.toLowerCase().replace(/\s+/g, '_');
                return (
                  <td 
                    key={colIndex}
                    className="px-4 py-3 text-muted-foreground"
                  >
                    {row[key] || row[header] || '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default SpecificationTable;
