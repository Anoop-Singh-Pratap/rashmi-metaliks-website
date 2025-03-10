
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, Flask, Droplets, Gauge, Ruler, Wrench, CheckCircle, FlaskConical } from 'lucide-react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

const DIPipesManufacturing: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('casting');

  const processSteps: ProcessStep[] = [
    {
      id: 'casting',
      title: 'Casting Process',
      description: 'Refined liquid iron directly from the blast furnace.',
      icon: <Factory size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?q=80&w=1830&auto=format&fit=crop'
    },
    {
      id: 'material',
      title: 'Selection of Material',
      description: 'If the molten iron composition deviates from established standards, it is rectified by introducing alloy and other elements.',
      icon: <Flask size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1619468129361-605ebea04b44?q=80&w=1471&auto=format&fit=crop'
    },
    {
      id: 'composition',
      title: 'Composition Adjustment',
      description: 'A small quantity of pure magnesium is introduced into the molten iron to foster the development of a spheroidal graphite microstructure.',
      icon: <FlaskConical size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1607292798740-d83337f37a5a?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: 'centrifugal',
      title: 'Centrifugal Casting',
      description: 'Pipes are formed using centrifugal casting method.',
      icon: <Gauge size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1523293915678-d126868e96f1?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: 'annealing',
      title: 'Annealing',
      description: 'The heat treatment process is employed to enhance the mechanical properties of the pipes.',
      icon: <Gauge size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1511406234910-cdd9d0ac72f7?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 'hydrostatic',
      title: 'Hydrostatic Pressure Testing',
      description: 'To perform the leak test, hydrostatic pressure is applied internally and is steadily maintained for 10 seconds.',
      icon: <Droplets size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1495813376747-5953f2919a9d?q=80&w=1482&auto=format&fit=crop'
    },
    {
      id: 'cement',
      title: 'Cement Mortar Lining',
      description: 'The lining thickness is 3 mm for DN 80 – DN 300, 5 mm for DN 350 – DN 600 and 6 mm for DN 700 – DN 1200 pipes.',
      icon: <Ruler size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1517911041030-4e11cc8dfe7c?q=80&w=1334&auto=format&fit=crop'
    },
    {
      id: 'cutting',
      title: 'Cutting and Grinding',
      description: 'Pipes are subjected to spigot end cutting and grinding to attain the required end chamfer. (Applicable for sampling)',
      icon: <Wrench size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1531005952166-ae772f42aed5?q=80&w=1475&auto=format&fit=crop'
    },
    {
      id: 'zinc',
      title: 'Zinc Coating',
      description: 'Zinc coating, due to the galvanizing effect, increases the corrosion resistance of the pipe.',
      icon: <Droplets size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1595078475395-746f1bda6aca?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: 'bituminous',
      title: 'Bituminous Coating',
      description: 'Bituminous paint is applied uniformly by a spraying machine. The mean thickness of the coating is 70 μm.',
      icon: <Droplets size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1635048424329-5b66ff6b662b?q=80&w=1630&auto=format&fit=crop'
    },
    {
      id: 'quality',
      title: 'Quality Testing',
      description: 'The pipes are rigorously tested on all predefined parameters to ensure the highest quality standards.',
      icon: <CheckCircle size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1598978554684-31ee6ae1e522?q=80&w=1470&auto=format&fit=crop'
    },
    {
      id: 'storage',
      title: 'Storage',
      description: 'The quality-approved pipes are stacked in a controlled environment and marked for transportation',
      icon: <Factory size={24} />,
      imageUrl: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=1402&auto=format&fit=crop'
    }
  ];
  
  const findStep = (id: string) => processSteps.find(step => step.id === id) || processSteps[0];
  
  const activeStepInfo = findStep(activeStep);

  return (
    <section id="manufacturing-process" className="py-20 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Manufacturing <span className="text-rashmi-red">Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our state-of-the-art manufacturing process ensures the highest quality 
            Ductile Iron Pipes that meet international standards
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-background rounded-xl p-4 shadow-sm">
              <h3 className="text-xl font-bold mb-4 px-2">Production Stages</h3>
              <div className="space-y-1">
                {processSteps.map((step) => (
                  <motion.button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full text-left p-3 rounded-lg flex items-center transition-all ${
                      activeStep === step.id 
                        ? 'bg-rashmi-red text-white' 
                        : 'hover:bg-muted'
                    }`}
                    whileHover={{ x: activeStep === step.id ? 0 : 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`mr-3 ${activeStep === step.id ? 'text-white' : 'text-rashmi-red'}`}>
                      {step.icon}
                    </div>
                    <span className="font-medium">{step.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-background rounded-xl overflow-hidden shadow-sm"
            >
              <div className="relative aspect-[16/9]">
                <img 
                  src={activeStepInfo.imageUrl} 
                  alt={activeStepInfo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rashmi-dark/90 to-transparent flex items-end">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-rashmi-red flex items-center justify-center">
                        {activeStepInfo.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{activeStepInfo.title}</h3>
                    </div>
                    <p className="text-white/90">{activeStepInfo.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Technical specifications could go here */}
                  <div className="bg-muted/40 p-3 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Temperature</div>
                    <div className="font-bold">1500°C</div>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Pressure</div>
                    <div className="font-bold">3.5 bar</div>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-bold">45 min</div>
                  </div>
                  <div className="bg-muted/40 p-3 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Precision</div>
                    <div className="font-bold">±0.1mm</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DIPipesManufacturing;
