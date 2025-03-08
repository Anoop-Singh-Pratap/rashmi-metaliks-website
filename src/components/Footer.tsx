
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-rashmi-dark text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & About */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/rashmi-logo.png" 
                alt="Rashmi Metaliks" 
                className="h-12"
              />
            </Link>
            <p className="text-white/70 mb-6">
              One of the fastest growing Business Conglomerates in the eastern region of India, 
              pioneer in manufacturing of integrated Iron & Steel Products, Cement, Power and Ferro Alloys & Mining.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://www.linkedin.com/company/rashmi-metaliks-limited/posts/?feedView=all" icon={<Linkedin size={18} />} />
              <SocialLink href="https://twitter.com/rashmi_group" icon={<Twitter size={18} />} />
              <SocialLink href="https://www.facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://www.instagram.com/rashmimetaliksltd/" icon={<Instagram size={18} />} />
              <ThemeToggle />
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-display font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="/about-rashmi">About Us</FooterLink>
              <FooterLink href="#products">Products</FooterLink>
              <FooterLink href="/quality-assurance">Quality Assurance</FooterLink>
              <FooterLink href="/certifications">Certifications</FooterLink>
              <FooterLink href="#careers">Careers</FooterLink>
              <FooterLink href="#contact">Contact Us</FooterLink>
            </ul>
          </div>
          
          {/* Column 3: Products */}
          <div>
            <h4 className="text-xl font-display font-semibold mb-6">Our Products</h4>
            <ul className="space-y-3">
              <FooterLink href="/di-pipes">Ductile Iron Pipes</FooterLink>
              <FooterLink href="/di-fittings">DI Fittings</FooterLink>
              <FooterLink href="/tmt-bar">TMT Bars</FooterLink>
              <FooterLink href="/sponge-iron">Sponge Iron</FooterLink>
              <FooterLink href="/pig-iron">Pig Iron</FooterLink>
              <FooterLink href="/iron-ore-pellet">Iron Ore Pellet</FooterLink>
              <FooterLink href="/sinter">Sinter</FooterLink>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h4 className="text-xl font-display font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <ContactItem icon={<MapPin size={18} />}>
                Rashmi Metaliks Ltd, 7C, Kiran Shankar Roy Road<br />
                Hastings Chambers, 2nd Floor<br />
                Kolkata - 700001, West Bengal, India
              </ContactItem>
              <ContactItem icon={<Phone size={18} />}>
                <a href="tel:+913322421200" className="hover:text-rashmi-red transition-colors">+91 33 2242 1200</a>
              </ContactItem>
              <ContactItem icon={<Mail size={18} />}>
                <a href="mailto:info@rashmigroup.com" className="hover:text-rashmi-red transition-colors">info@rashmigroup.com</a>
              </ContactItem>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Rashmi Metaliks Ltd. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0 text-sm text-white/60">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="#sitemap" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-rashmi-red transition-colors"
      aria-label="Social media link"
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  const isExternalLink = href.startsWith('http');
  
  if (isExternalLink) {
    return (
      <li>
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-rashmi-red transition-colors inline-block"
        >
          {children}
        </a>
      </li>
    );
  }
  
  if (href.startsWith('#')) {
    return (
      <li>
        <a 
          href={href} 
          className="text-white/70 hover:text-rashmi-red transition-colors inline-block"
        >
          {children}
        </a>
      </li>
    );
  }
  
  return (
    <li>
      <Link 
        to={href} 
        className="text-white/70 hover:text-rashmi-red transition-colors inline-block"
      >
        {children}
      </Link>
    </li>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, children }) => {
  return (
    <div className="flex">
      <div className="text-rashmi-red mr-3 mt-1 flex-shrink-0">
        {icon}
      </div>
      <div className="text-white/70">
        {children}
      </div>
    </div>
  );
};

export default Footer;
