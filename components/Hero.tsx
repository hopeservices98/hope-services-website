import React, { useRef } from 'react';
import MatrixBackground from './MatrixBackground.tsx';
import { useOnScreen } from '../hooks/useOnScreen.ts';
import { AnimatedTitle } from './AnimatedTitle.tsx';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({
        behavior: 'smooth'
    });
  }

  return (
    <section id="hero" ref={sectionRef} className="relative text-center overflow-hidden pt-40 pb-32">
       <MatrixBackground />
       <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/80 to-brand-dark"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <AnimatedTitle 
          as="h1" 
          text="Votre Roadmap, Pilotée par l'API." 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-mono"
        />
        <p className={`text-lg md:text-xl text-brand-light-gray max-w-3xl mx-auto mb-10 fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '1500ms' }}>
          Cessez de développer sur des suppositions. Nous transformons les conversations publiques du web en un flux de données structurées pour alimenter votre backlog et accélérer vos décisions techniques.
        </p>
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 fade-in ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '1800ms' }}
        >
          <a href="#planifier" onClick={(e) => scrollTo(e, '#planifier')} className="w-full sm:w-auto bg-brand-primary text-black font-semibold px-6 py-3 rounded-lg text-lg hover:bg-emerald-300 transition-colors duration-300">
            📞 Planifier une Démo Technique
          </a>
          <a href="#comment-ca-marche" onClick={(e) => scrollTo(e, '#comment-ca-marche')} className="w-full sm:w-auto bg-brand-gray text-white font-semibold px-6 py-3 rounded-lg text-lg border border-brand-border hover:bg-brand-border transition-colors duration-300">
            🖲️ Découvrir notre Pipeline
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
