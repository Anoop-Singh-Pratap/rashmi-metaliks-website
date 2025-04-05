import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  FlaskConical, 
  Droplets, 
  Gauge, 
  Ruler, 
  Wrench, 
  CheckCircle,
  CircleCheck,
  Cog,
  Microscope,
  Warehouse,
  Zap,
  Layers,
  Shield,
  AlertCircle,
  Settings,
  Box,
  Paintbrush,
  Target
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl?: string;
  details: string[];
}

interface ProcessType {
  id: string;
  name: string;
  description: string;
  steps: ProcessStep[];
}

const FittingsManufacturing: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeProcess, setActiveProcess] = useState<string>('vlfp');
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { theme } = useTheme();

  // Cloudinary optimization parameters for different purposes
  const cloudinaryParams = {
    lowQuality: 'f_auto,q_10,e_blur:1000,w_50',
    thumbnail: 'f_auto,q_auto,w_20',
    preview: 'f_auto,q_auto,w_300',
    full: 'f_auto,q_auto'
  };

  // Replace the URL to include optimization parameters
  const getOptimizedUrl = (url: string, quality: keyof typeof cloudinaryParams): string => {
    if (url && url.includes('cloudinary.com')) {
      return url.replace(/f_auto,q_auto/, cloudinaryParams[quality]);
    }
    return url || '';
  };

  const processTypes: ProcessType[] = [
    {
      id: 'vlfp',
      name: 'VLFP PROCESS',
      description: 'The VLFP (Vacuum Lost Foam Process) is an advanced casting technique for producing high-quality DI fittings with complex geometries and excellent surface finish.',
      steps: [
        {
          id: 'di-fitting',
          title: 'DI Fitting',
          description: 'Preparation for Ductile Iron Fitting manufacturing using the VLFP process.',
          icon: <Factory size={24} />,
          details: [
            'Initial preparation of materials',
            'Quality control inspections',
            'Process parameter setup'
          ]
        },
        {
          id: 'eps-expansion',
          title: 'EPS Expansion',
          description: 'Expanded Polystyrene (EPS) beads are expanded using steam to create foam patterns.',
          icon: <Zap size={24} />,
          details: [
            'Precise steam temperature control',
            'Uniform bead expansion for consistent density',
            'Pre-expansion and maturation stages'
          ]
        },
        {
          id: 'segment-making',
          title: 'Segment Making',
          description: 'Creating individual foam segments that will form the complete pattern.',
          icon: <Layers size={24} />,
          details: [
            'Computer-controlled molding',
            'Precise dimensional control',
            'Segment cooling and stabilization'
          ]
        },
        {
          id: 'assembly',
          title: 'Assembly',
          description: 'Assembling foam segments to create the complete pattern for casting.',
          icon: <Settings size={24} />,
          details: [
            'Precise alignment techniques',
            'Hot-melt adhesive application',
            'Final inspection of assembled patterns'
          ]
        },
        {
          id: 'coating-drying',
          title: 'Coating & Drying',
          description: 'Applying refractory coating to the foam pattern and drying thoroughly.',
          icon: <Paintbrush size={24} />,
          details: [
            'Water-based refractory slurry application',
            'Controlled drying environment',
            'Coating thickness verification'
          ]
        },
        {
          id: 'shot-blasting',
          title: 'Shot Blasting',
          description: 'Cleaning and preparing the surface using high-velocity metal shot.',
          icon: <Zap size={24} />,
          details: [
            'Automated shot blasting system',
            'Optimal media selection for surface finish',
            'Dust collection and recycling system'
          ]
        },
        {
          id: 'pouring',
          title: 'Pouring',
          description: 'Pouring molten ductile iron into the prepared mold assembly.',
          icon: <Droplets size={24} />,
          details: [
            'Temperature-controlled metal pouring',
            'Automated pouring systems',
            'Flow rate and fill time optimization'
          ]
        },
        {
          id: 'molding',
          title: 'Molding',
          description: 'Creating sand molds for the casting process.',
          icon: <Layers size={24} />,
          details: [
            'High-pressure molding system',
            'Precision sand mixing and preparation',
            'Mold hardness testing and quality control'
          ]
        },
        {
          id: 'clustering',
          title: 'Clustering',
          description: 'Arranging multiple patterns in a cluster to optimize production efficiency.',
          icon: <Box size={24} />,
          details: [
            'Optimal gating system design',
            'Maximizing yield and metal flow',
            'Thermal analysis for solidification control'
          ]
        },
        {
          id: 'fettling-machining',
          title: 'Fettling & Machining',
          description: 'Removing excess material and machining to final dimensions.',
          icon: <Wrench size={24} />,
          details: [
            'Automated grinding and fettling',
            'CNC machining for critical dimensions',
            'Surface quality inspection'
          ]
        },
        {
          id: 'zinc-coating',
          title: 'Zinc Coating',
          description: 'Applying zinc coating for enhanced corrosion resistance.',
          icon: <Droplets size={24} />,
          details: [
            'Zinc metallization process',
            'Uniform coating thickness control',
            'Adhesion testing and inspection'
          ]
        },
        {
          id: 'hydrostatic-testing',
          title: 'Hydrostatic Testing',
          description: 'Testing fittings under high water pressure to ensure integrity.',
          icon: <Gauge size={24} />,
          details: [
            'Computerized testing system',
            'Pressure holding time verification',
            'Leak detection and mapping'
          ]
        },
        {
          id: 'cement-lining',
          title: 'Cement Lining',
          description: 'Applying cement mortar lining to protect against internal corrosion.',
          icon: <Paintbrush size={24} />,
          details: [
            'Centrifugal cement mortar application',
            'Controlled curing environment',
            'Thickness and smoothness verification'
          ]
        },
        {
          id: 'bitumen-coating',
          title: 'Bitumen Coating',
          description: 'Applying external bitumen coating for additional protection.',
          icon: <Paintbrush size={24} />,
          details: [
            'Automated spray application',
            'Controlled coating thickness',
            'Quick-drying formulation'
          ]
        },
        {
          id: 'packaging-dispatch',
          title: 'Packaging & Dispatch',
          description: 'Final packaging and preparation for shipping to customers.',
          icon: <Warehouse size={24} />,
          details: [
            'Protective packaging materials',
            'Computerized inventory management',
            'Logistics optimization'
          ]
        }
      ]
    },
    {
      id: 'high-pressure',
      name: 'HIGH PRESSURE MOULDING PROCESS',
      description: 'The High Pressure Moulding Process is a traditional method enhanced with modern technology for creating FI fittings with exceptional strength and precision.',
      steps: [
        {
          id: 'pattern-development',
          title: 'Pattern Development',
          description: 'Designing and developing patterns for the casting process.',
          icon: <Target size={24} />,
          details: [
            '3D CAD design and simulation',
            'Pattern shrinkage calculation',
            'Rapid prototype verification'
          ]
        },
        {
          id: 'pattern-machining',
          title: 'Pattern Machining',
          description: 'Precision machining of patterns to exact specifications.',
          icon: <Wrench size={24} />,
          details: [
            'CNC machining centers',
            'Dimensional verification',
            'Surface finish optimization'
          ]
        },
        {
          id: 'pattern-mounting',
          title: 'Pattern Mounting on Match Plate',
          description: 'Mounting patterns on match plates for efficient molding.',
          icon: <Settings size={24} />,
          details: [
            'Precise alignment and positioning',
            'Secure mounting techniques',
            'Match plate verification tests'
          ]
        },
        {
          id: 'molding-core-fixing',
          title: 'Molding & Core Fixing',
          description: 'Creating molds and placing cores for internal cavities.',
          icon: <Layers size={24} />,
          details: [
            'High-pressure automatic molding',
            'Core positioning and fixation',
            'Mold closing and clamping'
          ]
        },
        {
          id: 'shot-blasting-hp',
          title: 'Shot Blasting',
          description: 'Cleaning castings using abrasive material propelled at high velocity.',
          icon: <Zap size={24} />,
          details: [
            'Controlled blast intensity',
            'Multiple stage blasting',
            'Surface profile measurement'
          ]
        },
        {
          id: 'knockout',
          title: 'Knockout',
          description: 'Removing castings from the molds after solidification.',
          icon: <Box size={24} />,
          details: [
            'Automated knockout systems',
            'Vibration separation',
            'Initial casting inspection'
          ]
        },
        {
          id: 'pouring-hp',
          title: 'Pouring',
          description: 'Pouring molten metal into prepared molds.',
          icon: <Droplets size={24} />,
          details: [
            'Temperature-controlled ladles',
            'Automated pouring systems',
            'Inoculation treatment'
          ]
        },
        {
          id: 'molding-hp',
          title: 'Molding',
          description: 'High-pressure molding process for consistent mold quality.',
          icon: <Layers size={24} />,
          details: [
            'Automatic molding machines',
            'Computer-controlled parameters',
            'Mold quality verification'
          ]
        },
        {
          id: 'fettling-machining-hp',
          title: 'Fettling & Machining',
          description: 'Removing excess material and precision machining operations.',
          icon: <Wrench size={24} />,
          details: [
            'Automated cutting and grinding',
            'CNC machining cells',
            'Dimensional verification'
          ]
        },
        {
          id: 'hydrotesting-post',
          title: 'Hydrotesting Post',
          description: 'Pressure testing to ensure structural integrity and leak-free operation.',
          icon: <Gauge size={24} />,
          details: [
            'Automated testing systems',
            'Digital pressure recording',
            'Statistical quality control'
          ]
        },
        {
          id: 'zinc-coating-hp',
          title: 'Zinc Coating',
          description: 'Applying zinc coating for corrosion resistance.',
          icon: <Droplets size={24} />,
          details: [
            'Automated coating application',
            'Thickness measurement',
            'Adhesion testing'
          ]
        },
        {
          id: 'cement-lining-hp',
          title: 'Cement Lining',
          description: 'Internal cement lining application for protection and flow improvement.',
          icon: <Paintbrush size={24} />,
          details: [
            'Centrifugal lining application',
            'Thickness control system',
            'Curing chamber processing'
          ]
        },
        {
          id: 'bitumen-coating-hp',
          title: 'Bitumen Coating',
          description: 'External bitumen coating application for additional protection.',
          icon: <Paintbrush size={24} />,
          details: [
            'Automated spray system',
            'Temperature-controlled application',
            'Coating inspection'
          ]
        },
        {
          id: 'shot-blasting-final',
          title: 'Shot Blasting',
          description: 'Final surface preparation before epoxy coating application.',
          icon: <Zap size={24} />,
          details: [
            'Surface profile creation',
            'Contamination removal',
            'Quality inspection'
          ]
        },
        {
          id: 'epoxy-coating',
          title: 'Fusion-Bonded Epoxy Coating',
          description: 'Applying high-performance epoxy coating for superior protection.',
          icon: <Paintbrush size={24} />,
          details: [
            'Electrostatic powder application',
            'Controlled curing cycle',
            'Coating thickness verification'
          ]
        },
        {
          id: 'packaging-dispatch-hp',
          title: 'Packaging & Dispatch',
          description: 'Final inspection, packaging, and shipment preparation.',
          icon: <Warehouse size={24} />,
          details: [
            'Quality certification',
            'Secure packaging for transport',
            'Shipment tracking systems'
          ]
        }
      ]
    }
  ];

  // Auto-advance steps at intervals
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSteps = getCurrentSteps();
      setActiveStep((prev) => (prev + 1) % currentSteps.length);
    }, 8000); // 8 second interval between steps
    
    return () => clearTimeout(timer);
  }, [activeStep, activeProcess]);

  // Preload the next image to avoid flickering
  useEffect(() => {
    const currentSteps = getCurrentSteps();
    const nextIndex = (activeStep + 1) % currentSteps.length;
    
    if (!loadedImages.has(nextIndex) && currentSteps[nextIndex].imageUrl) {
      const img = new Image();
      img.src = getOptimizedUrl(currentSteps[nextIndex].imageUrl!, 'full');
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(nextIndex));
      };
    }
  }, [activeStep, activeProcess, loadedImages]);

  const getCurrentProcess = () => {
    return processTypes.find(p => p.id === activeProcess) || processTypes[0];
  };

  const getCurrentSteps = () => {
    return getCurrentProcess().steps;
  };

  return (
    <section id="manufacturing-process" className="py-16 relative bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
          >
            Manufacturing <span className="text-rashmi-red">Process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Our DI Fittings are manufactured using state-of-the-art processes
          </motion.p>
        </div>
        
        {/* Process Types */}
        <div className="flex justify-center mb-12 gap-4 flex-wrap">
          {processTypes.map((process) => (
            <motion.button
              key={process.id}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 text-sm md:text-base
                ${activeProcess === process.id 
                  ? 'bg-rashmi-red text-white shadow-md' 
                  : 'bg-muted hover:bg-muted/80 text-foreground'}`}
              onClick={() => {
                setActiveProcess(process.id);
                setActiveStep(0);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {process.name}
            </motion.button>
          ))}
        </div>
        
        <div className="flex flex-col-reverse lg:flex-row gap-8 md:gap-12 items-center">
          {/* Process Steps */}
          <motion.div 
            className="w-full lg:w-5/12 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={activeProcess}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground mb-6 text-sm md:text-base"
            >
              {getCurrentProcess().description}
            </motion.p>
            
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rashmi-red/20 scrollbar-track-muted/30">
              {getCurrentSteps().map((step, index) => (
                <motion.button
                  key={step.id}
                  className={`w-full text-left p-4 rounded-lg flex items-start gap-3 transition-all duration-300 border 
                    ${activeStep === index 
                      ? 'bg-card border-rashmi-red/20 shadow-sm' 
                      : 'bg-card/50 border-border hover:border-rashmi-red/10 hover:bg-card'}`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
                    ${activeStep === index ? 'bg-rashmi-red text-white' : 'bg-muted text-foreground'}`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className={`font-medium text-base md:text-lg transition-colors ${activeStep === index ? 'text-rashmi-red' : 'text-foreground'}`}>{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Process Visualization */}
          <motion.div 
            className="w-full lg:w-7/12 rounded-xl overflow-hidden shadow-lg relative min-h-[300px] md:min-h-[400px] border border-border bg-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={getCurrentSteps()[activeStep].id}
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Image or Illustration */}
                <div className="relative flex-1 flex items-center justify-center bg-muted/30">
                  {getCurrentSteps()[activeStep].imageUrl ? (
                    // Display actual image if available
                    <>
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-card"
                        style={{
                          backgroundImage: `url('/lovable-uploads/di-fitting-manufacturing.jpg')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          opacity: 0.1
                        }}
                      />
                      <img 
                        src="/lovable-uploads/di-fitting-manufacturing.jpg"
                        alt={getCurrentSteps()[activeStep].title}
                        className="object-cover h-full w-full opacity-90"
                        onLoad={() => setIsImageLoaded(true)}
                      />
                    </>
                  ) : (
                    // Fallback visualization
                    <div className="text-6xl text-rashmi-red/30 flex items-center justify-center w-full h-full">
                      <div className="relative">
                        {getCurrentSteps()[activeStep].icon}
                        <div className="absolute inset-0 blur-3xl opacity-20 bg-rashmi-red rounded-full transform scale-150"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Details */}
                <div className="bg-card text-foreground p-6 border-t border-border">
                  <h3 className="text-xl font-bold mb-2">
                    <span className="text-rashmi-red mr-2">{(activeStep + 1).toString().padStart(2, '0')}</span>
                    {getCurrentSteps()[activeStep].title}
                  </h3>
                  
                  <motion.div 
                    className="mt-4 space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {getCurrentSteps()[activeStep].details.map((detail, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
                      >
                        <CheckCircle className="text-rashmi-red/80 flex-shrink-0 mt-1" size={16} />
                        <span className="text-muted-foreground text-sm">{detail}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FittingsManufacturing; 