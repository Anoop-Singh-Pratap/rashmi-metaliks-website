
import React, { useEffect, useRef } from 'react';
import RevealText from './ui/RevealText';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Parallel video playback when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(e => console.error("Video play error:", e));
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  // Smooth scroll to About section
  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-rashmi-dark/80 via-rashmi-dark/60 to-rashmi-dark/80 z-10"></div>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1618761299062-ba2dbbcebd92?ixlib=rb-4.0.3&auto=format&fit=crop&q=80"
        >
          <source 
            src="https://player.vimeo.com/external/520434915.sd.mp4?s=c7d7c1ddd90c5b89c831aade33c363f84d0bb5cf&profile_id=165&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-in">
          <RevealText
            text="Excellence in Steel"
            as="h1"
            className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
            staggerDelay={0.08}
          />
          <RevealText
            text="Cement, Power and Beyond"
            as="h2"
            className="text-2xl md:text-4xl font-display text-white/90 mb-6"
            staggerDelay={0.05}
            initialDelay={0.5}
          />
          <p className="text-white/80 text-lg max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
            Rashmi Group is one of the fastest growing Business Conglomerates in the eastern region of India, 
            pioneer in manufacturing of integrated Iron & Steel Products, Cement, Power and Ferro Alloys & Mining.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <button
              className="bg-rashmi-red text-white px-6 py-3 rounded-md hover:bg-rashmi-red/90 transition-colors 
                         shadow-lg hover:shadow-rashmi-red/20 flex items-center group"
            >
              <span>Explore Products</span>
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </button>
            <Link href="/about-rashmi" passHref> 
            <button
              className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-md 
                         hover:bg-white/10 transition-all"
            >
              Our Journey
            </button>
              </Link>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        ref={scrollRef}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white flex flex-col items-center 
                   cursor-pointer animate-float"
      >
        <span className="text-sm mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full mt-2 animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
