
import React, { useState, useEffect } from 'react';
import { Menu, X, Home } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/rashmi-logo.png"
              alt="Rashmi Metaliks"
              className={`transition-all duration-300 ${
                isScrolled ? 'h-10' : 'h-14'
              }`}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group overflow-hidden">
            <span className="flex items-center"><Home size={16} className="mr-1" /> Home</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rashmi-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#products">Products</NavLink>
          <Link to="/di-pipes" className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group overflow-hidden">
            <span>DI Pipes</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rashmi-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <NavLink href="#sustainability">Sustainability</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-4 p-2 text-foreground"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              <Home size={16} className="mr-1" /> Home
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="#products" onClick={() => setIsMenuOpen(false)}>
              Products
            </MobileNavLink>
            <MobileNavLink href="/di-pipes" onClick={() => setIsMenuOpen(false)}>
              DI Pipes
            </MobileNavLink>
            <MobileNavLink href="#sustainability" onClick={() => setIsMenuOpen(false)}>
              Sustainability
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </MobileNavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <a
      href={href}
      className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300
                group overflow-hidden"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rashmi-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </a>
  );
};

const MobileNavLink: React.FC<{
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ href, onClick, children }) => {
  // Check if it's an internal link or a section link
  const isInternalLink = !href.startsWith('#');
  
  if (isInternalLink) {
    return (
      <Link
        to={href}
        onClick={onClick}
        className="block py-2 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted/30 px-4 rounded-md transition-colors duration-200"
      >
        <span className="flex items-center">{children}</span>
      </Link>
    );
  }
  
  return (
    <a
      href={href}
      onClick={onClick}
      className="block py-2 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted/30 px-4 rounded-md transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export default Header;
