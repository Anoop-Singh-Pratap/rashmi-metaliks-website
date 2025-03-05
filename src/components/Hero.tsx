
import React, { useEffect, useRef } from 'react';
import RevealText from './ui/RevealText';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const handleScroll = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1618761299062-ba2dbbcebd92?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
        >
          {/* Fallback video URL - in a real implementation, you would use your own video */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-molten-metal-being-poured-into-a-mold-43264-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-rashmi-dark/90 via-rashmi-dark/60 to-rashmi-dark/90"></div>
      </div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 py-20 text-center text-white z-10 mt-16">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-4 py-2 border border-rashmi-red/30 rounded-full bg-rashmi-dark/50 backdrop-blur-sm mb-6 animate-fade-in">
            <span className="text-sm font-medium text-rashmi-red">Excellence in steel, cement, power and beyond</span>
          </div>
          
          <RevealText
            text="Industrial Strength Meets Modern Innovation"
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white"
            staggerDelay={0.03}
          />
          
          <RevealText
            text="Pioneering manufacturing of integrated Iron & Steel Products, Cement, Power and Ferro Alloys & Mining."
            as="p"
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto text-balance"
            staggerDelay={0.01}
            initialDelay={0.5}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <button 
              className="metal-button py-3 px-8 rounded-md text-lg font-medium text-white 
                       bg-gradient-to-r from-rashmi-red to-rashmi-red/80 border-none
                       hover:shadow-rashmi-red/20 hover:shadow-lg transition-all duration-300
                       hover:-translate-y-1 magnetic-hover"
            >
              Discover Our Products
            </button>
            <button 
              onClick={handleScroll}
              className="metal-button py-3 px-8 rounded-md text-lg font-medium
                       bg-white/10 backdrop-blur-md border border-white/20
                       hover:bg-white/20 transition-all duration-300
                       hover:-translate-y-1 magnetic-hover"
            >
              Learn More
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
