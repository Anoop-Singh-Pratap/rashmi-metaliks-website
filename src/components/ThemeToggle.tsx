
import React, { useRef, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Interactive hover effect
  useEffect(() => {
    const toggle = toggleRef.current;
    if (!toggle) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!toggle) return;
      const rect = toggle.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      toggle.style.setProperty('--x', `${x}px`);
      toggle.style.setProperty('--y', `${y}px`);
    };

    toggle.addEventListener('mousemove', handleMouseMove);
    return () => {
      toggle.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <button
      ref={toggleRef}
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-background to-secondary 
                 overflow-hidden shadow-md transition-all duration-500 hover:shadow-lg
                 before:absolute before:w-20 before:h-20 before:rounded-full 
                 before:bg-gradient-to-tr before:from-rashmi-red/50 before:to-foreground/20 
                 before:transition-all before:duration-500 before:opacity-0 before:hover:opacity-100
                 before:blur-sm before:transform-gpu"
      style={{
        '--x': '50%',
        '--y': '50%',
      } as React.CSSProperties}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-foreground" />
        ) : (
          <Moon className="h-5 w-5 text-foreground" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
