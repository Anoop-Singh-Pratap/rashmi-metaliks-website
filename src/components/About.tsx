
import React, { useRef, useEffect } from 'react';
import RevealText from './ui/RevealText';

const About: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!imageRef.current) return;
    
    const image = imageRef.current;
    let rotateX = 0;
    let rotateY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = image.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      rotateX = y * -0.01;
      rotateY = x * 0.01;
      
      image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const handleMouseLeave = () => {
      image.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };
    
    image.addEventListener('mousemove', handleMouseMove);
    image.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      image.removeEventListener('mousemove', handleMouseMove);
      image.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="about" className="bg-background py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rashmi-dark/10 to-transparent"></div>
      <div className="absolute -left-10 top-40 w-40 h-40 rounded-full bg-rashmi-red/5 blur-3xl"></div>
      <div className="absolute right-0 bottom-20 w-80 h-80 rounded-full bg-rashmi-red/5 blur-3xl"></div>

      <div className="section-container">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column - Image */}
          <div ref={imageRef} className="w-full lg:w-1/2 transition-transform duration-200 ease-out">
            <div className="rounded-xl overflow-hidden shadow-xl border border-border/30">
              <img 
                src="https://images.unsplash.com/photo-1495170420372-1063986a9a8a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" 
                alt="Rashmi Group Factory" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
            <div className="mt-6 bg-secondary/50 backdrop-blur-sm rounded-lg p-4 shadow-md">
              <p className="text-sm text-muted-foreground">
                <span className="text-rashmi-red font-semibold">Global Certified:</span> ISO 9001:2008, ISO 14001:2004, OHSAS18001
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="text-rashmi-red font-semibold">Winner of Ultra Mega Project:</span> Government of West Bengal
              </p>
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="w-full lg:w-1/2">
            <div className="inline-block px-4 py-2 border border-rashmi-red/30 rounded-full bg-secondary/50 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-rashmi-red">Our Journey of Excellence</span>
            </div>
            
            <RevealText
              text="About Rashmi Group"
              as="h2"
              className="section-title"
              staggerDelay={0.03}
            />
            
            <div className="space-y-5 text-foreground/90">
              <p className="leading-relaxed">
                Rashmi Group is one of the fastest growing Business Conglomerates in the eastern region of India, pioneer in manufacturing of integrated Iron & Steel Products, Cement, Power and Ferro Alloys & Mining.
              </p>
              
              <p className="leading-relaxed">
                Led by Mr. Sajjan Kumar Patwari and his three sons Mr. Sunil Kumar Patwari, Mr. Sanjib Kumar Patwari and Mr. Sanjay Kumar Patwari, the group has its corporate office at Kolkata, and factories located at Kharagpur and Jhargram respectively.
              </p>
              
              <p className="leading-relaxed">
                It has a 3.0 MTPA state of art Integrated Iron & Steel manufacturing facility which comprises of products like – Pellet, Sinter, Pig Iron, Sponge Iron, Ductile Iron Pipe, Billet, TMT & Wire Rod and 1.0 MTPA of Cement manufacturing facility. Product range of the Group also includes Ferro Alloys and 300 MW of Captive Power Generation Plant.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="glass-card p-6 rounded-lg transition-transform hover:scale-105 duration-300">
                <h3 className="font-display text-lg font-semibold mb-2">Who we are?</h3>
                <p className="text-sm text-muted-foreground">
                  Rashmi Metaliks Limited is the flagship business of Rashmi Group and was incorporated in the year 2004 in West Bengal, India.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-lg transition-transform hover:scale-105 duration-300">
                <h3 className="font-display text-lg font-semibold mb-2">What we do?</h3>
                <p className="text-sm text-muted-foreground">
                  The DI Pipe business is the newest and the most aggressive entrant to the business stable of Rashmi Metaliks.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-lg transition-transform hover:scale-105 duration-300">
                <h3 className="font-display text-lg font-semibold mb-2">Why Rashmi DI Pipes?</h3>
                <p className="text-sm text-muted-foreground">
                  Rashmi Metaliks is the flag bearer of Rashmi Group with dynamic top management and young expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
