
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    // If we're on the homepage, just scroll to the section
    if (window.location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to the homepage with anchor
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer className="bg-rashmi-dark/95 text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img 
              src="/lovable-uploads/rashmi-logo.png" 
              alt="Rashmi Metaliks" 
              className="h-14 mb-4" 
            />
            <p className="text-gray-300 mb-6">
              Leading manufacturer of high-quality steel products with a commitment to excellence and sustainability.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rashmi-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rashmi-red transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rashmi-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rashmi-red transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-rashmi-red transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-rashmi" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> About Us
                </Link>
              </li>
              <li>
                <a 
                  href="/#products" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('products');
                  }}
                  className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center"
                >
                  <ArrowRight size={16} className="mr-2" /> Our Products
                </a>
              </li>
              <li>
                <Link to="/media" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> Media & News
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> Careers
                </Link>
              </li>
              <li>
                <Link to="/quality-assurance" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> Quality Assurance
                </Link>
              </li>
              <li>
                <Link to="/csr" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> CSR Initiatives
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/di-pipes" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> DI Pipes
                </Link>
              </li>
              <li>
                <Link to="/di-fittings" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> DI Fittings
                </Link>
              </li>
              <li>
                <Link to="/tmt-bar" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> TMT Bar
                </Link>
              </li>
              <li>
                <Link to="/pig-iron" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> Pig Iron
                </Link>
              </li>
              <li>
                <Link to="/iron-ore-pellet" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> Iron Ore Pellet
                </Link>
              </li>
              <li>
                <Link to="/sinter" className="text-gray-300 hover:text-rashmi-red transition-colors flex items-center">
                  <ArrowRight size={16} className="mr-2" /> Sinter
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-rashmi-red flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  Corporate Office:<br />
                  7/1 Anandilal Poddar Sarani,<br />
                  Kankaria Centre, 5th Floor<br />
                  Kolkata - 700071, West Bengal
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-rashmi-red" />
                <a href="tel:+913322690730" className="text-gray-300 hover:text-rashmi-red transition-colors">
                  +91 33 2269 0730
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-rashmi-red" />
                <a href="mailto:info@rashmi.com" className="text-gray-300 hover:text-rashmi-red transition-colors">
                  info@rashmi.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Rashmi Metaliks. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy-policy" className="text-gray-400 text-sm hover:text-rashmi-red transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 text-sm hover:text-rashmi-red transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 text-sm hover:text-rashmi-red transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
