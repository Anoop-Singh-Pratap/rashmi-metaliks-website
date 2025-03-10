
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from './components/ui/toaster';

// Pages
import Index from './pages/Index';
import AboutRashmi from './pages/AboutRashmi';
import DiPipes from './pages/DiPipes';
import DiFittings from './pages/DiFittings';
import TmtBar from './pages/TmtBar';
import PigIron from './pages/PigIron';
import SpongeIron from './pages/SpongeIron';
import IronOrePellet from './pages/IronOrePellet';
import Sinter from './pages/Sinter';
import Media from './pages/Media';
import Careers from './pages/Careers';
import ContactUs from './pages/ContactUs';
import QualityAssurance from './pages/QualityAssurance';
import WhyRashmiDiPipes from './pages/WhyRashmiDiPipes';
import Certifications from './pages/Certifications';
import NotFound from './pages/NotFound';
import CSR from './pages/CSR';
import Brochures from './pages/Brochures';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-rashmi" element={<AboutRashmi />} />
          <Route path="/di-pipes" element={<DiPipes />} />
          <Route path="/di-fittings" element={<DiFittings />} />
          <Route path="/tmt-bar" element={<TmtBar />} />
          <Route path="/pig-iron" element={<PigIron />} />
          <Route path="/sponge-iron" element={<SpongeIron />} />
          <Route path="/iron-ore-pellet" element={<IronOrePellet />} />
          <Route path="/sinter" element={<Sinter />} />
          <Route path="/media" element={<Media />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/quality-assurance" element={<QualityAssurance />} />
          <Route path="/why-rashmi-di-pipes" element={<WhyRashmiDiPipes />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/csr" element={<CSR />} />
          <Route path="/brochures" element={<Brochures />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
