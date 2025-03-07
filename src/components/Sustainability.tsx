
import React, { useState, useEffect } from 'react';
import RevealText from './ui/RevealText';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Leaf, Droplets, Wind, XCircle, BarChartIcon, PieChartIcon, LineChartIcon } from 'lucide-react';

const emissionsData = [
  { year: '2018', value: 100 },
  { year: '2019', value: 85 },
  { year: '2020', value: 70 },
  { year: '2021', value: 55 },
  { year: '2022', value: 45 },
  { year: '2023', value: 35 },
];

const energySourceData = [
  { name: 'Solar', value: 35 },
  { name: 'Wind', value: 25 },
  { name: 'Hydroelectric', value: 15 },
  { name: 'Biomass', value: 10 },
  { name: 'Traditional', value: 15 },
];

const waterUsageData = [
  { month: 'Jan', recycled: 40, fresh: 60 },
  { month: 'Mar', recycled: 45, fresh: 55 },
  { month: 'May', recycled: 55, fresh: 45 },
  { month: 'Jul', recycled: 65, fresh: 35 },
  { month: 'Sep', recycled: 70, fresh: 30 },
  { month: 'Nov', recycled: 75, fresh: 25 },
];

const COLORS = ['#22c55e', '#3b82f6', '#6366f1', '#f59e0b', '#64748b'];

const chartTypes = ['emissions', 'energy', 'water'] as const;
type ChartType = typeof chartTypes[number];

