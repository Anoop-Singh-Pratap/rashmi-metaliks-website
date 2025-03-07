
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Sustainability from '@/components/Sustainability';
import Footer from '@/components/Footer';

const Index = () => {
  // Preload images for smoother experience
  useEffect(() => {
    const preloadImages = [
      'https://images.unsplash.com/photo-1618761299062-ba2dbbcebd92?ixlib=rb-4.0.3&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495170420372-1063986a9a8a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80'
    ];
    
    preloadImages.forEach(image => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Rashmi Metaliks - Premium Steel Products & Solutions</title>
        <meta name="description" content="Rashmi Metaliks - Leading manufacturer of high-quality steel products including DI Pipes, TMT Bars, Pig Iron, and more with industry-leading quality standards." />
        <meta name="keywords" content="Rashmi Metaliks, Steel Products, DI Pipes, TMT Bars, Sponge Iron, Pig Iron, Iron Ore Pellet, Sinter" />
        <meta name="author" content="Rashmi Metaliks" />
        <meta property="og:title" content="Rashmi Metaliks - Premium Steel Products" />
        <meta property="og:description" content="Leading manufacturer of high-quality steel products with industry-leading quality standards." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rashmi.com" />
        <meta property="og:image" content="https://www.rashmi.com/og-image.png" />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Sustainability />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
