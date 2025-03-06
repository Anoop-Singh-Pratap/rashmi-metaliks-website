
import React, { useState, useRef } from 'react';
import RevealText from './ui/RevealText';
import ProductViewer from './ui/ProductViewer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  features: string[];
  image: string;
  link?: string;
}

const productData: Product[] = [
  {
    id: 1,
    name: "Ductile Iron Pipe",
    description: "Premium quality DI Pipes with ISO certification, designed for durability and longevity.",
    features: ["Corrosion resistant", "High tensile strength", "Long service life", "Easy installation"],
    image: "https://images.unsplash.com/photo-1618761299062-ba2dbbcebd92?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/di-pipes"
  },
  {
    id: 2,
    name: "DI Fittings",
    description: "High-quality ductile iron fittings that complement our DI pipe systems for complete water management solutions.",
    features: ["Perfect compatibility", "Same durability", "Diverse joints", "Pressure capable"],
    image: "https://images.unsplash.com/photo-1582655432787-c7b89f741cc4?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/di-fittings"
  },
  {
    id: 3,
    name: "TMT Bars",
    description: "High strength thermo-mechanically treated bars perfect for construction applications.",
    features: ["Earthquake resistant", "High yield strength", "Better ductility", "Optimal bonding"],
    image: "https://plus.unsplash.com/premium_photo-1682092618361-e785db230079?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/tmt-bar"
  },
  {
    id: 4,
    name: "Sponge Iron",
    description: "Highest quality Sponge Iron produced in our Jhargram facility with superior production process.",
    features: ["Precision process", "Superior quality", "Controlled production", "Best-in-class result"],
    image: "https://images.unsplash.com/photo-1620283085634-a10c02034ad5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/sponge-iron"
  },
  {
    id: 5,
    name: "Pig Iron",
    description: "High-grade pig iron for foundries and steel manufacturing with low sulfur and phosphorus content.",
    features: ["Low phosphorus content", "Controlled silicon", "Consistent quality", "Custom specifications"],
    image: "https://images.unsplash.com/photo-1535813547-99c456a42798?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/pig-iron"
  },
  {
    id: 6,
    name: "Iron Ore Pellet",
    description: "First manufacturer of pellets in West Bengal with significant production capacity.",
    features: ["Superior quality", "Corrosion resistant", "Faster reduction", "High metallization"],
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/iron-ore-pellet"
  },
  {
    id: 7,
    name: "Sinter",
    description: "Essential component for blast furnace operations with perfect chemical composition.",
    features: ["Perfect composition", "Blast furnace ready", "Controlled production", "High quality standards"],
    image: "https://images.unsplash.com/photo-1552252220-f85a018c1726?ixlib=rb-4.0.3&auto=format&fit=crop&q=80",
    link: "/sinter"
  },
];

const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const nextProduct = () => {
    setActiveIndex((prev) => (prev + 1) % productData.length);
  };
  
  const prevProduct = () => {
    setActiveIndex((prev) => (prev - 1 + productData.length) % productData.length);
  };

  const activeProduct = productData[activeIndex];

  return (
    <section id="products" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-rashmi-red font-medium mb-3">
            <RevealText text="Our Products" />
          </div>
          <RevealText
            text="Premium Quality Steel Products"
            as="h2"
            className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
          />
          <p className="text-muted-foreground">
            Explore our diverse range of high-quality steel products manufactured with cutting-edge technology 
            and meeting international standards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Product Viewer */}
          <div className="order-2 lg:order-1">
            <ProductViewer 
              className="w-full h-[400px] max-w-lg mx-auto" 
              productName={activeProduct.name} 
            />
          </div>
          
          {/* Product Information */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {productData.map((product, index) => (
                <div
                  key={product.id}
                  ref={(el) => (productRefs.current[index] = el)}
                  className={`transition-all duration-500 ${
                    activeIndex === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8 absolute top-0 left-0 right-0'
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{product.name}</h3>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {product.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center p-3 bg-card/50 rounded-lg border border-border/30"
                      >
                        <div className="w-2 h-2 rounded-full bg-rashmi-red mr-3"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {product.link ? (
                    <Link to={product.link} className="bg-rashmi-red text-white px-6 py-3 rounded-md hover:bg-rashmi-red/90 transition-colors inline-block">
                      Learn More
                    </Link>
                  ) : (
                    <button className="bg-rashmi-red text-white px-6 py-3 rounded-md hover:bg-rashmi-red/90 transition-colors">
                      Get Specifications
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {/* Product Navigation */}
            <div className="flex justify-between items-center mt-12">
              <div className="flex space-x-2">
                {productData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeIndex === index ? 'bg-rashmi-red w-6' : 'bg-muted'
                    }`}
                    aria-label={`View product ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={prevProduct}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:bg-card transition-colors"
                  aria-label="Previous product"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextProduct}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:bg-card transition-colors"
                  aria-label="Next product"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
