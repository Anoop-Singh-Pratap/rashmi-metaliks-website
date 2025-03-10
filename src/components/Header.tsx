
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Download, 
  FileText, 
  Building, 
  Factory, 
  Recycle,
  Leaf,
  FileCheck,
  Award
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme } = useTheme();
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { 
      label: 'Our Company', 
      dropdown: true,
      items: [
        { label: 'About Rashmi', href: '/about-rashmi' },
        { label: 'Media & News', href: '/media' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact Us', href: '/contact-us' },
      ]
    },
    { 
      label: 'Products', 
      dropdown: true,
      items: [
        { label: 'DI Pipes', href: '/di-pipes' },
        { label: 'DI Fittings', href: '/di-fittings' },
        { label: 'TMT Bar', href: '/tmt-bar' },
        { label: 'Pig Iron', href: '/pig-iron' },
        { label: 'Iron Ore Pellet', href: '/iron-ore-pellet' },
        { label: 'Sinter', href: '/sinter' },
        { label: 'Sponge Iron', href: '/sponge-iron' },
      ]
    },
    { 
      label: 'Sustainability', 
      dropdown: true,
      items: [
        { label: 'CSR Initiatives', href: '/csr' },
        { label: 'Quality Assurance', href: '/quality-assurance' },
      ]
    },
    { 
      label: 'Downloads', 
      dropdown: true,
      items: [
        { label: 'Brochures', href: '/brochures' },
        { label: 'Certifications', href: '/certifications' },
      ]
    },
  ];

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.nav-dropdown') && !target.closest('.nav-link')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Toggle dropdown
  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  // Desktop dropdown variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { 
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      y: 10,
      height: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  // Navigation container variants
  const navContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  // Mobile menu variants
  const menuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={theme === 'dark' ? '/lovable-uploads/Rashmi-logo-dark.png' : '/lovable-uploads/Rashmi-logo-light.png'} 
              alt="Rashmi Metaliks"
              className="h-10 md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-1 lg:space-x-2"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => (
              <div key={link.label} className="relative nav-dropdown">
                {link.dropdown ? (
                  <>
                    <button 
                      className={`nav-link px-3 py-2 rounded-md text-foreground hover:text-rashmi-red hover:bg-muted/50 transition-colors flex items-center ${activeDropdown === link.label ? 'text-rashmi-red' : ''}`}
                      onClick={() => toggleDropdown(link.label)}
                      onMouseEnter={() => setActiveDropdown(link.label)}
                    >
                      {link.label}
                      <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div 
                          className="absolute left-0 mt-1 w-60 rounded-md shadow-lg bg-card border border-border overflow-hidden z-20"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="py-1">
                            {link.items?.map((item) => (
                              <Link
                                key={item.label}
                                to={item.href}
                                className="block px-4 py-3 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link 
                    to={link.dropdown ? '#' : link.items[0].href}
                    className="nav-link px-3 py-2 rounded-md text-foreground hover:text-rashmi-red hover:bg-muted/50 transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <ThemeToggle />
          </motion.nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <ThemeToggle />
            <button 
              className="p-2 rounded-md text-foreground hover:text-rashmi-red transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-background z-40 md:hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-full overflow-y-auto pt-20 pb-6 px-4">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-border">
                  {link.dropdown ? (
                    <>
                      <button 
                        className="flex items-center justify-between w-full py-4 text-foreground"
                        onClick={() => toggleDropdown(link.label)}
                      >
                        <span className="font-medium">{link.label}</span>
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden bg-muted/30 rounded-md mb-3"
                          >
                            {link.items?.map((item) => (
                              <Link
                                key={item.label}
                                to={item.href}
                                className="block py-3 px-4 text-foreground hover:text-rashmi-red transition-colors border-t border-border/30"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link 
                      to={link.dropdown ? '#' : link.items[0].href}
                      className="block py-4 text-foreground hover:text-rashmi-red transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
