import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const defaultProjects = [
  { name: 'To Do App', summary: 'A To-Do app that can create, edit, and delete to do list item and persist in local storage', website: '#', primaryLanguage: 'TypeScript' },
  { name: 'React Jobs Website', summary: 'Platform for finding and posting React role opportunities.', website: '#', primaryLanguage: 'JavaScript' },
  { name: 'My Calculator', summary: 'This is a calculator app made with react that takes in 2 variables to perform simple arithmetic operations.', website: '#', primaryLanguage: 'JavaScript' },
  { name: 'Banner Project', summary: 'Built and tested a prototype tool for configurable MediaWiki CentralNotice banners.', website: '#', primaryLanguage: 'JavaScript' }
];

export default function Works() {
  const [projects, setProjects] = useState([]);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    fetch('https://gitconnected.com/api/v1/resume/isioma20')
      .then(res => res.json())
      .then(data => {
        if(data && data.projects && data.projects.length > 0) {
          // Take top 4 exactly as specified
          setProjects(data.projects.slice(0, 4));
        } else {
          setProjects(defaultProjects);
        }
      })
      .catch(() => setProjects(defaultProjects));
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    let ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.fromTo(card.querySelector('.card-inner'), 
          { 
            y: 100, 
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  if (projects.length === 0) return null;

  return (
    <section id="works" ref={containerRef} className="bg-background pt-32 pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-16 mb-20 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-accent mb-6 block">
          03 // Production
        </span>
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark tracking-tight">
          Selected <span className="text-accent font-drama italic font-normal tracking-wide lowercase">Archive.</span>
        </h2>
      </div>
      
      <div className="relative flex flex-col gap-16 md:gap-32 w-full max-w-7xl mx-auto px-0 lg:px-6">
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            ref={el => cardsRef.current[idx] = el}
            className="w-full flex items-center justify-center px-6 md:px-16"
          >
            <div className="card-inner w-full max-w-5xl min-h-[50vh] bg-primary rounded-[3rem] p-8 md:p-16 shadow-2xl flex flex-col justify-between border border-background/10 relative group overflow-hidden">
              
              {/* Background accent glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/20 transition-colors duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="font-mono text-xl md:text-2xl text-accent mb-8 font-bold tracking-widest bg-accent/10 w-min px-4 py-1 rounded-full border border-accent/20">
                  0{idx + 1}.
                </div>
                
                <h3 className="font-sans font-bold text-4xl md:text-6xl text-background mb-8 tracking-tighter">
                  {project.name}
                </h3>
                
                <p className="font-sans text-lg md:text-xl text-background/70 leading-[1.7] max-w-2xl font-light">
                  {project.summary || 'Production environment deployed. Core logic integrated and stabilized.'}
                </p>
                
                {project.languages && project.languages.length > 0 && (
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    {project.languages.map((lang, lIdx) => (
                      <span key={lIdx} className="font-mono text-xs text-background/80 bg-background/10 px-3 py-1 rounded-full uppercase tracking-widest">
                        {lang}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative z-10 flex items-center justify-between border-t border-background/10 pt-8 mt-12">
                <a 
                  href={project.website || project.url || '#'} 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-sans font-semibold text-lg text-background flex items-center gap-3 group/link hover:text-accent transition-colors"
                >
                  <span className="underline decoration-accent/30 decoration-2 underline-offset-4 group-hover/link:decoration-accent transition-colors">
                    View Project
                  </span>
                  <span className="transform transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                </a>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
