import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Download, FileText, Building, Factory, Leaf, FileCheck, Award, Phone, Briefcase } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';
import { useScrollTrigger } from '@/hooks/useScrollPosition';

const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme } = useTheme();
  const location = useLocation();
  
  const triggerRef = useRef<HTMLDivElement>(null);
  const isScrolledPastTrigger = useScrollTrigger(triggerRef);

  const isHeaderVisible = !isScrolledPastTrigger || mobileMenuOpen;
  
  const shouldBeBlurred = isScrolledPastTrigger;

  const forceWhiteText = !isScrolledPastTrigger && theme === 'light' && location.pathname === '/';

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const navLinks = [
    { 
      label: 'Our Company', 
      dropdown: true,
      items: [
        { label: 'About Rashmi', href: '/about-rashmi', icon: <Building size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Media & News', href: '/media', icon: <FileText size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Contact Us', href: '/contact-us', icon: <Phone size={16} className="mr-2 text-rashmi-red/80" /> },
      ]
    },
    { 
      label: 'Products', 
      dropdown: true,
      items: [
        { label: 'DI Pipes', href: '/di-pipes', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'DI Fittings', href: '/di-fittings', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Rashmi-Lock Joint System', href: '/rashmi-lock', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'TMT Bar', href: '/tmt-bar', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Pig Iron', href: '/pig-iron', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Iron Ore Pellet', href: '/iron-ore-pellet', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Sinter', href: '/sinter', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Sponge Iron', href: '/sponge-iron', icon: <Factory size={16} className="mr-2 text-rashmi-red/80" /> },
      ]
    },
    { 
      label: 'Sustainability', 
      dropdown: true,
      items: [
        { label: 'CSR Initiatives', href: '/csr', icon: <Leaf size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Quality Assurance', href: '/quality-assurance', icon: <FileCheck size={16} className="mr-2 text-rashmi-red/80" /> },
      ]
    },
    { 
      label: 'Careers & Contact', 
      dropdown: true,
      items: [
        { label: 'Careers', href: '/careers', icon: <Briefcase size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Contact Us', href: '/contact-us', icon: <Phone size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Vendor Registration', href: '/vendor-registration', icon: <Building size={16} className="mr-2 text-rashmi-red/80" /> },
      ]
    },
    { 
      label: 'Downloads', 
      dropdown: true,
      items: [
        { label: 'Brochures', href: '/brochures', icon: <Download size={16} className="mr-2 text-rashmi-red/80" /> },
        { label: 'Certifications', href: '/certifications', icon: <Award size={16} className="mr-2 text-rashmi-red/80" /> },
      ]
    },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useClickOutside(dropdownRef, () => {
    if (activeDropdown) {
      setActiveDropdown(null);
    }
  });

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const isLinkActive = (href: string) => {
    return location.pathname === href;
  };

  const isParentActive = (items: {href: string}[]) => {
    return items.some(item => location.pathname === item.href);
  };

  return (
    <>
      <div ref={triggerRef} style={{ position: 'absolute', top: '1px', height: '1px', width: '1px' }} aria-hidden="true"></div>

      <header 
        className={`fixed w-full z-50 transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div 
          className={`w-full ${shouldBeBlurred ? 'shadow-md' : ''}`} 
          style={{
            backgroundColor: shouldBeBlurred ? 'hsl(var(--background) / 0.5)' : 'transparent',
            backdropFilter: shouldBeBlurred ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: shouldBeBlurred ? 'blur(16px)' : 'none',
            transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              <Link to="/" className="flex items-center">
                <img 
                  src={ (theme === 'dark' || forceWhiteText) ? '/lovable-uploads/Rashmi-logo-dark.png' : '/lovable-uploads/Rashmi-logo-light.png' } 
                  alt="Rashmi Metaliks"
                  className="h-10 md:h-12"
                />
              </Link>

              <div ref={dropdownRef} className="hidden md:flex items-center space-x-3">
                {navLinks.map((link) => (
                  <div key={link.label} className="relative">
                    {link.dropdown ? (
                      <div className="relative">
                        <button 
                          className={`px-3 py-2 rounded-md font-medium flex items-center hover:bg-muted/70
                            ${forceWhiteText ? 'text-white hover:text-white/90' : 'text-foreground hover:text-rashmi-red'}
                            ${activeDropdown === link.label ? (forceWhiteText ? 'text-white bg-white/10' : 'text-rashmi-red bg-muted/50') : ''}
                            ${isParentActive(link.items) ? (forceWhiteText ? 'text-white' : 'text-rashmi-red') : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(link.label);
                          }}
                          onMouseEnter={() => setActiveDropdown(link.label)}
                        >
                          {link.label}
                          <ChevronDown size={16} className={`ml-1 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {activeDropdown === link.label && (
                          <div 
                            className="absolute left-0 mt-1 w-64 rounded-lg shadow-lg bg-background border border-border overflow-hidden z-20"
                            onMouseLeave={() => setActiveDropdown(null)}
                          >
                            <div className="py-2">
                              {link.items?.map((item) => (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  className={`flex items-center px-5 py-3 hover:bg-muted hover:text-rashmi-red
                                    ${isLinkActive(item.href) ? 'bg-muted/30 text-rashmi-red font-medium' : ''}`}
                                >
                                  {item.icon}
                                  <span>{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link 
                        to={link.dropdown ? '#' : link.items[0].href}
                        className={`px-3 py-2 rounded-md text-foreground font-medium hover:bg-muted/70 hover:text-rashmi-red
                          ${forceWhiteText ? 'text-white hover:text-white/90' : 'text-foreground hover:text-rashmi-red'}
                          ${isLinkActive(link.items[0].href) ? (forceWhiteText ? 'text-white' : 'text-rashmi-red') : ''}`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <ThemeToggle />
              </div>

              <div className="flex items-center md:hidden space-x-2">
                <ThemeToggle />
                <button 
                  className={`p-2 rounded-md hover:bg-muted/60
                    ${forceWhiteText ? 'text-white hover:text-white/90' : 'text-foreground hover:text-rashmi-red'}`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle Menu"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />} 
                </button>
              </div>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden fixed inset-0 z-50 glass-effect overflow-y-auto"
            style={{ 
              backgroundColor: 'hsl(var(--background) / 0.97)',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '100dvh', // Use dynamic viewport height for better mobile support
              width: '100%',
              overflowY: 'auto'
            }}
          >
            <div className="px-4 pt-4 pb-6">
              <div className="flex items-center justify-between mb-6">
                <Link 
                  to="/" 
                  className="flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <img 
                    src={theme === 'dark' ? '/lovable-uploads/Rashmi-logo-dark.png' : '/lovable-uploads/Rashmi-logo-light.png'} 
                    alt="Rashmi Metaliks"
                    className="h-8"
                  />
                </Link>
                
                <button 
                  className="p-2 rounded-full bg-rashmi-red text-white"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Menu"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <div 
                    key={link.label} 
                    className={`border-b border-border/20 pb-2 ${isParentActive(link.items) ? 'bg-muted/10' : ''}`}
                  >
                    {link.dropdown ? (
                      <>
                        <button 
                          className={`flex items-center justify-between w-full py-3 font-medium text-foreground
                            ${activeDropdown === link.label ? 'text-rashmi-red' : ''}
                            ${isParentActive(link.items) ? 'text-rashmi-red' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(link.label);
                          }}
                        >
                          <span>{link.label}</span>
                          <ChevronDown 
                            size={18} 
                            className={`transition-transform ${activeDropdown === link.label ? 'rotate-180 text-rashmi-red' : ''}`}
                          />
                        </button>
                        
                        {activeDropdown === link.label && (
                          <div className="bg-muted/30 rounded-md mb-2 mx-1">
                            {link.items?.map((item) => (
                              <Link
                                key={item.label}
                                to={item.href}
                                className={`flex items-center py-3 px-4 text-foreground hover:text-rashmi-red border-t border-border/20
                                  ${isLinkActive(item.href) ? 'text-rashmi-red bg-muted/30 font-medium' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="mr-2">
                                  {item.icon}
                                </span>
                                <span>{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link 
                        to={link.dropdown ? '#' : link.items[0].href}
                        className={`block py-3 text-foreground hover:text-rashmi-red 
                          ${isLinkActive(link.items[0].href) ? 'text-rashmi-red' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <button
                  className="w-full py-3 px-4 bg-muted rounded-lg text-foreground flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-2">Close Menu</span>
                  <X size={15} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
