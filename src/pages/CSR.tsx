import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { TreePine, Sun, Droplets, HeartPulse, Users, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RevealText from '../components/ui/RevealText';
import ImageSwiper from '../components/ImageSwiper';
import '../styles/swiper.css';

// Inspired by index.html typography and animation system
const StatBox = ({ value, label, index = 0 }: { value: string, label: string, index?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }}
    className="bg-background/90 backdrop-blur-sm border border-border p-6 rounded-[1.5rem] text-center hover:border-rashmi-red/50 transition-all duration-500"
  >
    <motion.div 
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
      className="text-3xl md:text-4xl font-bold text-rashmi-red mb-2"
    >
      {value}
    </motion.div>
    <div className="text-sm md:text-base text-muted-foreground">{label}</div>
  </motion.div>
);

// Enhanced grid-based card component inspired by index3.html
const CSRCard = ({ icon, title, image, stats, children, index = 0 }: { 
  icon: React.ReactNode,
  title: string,
  image: string,
  stats: string,
  children: React.ReactNode,
  index?: number
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    whileHover={{ 
      y: -10,
      transition: { duration: 0.3 }
    }}
    className="m-card -radius -shadow -hasIcon bg-background border border-border rounded-[1.5rem] overflow-hidden hover:shadow-xl transition-all duration-500 group"
  >
    <div className="m-card__image relative h-56 md:h-64 overflow-hidden">
      <motion.img 
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.7, ease: "easeOut" }
        }}
      />
      <motion.div 
        initial={{ opacity: 0.9 }}
        whileHover={{ opacity: 1 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-rashmi-dark via-rashmi-dark/80 to-transparent p-4"
      >
        <div className="m-card__meta flex items-center gap-4">
          <motion.div 
            whileHover={{ 
              rotate: 5,
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
            className="p-3 bg-card/80 backdrop-blur-sm rounded-lg border border-white/10"
          >
            {icon}
          </motion.div>
          <div>
            <h3 className="m-card__title text-xl font-bold text-white">{title}</h3>
            <p className="tx-ps text-rashmi-red font-medium">{stats}</p>
          </div>
        </div>
      </motion.div>
    </div>
    <div className="m-card__content p-6 md:p-8">
      <p className="m-textContent text-muted-foreground group-hover:text-foreground transition-colors duration-300">{children}</p>
      
      <a href="#" className="a-link flex items-center mt-4 text-rashmi-red gap-2 group/link">
        <span>Learn More</span>
        <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
      </a>
    </div>
  </motion.div>
);

// Implementation based on index.html animation system
const CSR = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const isHeroInView = useInView(heroRef);
  const heroControls = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Advanced parallax effects from index.html
  const heroImageY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    if (isHeroInView) {
      heroControls.start({ opacity: 1, y: 0 });
    }
  }, [isHeroInView, heroControls]);

  // Preload hero image with proper loading state
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1466611653911-95081537e5b7";
    img.onload = () => setIsLoaded(true);
    
    // Add smooth scroll behavior for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className={`min-h-screen bg-background transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Helmet>
        <title>Corporate Social Responsibility | Rashmi Group</title>
        <meta name="description" content="Discover Rashmi Group's commitment to environmental sustainability, employee welfare, and community development through comprehensive CSR initiatives." />
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientFlow 8s ease infinite;
          }
          
          /* Geometric pattern background effect */
          .geometric-pattern {
            background-image: radial-gradient(rgba(235, 89, 81, 0.1) 2px, transparent 2px), 
                              radial-gradient(rgba(235, 89, 81, 0.07) 2px, transparent 2px);
            background-size: 40px 40px;
            background-position: 0 0, 20px 20px;
          }
          
          /* Animated gradient border */
          .gradient-border {
            position: relative;
          }
          .gradient-border::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(235, 89, 81, 0.7), transparent);
          }
          
          /* Parallax layers for depth */
          .parallax-layer-1 {
            will-change: transform;
            transform: translateZ(-10px) scale(2);
          }
          .parallax-layer-2 {
            will-change: transform;
            transform: translateZ(-5px) scale(1.5);
          }
          
          /* Smooth scroll effect */
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </Helmet>

      <Header />

      {/* Hero Section with improved parallax inspired by index3.html */}
      <section 
        ref={heroRef} 
        className="o-hero relative pt-28 md:pt-36 pb-24 min-h-screen flex items-center overflow-hidden perspective-1000"
      >
        {/* Background shapes for visual interest */}
        <div className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-rashmi-red/3 blur-3xl geometric-pattern z-0"></div>
        <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] rounded-full bg-rashmi-red/3 blur-3xl geometric-pattern z-0"></div>
        
        <motion.div 
          className="o-hero__container absolute inset-0 z-0 bg-gradient-to-b from-rashmi-dark/95 via-rashmi-dark/80 to-background/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img 
            ref={heroImageRef}
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7" 
            alt="CSR background"
            className="w-full h-full object-cover"
            loading="eager"
            style={{ 
              opacity: heroOpacity,
              y: heroImageY,
              filter: "brightness(0.55) saturate(1.2)"
            }}
          />
          {/* Overlay pattern with improved blending modes */}
          <div className="absolute inset-0 bg-gradient-to-r from-rashmi-dark/30 via-transparent to-rashmi-dark/30 mix-blend-overlay"></div>
          <div className="absolute inset-0 geometric-pattern opacity-10"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={heroControls}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="m-title max-w-4xl mx-auto text-center"
            style={{ y: textY }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-4 overflow-hidden inline-block"
            >
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="tx-xs bg-rashmi-red px-4 py-1 rounded-full mb-6"
              >
                <span className="text-white font-medium uppercase tracking-wider">Corporate Social Responsibility</span>
              </motion.div>
            </motion.div>
          
            <div className="mb-4">
              <RevealText
                text="Creating Positive Impact"
                as="h1"
                className="a-title tx-xxl text-4xl md:text-6xl lg:text-7xl font-display font-bold"
                staggerDelay={0.08}
              />
            </div>
            <div className="w-24 h-1 bg-rashmi-red mx-auto my-6 rounded-full animate-gradient" 
              style={{ backgroundImage: 'linear-gradient(90deg, #E53935, #FF5252, #E53935)' }}></div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="m-textContent text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto"
            >
              At Rashmi Group, CSR is embedded in our DNA. We're committed to sustainable growth 
              through environmental stewardship and community empowerment.
            </motion.p>
            
            {/* Action button with improved animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <a 
                href="#environmental-section" 
                className="a-button -tertiary inline-flex items-center gap-2 bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-3 rounded-full transition-all duration-300 font-medium group"
              >
                Explore Our Initiatives 
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator moved outside the container and position adjusted */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <div className="flex flex-col items-center text-white/70">
            <span className="tx-ps text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-rashmi-red rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CSR Image Gallery Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our CSR Initiatives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our commitment to social responsibility through these impactful moments captured across our various initiatives.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <ImageSwiper />
          </motion.div>
        </div>
      </section>

      {/* CSR Philosophy with improved styling from index3.html */}
      <section className="b-textListCards py-24 bg-card relative gradient-border">
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/20 opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <span className="tx-xs text-rashmi-red font-medium uppercase tracking-wider">Our Approach</span>
            </motion.div>
            
            <motion.div whileInView={{ opacity: [0, 1] }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <RevealText
                text="Our CSR Philosophy"
                as="h2"
                className="a-title tx-xl text-3xl md:text-5xl font-bold text-foreground mb-6"
                staggerDelay={0.05}
              />
            </motion.div>
            <div className="w-16 h-1 bg-rashmi-red mx-auto mb-10 rounded-full"></div>
            
            <div className="o-listCards grid md:grid-cols-2 gap-12 text-muted-foreground">
              <motion.div 
                className="m-card -radius -shadow text-lg leading-relaxed p-8 rounded-[1.5rem] bg-background/50 backdrop-blur-sm border border-border"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="m-card__meta flex items-center mb-4">
                  <div className="a-tag -round -bgtertiary w-10 h-10 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-rashmi-red">01</span>
                  </div>
                  <h3 className="m-card__title text-xl font-medium">Beyond Compliance</h3>
                </div>
                <p className="m-textContent">
                  We maintain self-regulated CSR standards that go beyond compliance, focusing on 
                  sustainable ecosystem development and employee welfare.
                </p>
              </motion.div>
              
              <motion.div 
                className="m-card -radius -shadow text-lg leading-relaxed p-8 rounded-[1.5rem] bg-background/50 backdrop-blur-sm border border-border"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="m-card__meta flex items-center mb-4">
                  <div className="a-tag -round -bgtertiary w-10 h-10 rounded-full bg-rashmi-red/10 flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-rashmi-red">02</span>
                  </div>
                  <h3 className="m-card__title text-xl font-medium">Lasting Impact</h3>
                </div>
                <p className="m-textContent">
                  Our leadership drives initiatives that create lasting positive impacts through 
                  environmental conservation and community engagement.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Environmental Initiatives with improved grid system */}
      <section id="environmental-section" className="b-pushPages py-24 relative overflow-hidden geometric-pattern gradient-border">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        <div className="absolute -right-36 top-24 w-96 h-96 rounded-full bg-rashmi-red/5 blur-3xl"></div>
        <div className="absolute -left-36 bottom-24 w-96 h-96 rounded-full bg-rashmi-red/5 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <div className="tx-xs text-rashmi-red font-medium mb-3">
              <RevealText text="ENVIRONMENTAL FOCUS" />
            </div>
            <RevealText
              text="Environmental Stewardship"
              as="h2"
              className="a-title tx-xl text-3xl md:text-5xl font-bold text-foreground mb-3"
              staggerDelay={0.05}
            />
            <p className="m-textContent text-muted-foreground text-lg">Sustainable practices at the core of our operations</p>
            <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="o-push grid md:grid-cols-3 gap-8">
            <CSRCard 
              icon={<Droplets size={40} className="text-rashmi-red" />}
              title="Rainwater Harvesting"
              image="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf"
              stats="100% water recycling achieved"
              index={0}
            >
              Our plants implement advanced rainwater harvesting systems, setting industry benchmarks 
              in water conservation and management practices for sustainable resource utilization.
            </CSRCard>

            <CSRCard 
              icon={<Sun size={40} className="text-rashmi-red" />}
              title="Solar Energy"
              image="https://images.unsplash.com/photo-1509391366360-2e959784a276"
              stats="40% energy from renewables"
              index={1}
            >
              We've installed state-of-the-art solar farms reducing carbon footprint by 25,000 tons annually, 
              contributing significantly to our environmental sustainability goals.
            </CSRCard>

            <CSRCard 
              icon={<TreePine size={40} className="text-rashmi-red" />}
              title="Green Coverage"
              image="https://images.unsplash.com/photo-1473448912268-2022ce9509d8"
              stats="50,000+ Trees Planted"
              index={2}
            >
              Maintaining green belts that act as carbon sinks while preserving local biodiversity, 
              enhancing natural habitats and promoting ecological balance in our operational areas.
            </CSRCard>
          </div>
        </div>
      </section>

      {/* Employee & Community Section with improved layout */}
      <section className="b-listCards py-24 bg-card relative gradient-border">
        <div className="absolute inset-0 bg-gradient-to-tr from-rashmi-dark/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        <div className="absolute inset-0 geometric-pattern opacity-[0.03]"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="mb-16 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <span className="tx-xs text-rashmi-red text-sm font-medium uppercase tracking-wider">Our Focus</span>
            </motion.div>
            
            <RevealText
              text="People & Community"
              as="h2"
              className="a-title tx-xl text-3xl md:text-5xl font-bold text-foreground mb-3"
              staggerDelay={0.05}
            />
            <div className="w-16 h-1 bg-rashmi-red mx-auto mt-6 mb-8 rounded-full"></div>
          </div>
          
          <div className="o-listCards__items grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="m-card -radius -shadow -hasIcon flex flex-col items-center text-center bg-background/50 backdrop-blur-sm rounded-[1.5rem] border border-border p-8"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
                className="mb-6 bg-background rounded-full p-5 border border-border"
              >
                <HeartPulse size={48} className="text-rashmi-red" />
              </motion.div>
              <h3 className="m-card__title text-2xl font-bold text-foreground mb-4">
                Employee Wellness
              </h3>
              <p className="m-textContent text-muted-foreground mb-8">
                Comprehensive healthcare programs covering 10,000+ employees and families, coupled 
                with continuous skill development initiatives.
              </p>
              <ul className="text-left space-y-4 text-muted-foreground w-full">
                {['Annual health checkups', 'Vaccination drives', 'Technical training programs'].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.5 }}
                    className="flex items-center p-3 rounded-lg hover:bg-rashmi-red/5 transition-colors duration-300"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-rashmi-red mr-3"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="m-card -radius -shadow -hasIcon flex flex-col items-center text-center bg-background/50 backdrop-blur-sm rounded-[1.5rem] border border-border p-8"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.05,
                  rotate: -5,
                  transition: { duration: 0.3 }
                }}
                className="mb-6 bg-background rounded-full p-5 border border-border"
              >
                <Users size={48} className="text-rashmi-red" />
              </motion.div>
              <h3 className="m-card__title text-2xl font-bold text-foreground mb-4">
                Community Engagement
              </h3>
              <p className="m-textContent text-muted-foreground mb-8">
                We've impacted 50+ communities through education, healthcare, and infrastructure 
                development initiatives.
              </p>
              <div className="grid grid-cols-2 gap-5 w-full">
                <StatBox value="15+" label="Schools Supported" index={0} />
                <StatBox value="200+" label="Community Projects" index={1} />
                <StatBox value="₹5Cr+" label="Annual Investment" index={2} />
                <StatBox value="10k+" label="Lives Impacted" index={3} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action section with improved effects */}
      <section className="py-24 relative overflow-hidden gradient-border">
        <div className="absolute inset-0 bg-rashmi-red/10"></div>
        <div className="absolute inset-0 geometric-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rashmi-red/0 via-rashmi-red to-rashmi-red/0"></div>
        
        {/* Additional floating elements for visual interest */}
        <motion.div 
          className="absolute right-[15%] top-[20%] w-16 h-16 rounded-full bg-rashmi-red/30 blur-md"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute left-[20%] bottom-[30%] w-10 h-10 rounded-full bg-rashmi-red/20 blur-md"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="m-title max-w-4xl mx-auto text-center"
          >
            <h2 className="a-title tx-xl text-3xl md:text-4xl font-bold mb-6">Join Our CSR Journey</h2>
            <p className="m-textContent text-lg mb-8">
              We're always looking for partners and volunteers to join our sustainability and community development initiatives.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <a href="/contact-us" className="a-button -tertiary inline-flex items-center gap-2 bg-rashmi-red hover:bg-rashmi-red/90 text-white px-8 py-4 rounded-full transition-all duration-300 font-medium group">
                Get Involved <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CSR;
