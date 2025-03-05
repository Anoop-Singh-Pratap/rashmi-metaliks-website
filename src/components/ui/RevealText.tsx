
import React, { useEffect, useRef, useState } from 'react';

interface RevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  once?: boolean;
}

const RevealText: React.FC<RevealTextProps> = ({
  text,
  as = 'p',
  staggerDelay = 0.05,
  initialDelay = 0,
  className = '',
  once = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const words = text.split(' ');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [once]);

  const Component = as;

  return (
    <div ref={containerRef} className="overflow-hidden">
      <Component className={className}>
        {words.map((word, index) => (
          <span key={index} className="inline-block mr-2">
            <span
              className="inline-block overflow-hidden"
              style={{
                transitionDelay: `${initialDelay + index * staggerDelay}s`,
              }}
            >
              <span
                className={`inline-block transition-transform duration-700 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{
                  transitionDelay: `${initialDelay + index * staggerDelay}s`,
                }}
              >
                {word}
              </span>
            </span>
          </span>
        ))}
      </Component>
    </div>
  );
};

export default RevealText;
