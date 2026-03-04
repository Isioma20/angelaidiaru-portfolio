import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Works from './components/Works';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative w-full bg-primary text-dark font-sans" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Works />
      <Footer />
    </div>
  );
}

export default App;
