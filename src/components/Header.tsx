
import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 bg-background/80 backdrop-blur-lg shadow-md'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src="/lovable-uploads/1bbf4c0e-df8d-447b-9aad-50d36b9a0b67.png"
            alt="Rashmi Group Logo"
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#home"
            className="text-foreground hover-text-underline font-medium hover:text-primary transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-foreground hover-text-underline font-medium hover:text-primary transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#products"
            className="text-foreground hover-text-underline font-medium hover:text-primary transition-colors duration-200"
          >
            Products
          </a>
          <a
            href="#sustainability"
            className="text-foreground hover-text-underline font-medium hover:text-primary transition-colors duration-200"
          >
            Sustainability
          </a>
          <a
            href="#contact"
            className="metal-button py-2 px-6 rounded-md font-medium text-foreground"
          >
            Contact Us
          </a>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="ml-4 p-2 text-foreground focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a
            href="#home"
            className="py-2 px-4 text-foreground font-medium hover:bg-secondary rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#about"
            className="py-2 px-4 text-foreground font-medium hover:bg-secondary rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#products"
            className="py-2 px-4 text-foreground font-medium hover:bg-secondary rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </a>
          <a
            href="#sustainability"
            className="py-2 px-4 text-foreground font-medium hover:bg-secondary rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Sustainability
          </a>
          <a
            href="#contact"
            className="py-2 px-4 text-rashmi-red font-medium hover:bg-secondary rounded-md transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
