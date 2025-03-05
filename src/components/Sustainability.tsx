
import React, { useState, useEffect, useRef } from 'react';
import RevealText from './ui/RevealText';

const metrics = [
  { id: 1, label: 'Carbon Footprint Reduction', value: 45, target: 60, unit: '%', color: 'from-green-500 to-green-300' },
  { id: 2, label: 'Water Recycling', value: 75, target: 90, unit: '%', color: 'from-blue-500 to-blue-300' },
  { id: 3, label: 'Renewable Energy Usage', value: 35, target: 50, unit: '%', color: 'from-yellow-500 to-yellow-300' },
  { id: 4, label: 'Waste Reduction', value: 65, target: 80, unit: '%', color: 'from-purple-500 to-purple-300' },
];

const Sustainability: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const intervals = metrics.map((metric, index) => {
      return setInterval(() => {
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          if (newValues[index] < metric.value) {
            newValues[index] += 1;
          } else {
            clearInterval(intervals[index]);
          }
          return newValues;
        });
      }, 30);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [isInView]);

  return (
    <section id="sustainability" ref={sectionRef} className="bg-background py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-green-500/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl"></div>
      
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 border border-green-500/30 rounded-full bg-secondary/50 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Environmental Responsibility</span>
          </div>
          
          <RevealText
            text="Sustainability at Our Core"
            as="h2"
            className="section-title mx-auto"
            staggerDelay={0.03}
          />
          
          <RevealText
            text="Building a greener future with eco-friendly production processes and responsible resource management"
            as="p"
            className="section-subtitle mx-auto max-w-3xl"
            staggerDelay={0.01}
            initialDelay={0.3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left - Metrics */}
          <div className="glass-card p-8 rounded-xl">
            <h3 className="text-2xl font-display font-semibold mb-8">Our Environmental Impact</h3>
            
            <div className="space-y-8">
              {metrics.map((metric, index) => (
                <div key={metric.id} className="relative">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <span className="text-sm font-semibold">
                      {animatedValues[index]}{metric.unit} of {metric.target}{metric.unit} Target
                    </span>
                  </div>
                  
                  <div className="h-2.5 bg-secondary/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ease-out`}
                      style={{ width: `${(animatedValues[index] / metric.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <button className="metal-button py-2 px-6 rounded-md font-medium text-white 
                              bg-gradient-to-r from-green-600 to-green-500 border-none
                              hover:shadow-green-500/20 hover:shadow-lg transition-all duration-300
                              hover:-translate-y-1 magnetic-hover">
                Download Sustainability Report
              </button>
            </div>
          </div>
          
          {/* Right - Initiatives */}
          <div className="flex flex-col gap-6">
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M20 12a8 8 0 01-8 8m8-8a8 8 0 00-8-8m8 8h4m-4-8v4m0 8v4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">Water Conservation</h3>
                  <p className="text-muted-foreground">
                    Our state-of-the-art water recycling system reduces freshwater consumption by 75% compared to industry standards.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">Renewable Energy</h3>
                  <p className="text-muted-foreground">
                    Our facilities are increasingly powered by renewable energy sources, including solar panels and waste heat recovery systems.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">Circular Economy</h3>
                  <p className="text-muted-foreground">
                    We've implemented a waste management system that recycles production byproducts back into the manufacturing process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
