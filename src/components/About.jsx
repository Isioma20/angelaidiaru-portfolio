import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      let ctx = gsap.context(() => {
        gsap.from('.about-text-line', {
          scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out'
        });
        
      }, sectionRef);
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative bg-background z-20 overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row w-full">
        
        <div className="w-full lg:w-5/12 relative">
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-6 md:px-16 pt-32 lg:pt-0 z-10 pointer-events-none">
            <h2 className="font-sans font-bold text-5xl md:text-7xl lg:text-7xl text-dark tracking-tighter">
              Technical<br/>
              <span className="text-accent font-drama italic font-normal tracking-wide lowercase">Profile</span>
            </h2>
            <div className="w-16 h-[2px] bg-dark mt-8" />
            <span className="font-mono text-xs uppercase tracking-widest text-dark/40 mt-6 block">
              01 // About
            </span>
          </div>
        </div>

        <div className="w-full lg:w-7/12 flex flex-col justify-center px-6 md:px-16 lg:px-24 pb-32 pt-16 lg:pt-[30vh] lg:pb-[30vh]">
          <div className="about-content max-w-2xl relative">
            
            <div className="absolute -left-8 lg:-left-12 top-2 h-full w-[1px] bg-dark/10 hidden md:block">
              <div className="w-2 h-2 rounded-full bg-accent absolute -left-[3px] top-0 shadow-[0_0_10px_#7B61FF]" />
            </div>

            <p className="about-text-line font-sans text-xl md:text-3xl text-dark font-medium leading-[1.6] tracking-tight mb-8">
              I am a frontend developer focused on building clear, maintainable web interfaces.
            </p>

            <p className="about-text-line font-sans text-lg md:text-xl text-dark/70 leading-[1.7] mb-8">
              Working primarily with <span className="text-dark font-mono font-semibold text-sm bg-dark/5 px-2 py-1 rounded">HTML</span>, <span className="text-dark font-mono font-semibold text-sm bg-dark/5 px-2 py-1 rounded">CSS</span>, <span className="text-dark font-mono font-semibold text-sm bg-dark/5 px-2 py-1 rounded">JavaScript</span>, <span className="text-dark font-mono font-semibold text-sm bg-dark/5 px-2 py-1 rounded">React</span>, and <span className="text-dark font-mono font-semibold text-sm bg-dark/5 px-2 py-1 rounded">TypeScript</span>, I develop responsive applications that emphasise structure, usability, and thoughtful implementation.
            </p>

            <p className="about-text-line font-sans text-lg md:text-xl text-dark/70 leading-[1.7]">
              I also contribute to open-source projects, collaborating with distributed teams to build tools and improve shared software ecosystems.
            </p>

          </div>
        </div>

      </div>

    </section>
  );
}
