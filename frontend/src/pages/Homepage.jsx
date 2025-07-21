import React from 'react';
import { ThemeProvider } from '../contex/ThemeProvider';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Service';

import Testimonials from '../components/Testimonials';
import PromoBanner from '../components/Promo';
import Footer from '../components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <Hero />
        <Services />
      
        <Testimonials />
        <PromoBanner />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;