import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-primary pt-32 pb-12 px-6 md:px-16 rounded-t-[4rem] relative z-20 mt-[-4rem]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-12 border-b border-background/10 pb-16">
        
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h2 className="font-drama italic text-5xl md:text-7xl text-background leading-none lowercase pr-4">
            Initialize <br/> <span className="text-accent">connection.</span>
          </h2>
          <p className="font-mono text-sm text-background/60 tracking-widest uppercase">
            Currently available for select opportunities.
          </p>
        </div>

        <button className="btn-magnetic group flex items-center justify-center gap-3 bg-accent text-background w-32 h-32 rounded-full font-sans font-semibold text-lg shrink-0">
          Email
          <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>

      </div>

      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-background/40 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Idiaru Angela</span>
        
        <div className="flex items-center gap-8">
          <a href="#" className="link-lift hover:text-accent transition-colors">Twitter</a>
          <a href="#" className="link-lift hover:text-accent transition-colors">GitHub</a>
          <a href="#" className="link-lift hover:text-accent transition-colors">LinkedIn</a>
        </div>

        <button onClick={scrollToTop} className="link-lift flex items-center gap-2 hover:text-background transition-colors">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
