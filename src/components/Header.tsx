
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, ChevronDown, Download, FileText, Briefcase, Newspaper } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [downloadsDropdownOpen, setDownloadsDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [sustainabilityDropdownOpen, setSustainabilityDropdownOpen] = useState(false);
  
  const productsDropdownRef = useRef<HTMLDivElement>(null);
  const downloadsDropdownRef = useRef<HTMLDivElement>(null);
  const contactDropdownRef = useRef<HTMLDivElement>(null);
  const sustainabilityDropdownRef = useRef<HTMLDivElement>(null);
  
  const hoverTimeoutRef = useRef<number | null>(null);
  const downloadHoverTimeoutRef = useRef<number | null>(null);
  const contactHoverTimeoutRef = useRef<number | null>(null);
  const sustainabilityHoverTimeoutRef = useRef<number | null>(null);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Add longer hover time for dropdowns
  const handleProductsHover = (isHovering: boolean) => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (isHovering) {
      setProductsDropdownOpen(true);
    } else {
      hoverTimeoutRef.current = window.setTimeout(() => {
        setProductsDropdownOpen(false);
      }, 600); // Increased timeout for better usability
    }
  };

  const handleDownloadsHover = (isHovering: boolean) => {
    if (downloadHoverTimeoutRef.current !== null) {
      window.clearTimeout(downloadHoverTimeoutRef.current);
      downloadHoverTimeoutRef.current = null;
    }

    if (isHovering) {
      setDownloadsDropdownOpen(true);
    } else {
      downloadHoverTimeoutRef.current = window.setTimeout(() => {
        setDownloadsDropdownOpen(false);
      }, 600); // Increased timeout
    }
  };

  const handleContactHover = (isHovering: boolean) => {
    if (contactHoverTimeoutRef.current !== null) {
      window.clearTimeout(contactHoverTimeoutRef.current);
      contactHoverTimeoutRef.current = null;
    }

    if (isHovering) {
      setContactDropdownOpen(true);
    } else {
      contactHoverTimeoutRef.current = window.setTimeout(() => {
        setContactDropdownOpen(false);
      }, 600); // Increased timeout
    }
  };
  
  const handleSustainabilityHover = (isHovering: boolean) => {
    if (sustainabilityHoverTimeoutRef.current !== null) {
      window.clearTimeout(sustainabilityHoverTimeoutRef.current);
      sustainabilityHoverTimeoutRef.current = null;
    }

    if (isHovering) {
      setSustainabilityDropdownOpen(true);
    } else {
      sustainabilityHoverTimeoutRef.current = window.setTimeout(() => {
        setSustainabilityDropdownOpen(false);
      }, 600); // Increased timeout
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
      if (downloadsDropdownRef.current && !downloadsDropdownRef.current.contains(event.target as Node)) {
        setDownloadsDropdownOpen(false);
      }
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
        setContactDropdownOpen(false);
      }
      if (sustainabilityDropdownRef.current && !sustainabilityDropdownRef.current.contains(event.target as Node)) {
        setSustainabilityDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    // Check if we're on the homepage
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage with the hash
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" onClick={scrollToTop} className="flex items-center">
            <img
              src="/lovable-uploads/rashmi-logo.png"
              alt="Rashmi Metaliks"
              className={`transition-all duration-300 ${
                isScrolled ? 'h-8 md:h-10' : 'h-10 md:h-14'
              }`}
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link 
            to="/" 
            onClick={scrollToTop} 
            className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group overflow-hidden"
          >
            <span className="flex items-center"><Home size={16} className="mr-1" /> Home</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rashmi-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          
          <Link
            to="/about-rashmi"
            className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group overflow-hidden"
          >
            <span>About</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rashmi-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          
          <div 
            className="relative group" 
            ref={productsDropdownRef}
            onMouseEnter={() => handleProductsHover(true)}
            onMouseLeave={() => handleProductsHover(false)}
          >
            <a 
              href="/#products" 
              onClick={(e) => {e.preventDefault(); scrollToSection('products');}}
              className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group overflow-hidden flex items-center"
            >
              <span>Products</span>
              <ChevronDown 
                size={16} 
                className={`ml-1 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''}`} 
              />
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rashmi-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
            
            <div 
              className={`absolute top-full left-0 mt-2 w-52 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ${
                productsDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              onMouseEnter={() => handleProductsHover(true)}
              onMouseLeave={() => handleProductsHover(false)}
            >
              <div className="py-1">
                <Link 
                  to="/di-pipes" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200"
                >
                  DI Pipes
                </Link>
                <Link 
                  to="/di-fittings" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200"
                >
                  DI Fittings
                </Link>
                <Link 
                  to="/tmt-bar" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200"
                >
                  TMT Bar
                </Link>
                <Link 
                  to="/sponge-iron" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200"
                >
                  Sponge Iron
                </Link>
                <Link 
                  to="/pig-iron" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200"
                >
                  Pig Iron
                </Link>
                <Link 
                  to="/iron-ore-pellet" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200"
                >
                  Iron Ore Pellet
                </Link>
                <Link 
                  to="/sinter" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200"
                >
                  Sinter
                </Link>
              </div>
            </div>
          </div>
          
          <div 
            className="relative group"
            ref={sustainabilityDropdownRef}
            onMouseEnter={() => handleSustainabilityHover(true)}
            onMouseLeave={() => handleSustainabilityHover(false)}
          >
            <a 
              href="#sustainability" 
              onClick={(e) => {e.preventDefault(); scrollToSection('sustainability');}}
              className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group overflow-hidden flex items-center"
            >
              <span>Sustainability</span>
              <ChevronDown 
                size={16} 
                className={`ml-1 transition-transform duration-200 ${sustainabilityDropdownOpen ? 'rotate-180' : ''}`}
              />
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rashmi-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
            <div 
              className={`absolute top-full left-0 mt-2 w-52 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ${
                sustainabilityDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              onMouseEnter={() => handleSustainabilityHover(true)}
              onMouseLeave={() => handleSustainabilityHover(false)}
            >
              <div className="py-1">
                <a 
                  href="#sustainability" 
                  onClick={(e) => {e.preventDefault(); scrollToSection('sustainability');}}
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200"
                >
                  Overview
                </a>
                <Link 
                  to="/csr" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200"
                >
                  CSR Initiatives
                </Link>
                <Link 
                  to="/quality-assurance" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200"
                >
                  Quality Assurance
                </Link>
              </div>
            </div>
          </div>

          <Link
            to="/media"
            className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group overflow-hidden"
          >
            <span className="flex items-center"><Newspaper size={16} className="mr-1" /> Media</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rashmi-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>

          <div 
            className="relative group" 
            ref={downloadsDropdownRef}
            onMouseEnter={() => handleDownloadsHover(true)}
            onMouseLeave={() => handleDownloadsHover(false)}
          >
            <a 
              href="#downloads" 
              className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group overflow-hidden flex items-center"
            >
              <span>Downloads</span>
              <ChevronDown 
                size={16} 
                className={`ml-1 transition-transform duration-200 ${downloadsDropdownOpen ? 'rotate-180' : ''}`} 
              />
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rashmi-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
            
            <div 
              className={`absolute top-full left-0 mt-2 w-48 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ${
                downloadsDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              onMouseEnter={() => handleDownloadsHover(true)}
              onMouseLeave={() => handleDownloadsHover(false)}
            >
              <div className="py-1">
                <Link 
                  to="/certifications" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200 flex items-center"
                >
                  <FileText size={16} className="mr-2" />
                  Certifications
                </Link>
                <Link 
                  to="/brochures" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200 flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  Brochures
                </Link>
              </div>
            </div>
          </div>
          
          <div 
            className="relative group" 
            ref={contactDropdownRef}
            onMouseEnter={() => handleContactHover(true)}
            onMouseLeave={() => handleContactHover(false)}
          >
            <a 
              href="#contact" 
              className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group overflow-hidden flex items-center"
            >
              <span>Contact</span>
              <ChevronDown 
                size={16} 
                className={`ml-1 transition-transform duration-200 ${contactDropdownOpen ? 'rotate-180' : ''}`} 
              />
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rashmi-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
            
            <div 
              className={`absolute top-full right-0 mt-2 w-48 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ${
                contactDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
              onMouseEnter={() => handleContactHover(true)}
              onMouseLeave={() => handleContactHover(false)}
            >
              <div className="py-1">
                <Link 
                  to="/contact-us" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200 flex items-center"
                >
                  <FileText size={16} className="mr-2" />
                  Contact Us
                </Link>
                <Link 
                  to="/careers" 
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-rashmi-red transition-colors duration-200 flex items-center"
                >
                  <Briefcase size={16} className="mr-2" />
                  Careers
                </Link>
              </div>
            </div>
          </div>
          
          <ThemeToggle />
        </nav>

        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-4 p-2 text-foreground"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Improved Responsiveness */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-[${isScrolled ? '60px' : '76px'}] left-0 right-0 bottom-0 bg-background/95 backdrop-blur-md z-50 transition-transform duration-300 ease-in-out transform overflow-y-auto ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <MobileNavLink href="/" onClick={scrollToTop}>
              <Home size={16} className="mr-1" /> Home
            </MobileNavLink>
            <MobileNavLink href="/about-rashmi" onClick={() => setIsMenuOpen(false)}>
              About
            </MobileNavLink>
            
            <div className="mb-2">
              <button
                onClick={() => scrollToSection('products')}
                className="flex items-center w-full py-2 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted/30 px-4 rounded-md transition-colors duration-200"
              >
                Products <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="pl-4 mt-2 border-l-2 border-rashmi-red/30 space-y-2">
                <MobileNavLink href="/di-pipes" onClick={() => setIsMenuOpen(false)}>
                  DI Pipes
                </MobileNavLink>
                <MobileNavLink href="/di-fittings" onClick={() => setIsMenuOpen(false)}>
                  DI Fittings
                </MobileNavLink>
                <MobileNavLink href="/tmt-bar" onClick={() => setIsMenuOpen(false)}>
                  TMT Bar
                </MobileNavLink>
                <MobileNavLink href="/sponge-iron" onClick={() => setIsMenuOpen(false)}>
                  Sponge Iron
                </MobileNavLink>
                <MobileNavLink href="/pig-iron" onClick={() => setIsMenuOpen(false)}>
                  Pig Iron
                </MobileNavLink>
                <MobileNavLink href="/iron-ore-pellet" onClick={() => setIsMenuOpen(false)}>
                  Iron Ore Pellet
                </MobileNavLink>
                <MobileNavLink href="/sinter" onClick={() => setIsMenuOpen(false)}>
                  Sinter
                </MobileNavLink>
              </div>
            </div>
            
            {/* Expanded Sustainability Section */}
            <div className="mb-2">
              <button
                onClick={() => scrollToSection('sustainability')}
                className="flex items-center w-full py-2 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted/30 px-4 rounded-md transition-colors duration-200"
              >
                Sustainability <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="pl-4 mt-2 border-l-2 border-rashmi-red/30 space-y-2">
                <MobileNavLink 
                  href="#sustainability" 
                  onClick={() => {
                    scrollToSection('sustainability');
                    setIsMenuOpen(false);
                  }}
                >
                  Overview
                </MobileNavLink>
                <MobileNavLink href="/csr" onClick={() => setIsMenuOpen(false)}>
                  CSR Initiatives
                </MobileNavLink>
                <MobileNavLink href="/quality-assurance" onClick={() => setIsMenuOpen(false)}>
                  Quality Assurance
                </MobileNavLink>
              </div>
            </div>

            <MobileNavLink href="/media" onClick={() => setIsMenuOpen(false)}>
              <Newspaper size={16} className="mr-1" /> Media
            </MobileNavLink>

            <div className="mb-2">
              <button
                onClick={() => {}}
                className="flex items-center w-full py-2 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted/30 px-4 rounded-md transition-colors duration-200"
              >
                Downloads <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="pl-4 mt-2 border-l-2 border-rashmi-red/30 space-y-2">
                <MobileNavLink href="/certifications" onClick={() => setIsMenuOpen(false)}>
                  <FileText size={16} className="mr-2" /> Certifications
                </MobileNavLink>
                <MobileNavLink href="/brochures" onClick={() => setIsMenuOpen(false)}>
                  <Download size={16} className="mr-2" /> Brochures
                </MobileNavLink>
              </div>
            </div>
            
            <div className="mb-2">
              <button
                onClick={() => {}}
                className="flex items-center w-full py-2 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted/30 px-4 rounded-md transition-colors duration-200"
              >
                Contact <ChevronDown size={16} className="ml-1" />
              </button>
              <div className="pl-4 mt-2 border-l-2 border-rashmi-red/30 space-y-2">
                <MobileNavLink href="/contact-us" onClick={() => setIsMenuOpen(false)}>
                  <FileText size={16} className="mr-2" /> Contact Us
                </MobileNavLink>
                <MobileNavLink href="/careers" onClick={() => setIsMenuOpen(false)}>
                  <Briefcase size={16} className="mr-2" /> Careers
                </MobileNavLink>
              </div>
            </div>
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
  const isInternalLink = !href.startsWith('#');
  
  if (isInternalLink) {
    return (
      <Link
        to={href}
        onClick={onClick}
        className="flex items-center py-2 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted/30 px-4 rounded-md transition-colors duration-200"
      >
        {children}
      </Link>
    );
  }
  
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center py-2 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted/30 px-4 rounded-md transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export default Header;
