
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import RevealText from './ui/RevealText';
import { Award, Globe, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-xl">
            <div className="text-rashmi-red font-medium mb-3">
              <RevealText text="About Rashmi Group" />
            </div>
            <RevealText
              text="Global Leadership in Metallurgy"
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-foreground"
            />
            
            <div className="space-y-4 text-muted-foreground">
              <p className="animate-fade-in">
                Rashmi Group is one of the fastest growing Business Conglomerates in the eastern region of India, 
                pioneer in manufacturing of integrated Iron & Steel Products, Cement, Power and Ferro Alloys & Mining.
              </p>
              <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Today, Rashmi Metaliks stands as the largest manufacturer of DI Pipes & Fittings in India and holds the 
                second position globally, with an annual production capacity of 7,70,000 Metric Tonnes of DI Pipes & 
                26,000 Metric Tonnes of DI Fittings.
              </p>
              <p className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Our State-Of-The-Art Integrated Steel manufacturing facility produces Pellet, Sinter, Pig Iron, 
                Sponge Iron, Ductile Iron Pipe, Billet, TMT & Wire Rod, along with 1.0 MTPA of Cement 
                manufacturing facility and 300 MW of Captive Power Generation Plant.
              </p>
            </div>
            
            {/* Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <Achievement 
                icon={<Award />}
                title="Global Certified"
                description="ISO 9001:2008, ISO 14001:2004, OHSAS18001"
                delay={0.6}
              />
              <Achievement 
                icon={<Globe />}
                title="#2 Worldwide"
                description="In DI Pipe Manufacturing"
                delay={0.7}
              />
              <Achievement 
                icon={<Zap />}
                title="62% CAGR"
                description="Industry-Leading Growth"
                delay={0.8}
              />
            </div>
            
            {/* Learn More Link */}
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link 
                to="/about-rashmi" 
                className="inline-flex items-center group text-rashmi-red hover:text-rashmi-red/80 font-medium transition-colors"
              >
                Learn more about Rashmi Group
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
          
          {/* Right Column - Image */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-rashmi-red/20 to-rashmi-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1495170420372-1063986a9a8a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
              alt="Rashmi Group Factory" 
              className="w-full h-full object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-md p-4 rounded-xl z-20">
              <h3 className="text-xl font-semibold">Rashmi Group Factory</h3>
              <p className="text-sm text-muted-foreground">State-of-the-art manufacturing facility in West Bengal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface AchievementProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Achievement: React.FC<AchievementProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="flex flex-col items-center text-center p-4 rounded-lg border border-border/40 bg-card/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-rashmi-red/10 text-rashmi-red mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default About;
