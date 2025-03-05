
import React, { useState } from 'react';
import RevealText from './ui/RevealText';
import ProductViewer from './ui/ProductViewer';

const products = [
  {
    id: 1,
    name: 'Ductile Iron Pipes',
    description: 'Premium quality DI pipes with excellent corrosion resistance and mechanical properties.',
    specs: ['Diameter: 80mm-1000mm', 'Class: K7, K8, K9, K10', 'Length: 5.5m, 6m'],
  },
  {
    id: 2,
    name: 'TMT Bars',
    description: 'High-strength TMT bars with superior ductility and bendability for construction needs.',
    specs: ['Diameter: 8mm-32mm', 'Grade: Fe 500, Fe 550, Fe 600', 'Length: 12m'],
  },
  {
    id: 3,
    name: 'Wire Rods',
    description: 'Wire rods for various industrial applications with precise dimensions and properties.',
    specs: ['Diameter: 5.5mm-12mm', 'Grade: SAE 1008-1010', 'Carbon: 0.06-0.12%'],
  },
  {
    id: 4,
    name: 'Pig Iron',
    description: 'High-grade foundry-grade pig iron with controlled silicon and manganese content.',
    specs: ['Carbon: 3.8-4.2%', 'Silicon: 1.8-2.2%', 'Manganese: 0.5-0.8%'],
  },
];

const Products: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleProductChange = (product: typeof products[0]) => {
    if (product.id === activeProduct.id) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProduct(product);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section id="products" className="bg-secondary py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-rashmi-red/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-rashmi-red/5 blur-3xl"></div>
      
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 border border-rashmi-red/30 rounded-full bg-background/50 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-rashmi-red">Our Premium Offerings</span>
          </div>
          
          <RevealText
            text="Industry-Leading Steel Products"
            as="h2"
            className="section-title mx-auto"
            staggerDelay={0.03}
          />
          
          <RevealText
            text="Precision-engineered steel products meeting global quality standards"
            as="p"
            className="section-subtitle mx-auto"
            staggerDelay={0.01}
            initialDelay={0.3}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left - Product Selector */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductChange(product)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 magnetic-hover border ${
                    activeProduct.id === product.id
                      ? 'bg-gradient-to-r from-rashmi-red/10 to-transparent border-rashmi-red/20'
                      : 'glass-card hover:border-rashmi-red/20'
                  }`}
                >
                  <h3 className={`text-xl font-display font-medium transition-colors duration-300 ${
                    activeProduct.id === product.id ? 'text-rashmi-red' : 'text-foreground'
                  }`}>
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                </button>
              ))}
            </div>
          </div>
          
          {/* Right - Product Viewer */}
          <div className="w-full lg:w-1/2">
            <div className={`rounded-2xl overflow-hidden transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              <ProductViewer className="mb-8" />
              
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">{activeProduct.name}</h3>
                
                <p className="text-muted-foreground mb-4">{activeProduct.description}</p>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium uppercase text-muted-foreground mb-3">Specifications</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeProduct.specs.map((spec, index) => (
                      <li key={index} className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-rashmi-red rounded-full mr-2"></span>
                        <span className="text-sm text-foreground">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <button className="metal-button py-2 px-6 rounded-md font-medium text-white 
                                    bg-gradient-to-r from-rashmi-red to-rashmi-red/80 border-none
                                    hover:shadow-rashmi-red/20 hover:shadow-lg transition-all duration-300
                                    hover:-translate-y-1 magnetic-hover">
                    Request Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
