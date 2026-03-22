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
          <h2 className="font-drama italic text-5xl md:text-7xl text-background leading-none pr-4">
            Get in<br/> <span className="text-accent">touch.</span>
          </h2>
          <p className="font-mono text-sm text-background/60 tracking-widest uppercase">
            Currently available for opportunities.
          </p>
        </div>

        <a href="mailto:idiaruangela2000@gmail.com" className="btn-magnetic group bg-accent text-background w-32 h-32 rounded-full font-sans font-semibold text-lg shrink-0 relative overflow-hidden block">
          <div className="absolute inset-0 w-full h-full flex flex-col transition-transform duration-150 ease-out lg:group-hover:-translate-y-full">
            {/* Default State */}
            <div className="w-full h-full flex items-center justify-center gap-2 shrink-0">
              Email
              <ArrowUpRight className="w-5 h-5" />
            </div>
            {/* Hover State */}
            <div className="w-full h-full flex items-center justify-center gap-2 shrink-0">
              Email
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </a>

      </div>

      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-background/40 uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Idiaru Angela</span>
        
        <div className="flex items-center gap-8">
          <a href="https://github.com/Isioma20" target="_blank" rel="noreferrer" className="link-lift hover:text-accent transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/angela-idiaru/" target="_blank" rel="noreferrer" className="link-lift hover:text-accent transition-colors">LinkedIn</a>
        </div>

        <button onClick={scrollToTop} className="link-lift flex items-center gap-2 hover:text-background transition-colors">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
