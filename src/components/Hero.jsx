import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxCanvas = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles = [];
    const particleCount = Math.floor(width * height / 12000);
    
    let mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 1.5 + 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }
      draw() {
        ctxCanvas.beginPath();
        ctxCanvas.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctxCanvas.fillStyle = '#7B61FF';
        ctxCanvas.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animateCanvas = () => {
      ctxCanvas.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Interaction with mouse
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mdistance = Math.sqrt(mdx * mdx + mdy * mdy);

          if (distance < 100) {
            let opacity = 1 - (distance / 100);
            
            // Connect to mouse if close enough (creates the dynamic lattice focus)
            if (mdistance < mouse.radius) {
              opacity += 0.4;
              ctxCanvas.strokeStyle = `rgba(240, 239, 244, ${opacity * 0.5})`; // White/Ghost accents near mouse
            } else {
              ctxCanvas.strokeStyle = `rgba(123, 97, 255, ${opacity * 0.2})`; // Plasma default
            }

            ctxCanvas.beginPath();
            ctxCanvas.moveTo(particles[i].x, particles[i].y);
            ctxCanvas.lineTo(particles[j].x, particles[j].y);
            ctxCanvas.stroke();
          }
        }
      }
      requestAnimationFrame(animateCanvas);
    };

    initParticles();
    animateCanvas();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    // -----------------------------------------
    // GSAP Text Entry
    // -----------------------------------------
    let gsapCtx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.8 // Wait for site load
      });
    }, containerRef);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      gsapCtx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] flex items-center justify-center pb-24 px-6 md:px-16 overflow-hidden bg-primary cursor-crosshair">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 bg-transparent block"
      />
      
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary via-primary/50 to-primary/10 pointer-events-none" />
      
      <div className="relative z-20 max-w-5xl text-background pointer-events-none flex flex-col items-center text-center mt-16">
        <h1 className="flex flex-col gap-0">
          <span className="hero-element font-sans font-bold text-4xl md:text-6xl tracking-tight text-background/90">
            Build. Test.
          </span>
          <span className="hero-element font-drama italic text-[5.5rem] leading-[0.8] md:text-[12rem] text-accent pr-4 drop-shadow-2xl lowercase">
            Perfect.
          </span>
        </h1>
        <p className="hero-element mt-10 max-w-md font-mono text-sm md:text-sm text-background/60 leading-relaxed uppercase tracking-widest">
          <span className="font-bold text-accent text-base md:text-xl block mb-2">Idiaru Angela</span>
          <span>// I'm a tech professional who loves turning ideas into reality and solving the exact puzzles needed to make everything run smoothly.</span>
        </p>
        <div className="hero-element mt-12 pointer-events-auto w-max">
          <button className="btn-magnetic btn-fill-hover btn-accent-to-primary px-8 py-4 rounded-3rem font-sans font-medium text-sm tracking-wide flex items-center gap-3 transition-colors duration-500 shadow-[0_0_30px_rgba(123,97,255,0.2)]">
            <span className="relative z-10 flex items-center gap-3">
              Contact me
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