const Sustainability = () => {
  const [activeChart, setActiveChart] = useState<ChartType>('emissions');
  const [isInView, setIsInView] = useState(false);
  const [animateChart, setAnimateChart] = useState(false);
  const [animatedWaterData, setAnimatedWaterData] = useState(
    waterUsageData.map(item => ({ ...item, animatedRecycled: 0, animatedFresh: 0 }))
  );
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          setTimeout(() => setAnimateChart(true), 500);
        }
      },
      { threshold: 0.3 }
    );
    
    const section = document.getElementById('sustainability');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Animate water data when chart becomes visible
  useEffect(() => {
    if (animateChart && activeChart === 'water') {
      // Reset animation data
      setAnimatedWaterData(
        waterUsageData.map(item => ({ ...item, animatedRecycled: 0, animatedFresh: 0 }))
      );
      
      // Animate the water filling effect
      const animationDuration = 1500; // 1.5 seconds
      const steps = 20; // Number of animation steps
      const stepDuration = animationDuration / steps;
      
      let step = 0;
      
      const animateStep = () => {
        if (step < steps) {
          setAnimatedWaterData(prev => 
            prev.map((item, idx) => {
              const progress = (step + 1) / steps;
              return {
                ...item,
                animatedRecycled: Math.round(item.recycled * progress),
                animatedFresh: Math.round(item.fresh * progress)
              };
            })
          );
          
          step++;
          setTimeout(animateStep, stepDuration);
        }
      };
      
      // Start animation
      animateStep();
    }
  }, [animateChart, activeChart]);

  // Custom tooltip content for better dark mode visibility
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background border border-border p-4 rounded shadow-md">
          <p className="text-rashmi-red font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-foreground">
              {entry.name}: {entry.value}{entry.unit || '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Format percentage values without decimals
  const formatPercentage = (value: number) => `${Math.round(value)}%`;

  // Axis tick formatter for better visibility
  const axisTickFormatter = (value: any) => value.toString();

  return (
    <section id="sustainability" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-rashmi-red/5 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-green-500/5 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-rashmi-red font-medium mb-3">
            <RevealText text="Sustainability" />
          </div>
          <RevealText
            text="Our Commitment to the Environment"
            as="h2"
            className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground"
          />
          <p className="text-muted-foreground">
            At Rashmi Metaliks, sustainability is not just a goal but a commitment. We continuously 
            strive to reduce our environmental footprint while maintaining the highest quality standards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <SustainabilityCard 
            icon={<Leaf className="h-6 w-6" />}
            title="Environmental Protection"
            description="Our advanced filtration systems minimize emissions and promote cleaner production processes."
            isInView={isInView}
            delay={0}
          />
          <SustainabilityCard 
            icon={<Droplets className="h-6 w-6" />}
            title="Water Conservation"
            description="We've implemented water recycling systems that have reduced our fresh water consumption by 65%."
            isInView={isInView}
            delay={0.2}
          />
          <SustainabilityCard 
            icon={<Wind className="h-6 w-6" />}
            title="Renewable Energy"
            description="Our facilities increasingly rely on renewable energy sources, including our own 300MW power plant."
            isInView={isInView}
            delay={0.4}
          />
        </div>
        
        {/* Interactive Charts */}
        <div className="bg-card/30 border border-border/40 rounded-xl p-6 md:p-8">
          <div className="flex flex-wrap gap-4 mb-8">
            <ChartButton 
              icon={<LineChartIcon size={18} />}
              label="Emissions Reduction"
              active={activeChart === 'emissions'}
              onClick={() => setActiveChart('emissions')}
            />
            <ChartButton 
              icon={<PieChartIcon size={18} />}
              label="Energy Sources"
              active={activeChart === 'energy'}
              onClick={() => setActiveChart('energy')}
            />
            <ChartButton 
              icon={<BarChartIcon size={18} />}
              label="Water Usage"
              active={activeChart === 'water'}
              onClick={() => setActiveChart('water')}
            />
          </div>
          
          <div className="h-[400px] w-full">
            {activeChart === 'emissions' && (
              <div className={`transition-opacity duration-700 h-full ${animateChart ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="text-xl md:text-2xl font-semibold text-center mb-4">CO₂ Emissions Reduction (2018-2023)</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart
                    data={emissionsData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                    <XAxis 
                      dataKey="year" 
                      stroke="var(--foreground)" 
                      tick={{ fill: 'var(--foreground)' }}
                      tickFormatter={axisTickFormatter}
                    />
                    <YAxis 
                      stroke="var(--foreground)" 
                      tick={{ fill: 'var(--foreground)' }}
                      tickFormatter={value => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#E7251F" 
                      strokeWidth={3}
                      name="CO₂ Emissions"
                      unit="%"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            
            {activeChart === 'energy' && (
              <div className={`transition-opacity duration-700 h-full ${animateChart ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="text-xl md:text-2xl font-semibold text-center mb-4">Energy Sources Distribution</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie
                      data={energySourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {energySourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      formatter={(value, entry, index) => (
                        <span className="text-foreground">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            
            {activeChart === 'water' && (
              <div className={`transition-opacity duration-700 h-full ${animateChart ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="text-xl md:text-2xl font-semibold text-center mb-4">Water Usage Efficiency (Recycled vs Fresh)</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    data={animatedWaterData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                    stackOffset="expand"
                    barSize={40}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      stroke="var(--foreground)" 
                      tick={{ fill: 'var(--foreground)' }}
                      tickFormatter={axisTickFormatter}
                    />
                    <YAxis 
                      stroke="var(--foreground)" 
                      tick={{ fill: 'var(--foreground)' }}
                      tickFormatter={formatPercentage}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      content={<CustomTooltip />}
                      formatter={(value) => [`${value}%`, '']}
                    />
                    <Legend
                      formatter={(value, entry, index) => (
                        <span className="text-foreground">{value}</span>
                      )}
                    />
                    <Bar 
                      dataKey="animatedRecycled" 
                      name="Recycled Water" 
                      stackId="a" 
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    >
                      {animatedWaterData.map((entry, index) => (
                        <text 
                          key={`text-${index}`} 
                          x={0} 
                          y={0} 
                          className="text-white font-medium"
                          textAnchor="middle" 
                          dominantBaseline="middle"
                        >
                          {Math.round(entry.animatedRecycled)}%
                        </text>
                      ))}
                    </Bar>
                    <Bar 
                      dataKey="animatedFresh" 
                      name="Fresh Water" 
                      stackId="a" 
                      fill="#64748b"
                      radius={[4, 4, 0, 0]}
                    >
                      {animatedWaterData.map((entry, index) => (
                        <text 
                          key={`text-${index}`} 
                          x={0} 
                          y={0} 
                          className="text-white font-medium"
                          textAnchor="middle" 
                          dominantBaseline="middle"
                        >
                          {Math.round(entry.animatedFresh)}%
                        </text>
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add custom CSS for animations and effects - Fix the JSX style issue */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Custom chart tooltip styles for dark mode */
        .recharts-tooltip-cursor {
          stroke: var(--foreground) !important;
        }
        
        .recharts-cartesian-axis-tick-value {
          fill: var(--foreground) !important;
        }
        
        .recharts-text {
          fill: var(--foreground) !important;
        }
        
        /* Water animation effect */
        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .water-effect {
          position: relative;
          overflow: hidden;
        }
        
        .water-effect::after {
          content: '';
          position: absolute;
          top: -10px;
          left: 0;
          width: 200%;
          height: 10px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: wave 3s linear infinite;
        }
      `
      }} />
    </section>
  );
};

interface SustainabilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isInView: boolean;
  delay: number;
}

const SustainabilityCard: React.FC<SustainabilityCardProps> = ({ icon, title, description, isInView, delay }) => {
  return (
    <motion.div 
      className="p-6 bg-card/30 border border-border/40 rounded-xl transition-all duration-1000"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
        backgroundColor: "hsl(var(--card))"
      }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-4 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

interface ChartButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const ChartButton: React.FC<ChartButtonProps> = ({ icon, label, active, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
        active 
          ? 'bg-rashmi-red text-white' 
          : 'bg-muted/50 text-muted-foreground hover:bg-muted'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <span>{label}</span>
      {active && <XCircle size={16} className="ml-2" />}
    </motion.button>
  );
};

// Add the motion import at the top
import { motion } from 'framer-motion';

export default Sustainability;
