import React, { useEffect, useRef, useState } from 'react';

const navLinks = ['About', 'Skills', 'Works'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100);

      // Scroll Spy Logic
      let current = '';
      navLinks.forEach((link) => {
        const section = document.getElementById(link.toLowerCase());
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          // Activate section when it scrolls near the middle of viewport
          if (window.scrollY >= sectionTop - window.innerHeight / 2 && window.scrollY < sectionTop + sectionHeight - 200) {
            current = link.toLowerCase();
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });

      // Clean the URL without reloading the page
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const bgActive = isScrolled || isMobileMenuOpen;

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 rounded-3rem w-[92%] max-w-5xl ${
          bgActive
            ? 'bg-background/80 backdrop-blur-xl border border-primary/10 text-primary shadow-2xl'
            : 'bg-transparent text-background border-transparent'
        }`}
      >
        <div className="font-sans font-bold text-xl tracking-tighter">
          Idiaru.
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          {navLinks.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, link.toLowerCase())}
                className={`link-lift cursor-pointer transition-colors duration-300 ${isActive ? 'text-accent font-bold' : ''}`}
              >
                {link}
              </a>
            );
          })}
        </div>
        
        {/* Desktop CTA */}
        <button 
          onClick={(e) => handleNavClick(e, 'contact')}
          className={`hidden md:block btn-magnetic btn-fill-hover px-6 py-2.5 rounded-2rem font-sans font-semibold text-sm cursor-pointer ${
            isScrolled ? 'btn-accent-to-primary' : 'btn-primary-to-accent'
          }`}
        >
          <span>Contact me</span>
        </button>

        {/* Mobile Hamburger Icon */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 relative cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {/* Hamburger bars */}
          {[
            isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : '',
            isMobileMenuOpen ? 'opacity-0' : '',
            isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''
          ].map((transformClass, i) => (
            <span 
              key={i} 
              className={`w-6 h-[2px] rounded-full transition-all duration-300 ${bgActive ? 'bg-primary' : 'bg-background'} ${transformClass}`} 
            />
          ))}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-primary/95 backdrop-blur-2xl transition-all duration-700 md:hidden flex flex-col pt-32 px-10 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-start gap-4">
          <span className={`font-mono text-xs uppercase tracking-widest text-accent mb-6 block transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            00 // Navigation
          </span>
          {navLinks.map((item, i) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className={`font-drama italic lowercase cursor-pointer text-6xl leading-none transition-all duration-500 hover:text-accent active:scale-95 origin-left ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } ${isActive ? 'text-accent font-bold' : 'text-background'}`}
                style={{ transitionDelay: `${i * 100 + 150}ms` }}
              >
                {item}
              </a>
            );
          })}
        </div>
        
        <div className={`mt-16 transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '450ms' }}>
          <button 
            onClick={(e) => handleNavClick(e, 'contact')}
            className="btn-magnetic btn-fill-hover btn-accent-to-primary px-8 py-3.5 rounded-full font-sans font-semibold text-lg cursor-pointer border border-background/20 shadow-[0_0_30px_rgba(123,97,255,0.2)]"
          >
            <span>Contact me</span>
          </button>
        </div>
      </div>
    </>
  );
}
