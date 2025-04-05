import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from './components/ui/toaster';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';

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
import Apply from './pages/Apply';
import ApplyJob from './pages/ApplyJob';
import ContactUs from './pages/ContactUs';
import QualityAssurance from './pages/QualityAssurance';
import WhyRashmiDiPipes from './pages/WhyRashmiDiPipes';
import Certifications from './pages/Certifications';
import NotFound from './pages/NotFound';
import CSR from './pages/CSR';
import Brochures from './pages/Brochures';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NewsAdmin from './pages/NewsAdmin';
import ApiDebugger from './pages/ApiDebugger';
import RashmiLock from './pages/RashmiLock';
import VendorRegistration from './pages/VendorRegistration';
import RashmiLockRedesigned from './pages/RashmiLockRedesigned';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <AnimatedRoutes />
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about-rashmi" element={<PageTransition><AboutRashmi /></PageTransition>} />
        <Route path="/di-pipes" element={<PageTransition><DiPipes /></PageTransition>} />
        <Route path="/di-fittings" element={<PageTransition><DiFittings /></PageTransition>} />
        <Route path="/tmt-bar" element={<PageTransition><TmtBar /></PageTransition>} />
        <Route path="/pig-iron" element={<PageTransition><PigIron /></PageTransition>} />
        <Route path="/sponge-iron" element={<PageTransition><SpongeIron /></PageTransition>} />
        <Route path="/iron-ore-pellet" element={<PageTransition><IronOrePellet /></PageTransition>} />
        <Route path="/sinter" element={<PageTransition><Sinter /></PageTransition>} />
        <Route path="/rashmi-lock" element={<PageTransition><RashmiLockRedesigned /></PageTransition>} />
        <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
        <Route path="/careers/apply" element={<PageTransition><Apply /></PageTransition>} />
        <Route path="/careers/job/:id" element={<PageTransition><ApplyJob /></PageTransition>} />
        <Route path="/contact-us" element={<PageTransition><ContactUs /></PageTransition>} />
        <Route path="/vendor-registration" element={<PageTransition><VendorRegistration /></PageTransition>} />
        <Route path="/quality-assurance" element={<PageTransition><QualityAssurance /></PageTransition>} />
        <Route path="/why-rashmi-di-pipes" element={<PageTransition><WhyRashmiDiPipes /></PageTransition>} />
        <Route path="/certifications" element={<PageTransition><Certifications /></PageTransition>} />
        <Route path="/csr" element={<PageTransition><CSR /></PageTransition>} />
        <Route path="/brochures" element={<PageTransition><Brochures /></PageTransition>} />
        <Route path="/terms-and-conditions" element={<PageTransition><TermsAndConditions /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/admin/news" element={<PageTransition><NewsAdmin /></PageTransition>} />
        <Route path="/admin/api-debug" element={<PageTransition><ApiDebugger /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default App;
