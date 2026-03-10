import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const defaultProjects = [
  { name: 'Greenseal pharmaceuticals', summary: 'Pharmaceutical brand website featuring product listings and a streamlined checkout experience.', website: 'https://www.greensealhealthcare.com/', url: 'https://www.greensealhealthcare.com/', primaryLanguage: 'TypeScript', languages: ['TypeScript', 'React', 'Static Site Generation', 'Responsive Web Design'], images: ['/images/optimized/Greenseal.webp', '/images/optimized/Greenseal-2.webp', '/images/optimized/Greenseal-3.webp'] },
  { name: 'React Jobs Website', summary: 'Platform for finding and posting React role opportunities.', website: 'https://react-jobs-virid-iota.vercel.app', url: 'https://react-jobs-virid-iota.vercel.app', primaryLanguage: 'JavaScript', languages: ['JavaScript', 'HTML', 'CSS', 'Client-Side Rendering'], images: ['/images/optimized/Jobsearch.webp', '/images/optimized/Jobsearch-2.webp'] },
  { name: 'Admin Dashboard UI', summary: 'A responsive admin dashboard UI with toggle-able light and dark modes', website: 'https://admin-dashboard-ui-jet.vercel.app', url: 'https://admin-dashboard-ui-jet.vercel.app', primaryLanguage: 'JavaScript', languages: ['JavaScript', 'CSS', 'HTML', 'Interactive User Interfaces', 'Structured Layout Design'], images: ['/images/optimized/Dashboard.webp', '/images/optimized/Dashboard-2.webp'] },
  { name: 'Banner Project', summary: 'Built and tested a prototype tool for configurable MediaWiki CentralNotice banners.', website: 'https://wikibanner.vercel.app', url: 'https://wikibanner.vercel.app', primaryLanguage: 'JavaScript', languages: ['JavaScript', 'CSS', 'HTML', 'User-Centred Interface Design'], images: ['/images/optimized/Banner.webp'] }
];

const ImageSlideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 2000); // Switch every 2 seconds
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-primary rounded-[2.5rem] md:rounded-[3rem]">
      {images && images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Slide ${i}`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${i === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-background/5 pointer-events-none" />
    </div>
  );
};

export default function Works() {
  const [projects, setProjects] = useState([]);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    fetch('https://gitconnected.com/api/v1/resume/isioma20')
      .then(res => res.json())
      .then(data => {
        if(data && data.projects && data.projects.length > 0) {
          const apiProjects = data.projects;
          
          const reactJobs = apiProjects.find(p => p.name === 'React Jobs Website');
          if (reactJobs) {
            reactJobs.website = 'https://react-jobs-virid-iota.vercel.app';
            reactJobs.url = 'https://react-jobs-virid-iota.vercel.app';
            reactJobs.images = ['/images/optimized/Jobsearch.webp', '/images/optimized/Jobsearch-2.webp'];
            reactJobs.languages = ['JavaScript', 'HTML', 'CSS', 'Client-Side Rendering'];
          }
          
          const banner = apiProjects.find(p => p.name === 'Banner Project' || p.name === 'Banner  Project');
          if (banner) {
            banner.website = 'https://wikibanner.vercel.app';
            banner.url = 'https://wikibanner.vercel.app';
            banner.name = 'Banner Project'; // Normalize naming
            banner.images = ['/images/optimized/Banner.webp'];
            banner.languages = ['JavaScript', 'CSS', 'HTML', 'User-Centred Interface Design'];
          }
          
          const adminDash = apiProjects.find(p => p.name === 'Admin Dashboard UI');
          if (adminDash) {
            adminDash.website = 'https://admin-dashboard-ui-jet.vercel.app';
            adminDash.url = 'https://admin-dashboard-ui-jet.vercel.app';
            adminDash.images = ['/images/optimized/Dashboard.webp', '/images/optimized/Dashboard-2.webp'];
            adminDash.languages = ['JavaScript', 'CSS', 'HTML', 'Interactive User Interfaces', 'Structured Layout Design'];
          }
          
          const greenseal = {
            name: 'Greenseal pharmaceuticals',
            summary: 'Pharmaceutical brand website featuring product listings and a streamlined checkout experience.',
            website: 'https://www.greensealhealthcare.com/',
            url: 'https://www.greensealhealthcare.com/',
            primaryLanguage: 'TypeScript',
            languages: ['TypeScript', 'React', 'Static Site Generation', 'Responsive Web Design'],
            images: ['/images/optimized/Greenseal.webp', '/images/optimized/Greenseal-2.webp', '/images/optimized/Greenseal-3.webp']
          };

          const finalProjects = [greenseal];
          if (reactJobs) finalProjects.push(reactJobs);
          // Swapped Order: Admin Dashboard is now 3rd, Banner is 4th.
          if (adminDash) finalProjects.push(adminDash);
          if (banner) finalProjects.push(banner);

          setProjects(finalProjects);
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
        
        // 1. Give the physical card a vertical pop and fade
        gsap.from(card.querySelector('.card-inner'), {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
        
        // 2. Add staggered bouncy reveals to the text inside the card vertically
        const textElements = card.querySelectorAll('.card-content-reveal');
        gsap.fromTo(textElements, 
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'back.out(2)', // Vertical bounce bounce settling
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  if (projects.length === 0) return null;

  return (
    <section id="works" ref={containerRef} className="bg-background py-20 md:py-32 overflow-hidden w-full relative">
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-12 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6 w-full shrink-0">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block">
            03 // Production
          </span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark tracking-tight">
            Selected <span className="text-accent font-drama italic font-normal tracking-wide lowercase">Archive.</span>
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-dark/30">
          <span>Scroll</span>
          <div className="w-4 h-4 border-b border-r border-dark/30 transform rotate-45" />
        </div>
      </div>
      
      {/* Vertical Cards Container */}
      <div 
        className="flex flex-col w-full max-w-7xl mx-auto gap-16 md:gap-32 px-6 md:px-16 pb-12 pt-4"
      >
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            ref={el => cardsRef.current[idx] = el}
            className="w-full shrink-0"
          >
            <div className="card-inner w-full h-[65vh] md:h-[75vh] bg-primary rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative group overflow-hidden border border-background/10">
              
              {/* Background Image Slideshow Layer */}
              <ImageSlideshow images={project.images} />

              {/* Bottom half text overlay constraint with readable gradient - Fades out on hover after 1s delay */}
              <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-8 md:p-12 z-10 pointer-events-none transition-opacity duration-700 ease-in-out group-hover:opacity-0 delay-0 group-hover:delay-1000">
                
                {/* Fade-to-black backing for text legibility against colorful images */}
                <div className="absolute bottom-0 left-0 w-full h-[75%] bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-[-1]" />
                
                {/* Text Content - Added pb-20 to clear the absolute positioned tags/button below */}
                <div className="relative pointer-events-auto flex flex-col justify-end pb-24 md:pb-28">
                  <div className="card-content-reveal font-mono text-sm md:text-lg text-accent mb-4 font-bold tracking-widest bg-accent/10 w-min px-4 py-1 rounded-full border border-accent/20">
                    0{idx + 1}.
                  </div>
                  
                  <h3 className="card-content-reveal font-sans font-bold text-3xl md:text-5xl text-background mb-4 tracking-tighter">
                    {project.name}
                  </h3>
                  
                  <p className="card-content-reveal font-sans text-base md:text-lg text-background/80 leading-[1.6] max-w-3xl">
                    {project.summary || 'Production environment deployed. Core logic integrated and stabilized.'}
                  </p>
                </div>
              </div>
              
              {/* Isolated Persistent Button and Tags - Always Visible */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex items-center justify-between z-20 pointer-events-auto">
                 {project.languages && project.languages.length > 0 ? (
                    <div className="card-content-reveal flex flex-wrap items-center gap-2">
                      {project.languages.map((lang, lIdx) => (
                        <span key={lIdx} className="font-mono text-[10px] md:text-xs text-background/90 bg-[#050505]/60 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap border border-background/20">
                          {lang}
                        </span>
                      ))}
                    </div>
                  ) : <div />}

                  <a 
                    href={project.url || '#'} 
                    target="_blank" 
                    rel="noreferrer"
                    className="card-content-reveal font-sans font-semibold text-sm md:text-base text-background flex items-center gap-3 group/link hover:text-accent transition-colors bg-[#050505]/60 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full border border-background/20 shadow-lg"
                  >
                    <span>View Project</span>
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
