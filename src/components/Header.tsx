import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import Logo from './ui/Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const { scrollDirection, isScrolledPastThreshold } = useScrollDirection(50, 100);
  const isTop = scrollDirection === 'top';
  const isVisible = isTop || scrollDirection === 'up';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Define the header's transition properties
  const headerVariants = {
    hidden: { y: "-100%" },
    visible: { y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    top: { y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <motion.header
      ref={navRef}
      className={`sticky top-0 left-0 w-full z-40 bg-background border-b border-border/40 backdrop-blur-sm transition-all duration-300 ${isScrolledPastThreshold ? 'shadow-md' : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center font-bold text-xl">
          <Logo />
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-foreground hover:opacity-70 transition-opacity">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/about-rashmi" label="About Us" currentPath={location.pathname} />
          <NavLink to="/products" label="Products" currentPath={location.pathname} />
          <NavLink to="/projects" label="Projects" currentPath={location.pathname} />
          <NavLink to="/careers" label="Careers" currentPath={location.pathname} />
          <NavLink to="/contact-us" label="Contact" currentPath={location.pathname} />
        </nav>

        {/* Actions Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <ThemeToggle />
          {/* You can add a button or additional elements here */}
        </div>
      </div>

      {/* Mobile Menu (AnimatePresence for smooth transitions) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-background/95 backdrop-blur-md z-30 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-6">
              <MobileNavLink to="/" label="Home" currentPath={location.pathname} onClick={closeMenu} />
              <MobileNavLink to="/about-rashmi" label="About Us" currentPath={location.pathname} onClick={closeMenu} />
              <MobileNavLink to="/products" label="Products" currentPath={location.pathname} onClick={closeMenu} />
              <MobileNavLink to="/projects" label="Projects" currentPath={location.pathname} onClick={closeMenu} />
              <MobileNavLink to="/careers" label="Careers" currentPath={location.pathname} onClick={closeMenu} />
              <MobileNavLink to="/contact-us" label="Contact" currentPath={location.pathname} onClick={closeMenu} />
              {/* Add more mobile navigation links as needed */}
              <div className="mt-6 flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`text-sm font-medium hover:text-rashmi-red transition-colors ${isActive ? 'text-rashmi-red' : 'text-foreground'}`}
    >
      {label}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, currentPath, onClick }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block py-3 text-lg font-medium hover:text-rashmi-red transition-colors ${isActive ? 'text-rashmi-red' : 'text-foreground'}`}
    >
      {label}
    </Link>
  );
};

export default Header;
