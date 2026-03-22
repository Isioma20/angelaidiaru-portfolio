import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, Fingerprint, Database, CheckCircle2, FileText, Blocks, LayoutTemplate, Bug, FlaskConical, Braces } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Hardcoded skills requested by user
const hardcodedSkills = [
  { name: 'Typescript', level: 'Expert', icon: Braces },
  { name: 'Javascript', level: 'Expert', icon: Braces },
  { name: 'React', level: 'Advanced', icon: Blocks },
  { name: 'HTML', level: 'Expert', icon: LayoutTemplate },
  { name: 'Tailwind CSS', level: 'Expert', icon: LayoutTemplate },
  { name: 'Data Validation', level: 'Expert', icon: Database },
  { name: 'UI Testing', level: 'Expert', icon: FlaskConical },
  { name: 'Bug Identification & Documentation', level: 'Proficient', icon: Bug },
  { name: 'Dataset Review and Verification', level: 'Expert', icon: CheckCircle2 },
  { name: 'Manual Quality Assurance', level: 'Advanced', icon: ShieldAlert },
  { name: 'Technical Documentation', level: 'Advanced', icon: FileText }
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      let ctx = gsap.context(() => {
        gsap.fromTo('.skill-chip', 
          {
            scale: 0.8,
            opacity: 0,
            y: 20
          },
          {
            scrollTrigger: {
              trigger: '.skills-grid',
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'back.out(1.7)'
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-32 px-6 md:px-16 bg-primary relative z-20 min-h-screen flex flex-col justify-center border-t border-background/5">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="mb-24 md:mb-32 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-6 block">
            02 // Capabilities
          </span>
          <h2 className="font-sans font-bold text-5xl md:text-7xl text-background tracking-tighter">
            Technical <br className="hidden md:block"/>
            <span className="text-accent font-drama italic font-normal tracking-wide lowercase">Inventory.</span>
          </h2>
        </div>

        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-center md:justify-start w-full">
          {hardcodedSkills.map((skill, idx) => {
            const Icon = skill.icon || Fingerprint;
            return (
              <div 
                key={idx} 
                className="skill-chip group relative overflow-hidden bg-dark/40 border border-background/10 hover:border-accent/50 rounded-2xl px-4 md:px-6 py-4 flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(123,97,255,0.15)] hover:-translate-y-1 w-full"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 w-10 h-10 rounded-full bg-background/5 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Icon size={18} className="text-background/60 group-hover:text-accent transition-colors" />
                </div>
                
                <div className="relative z-10 flex flex-col min-w-0 pr-2">
                  <span className="font-sans font-bold text-background tracking-tight leading-tight break-words">{skill.name}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
