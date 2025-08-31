import React, { useRef } from 'react';
import MatrixBackground from './MatrixBackground';
import { useOnScreen } from '../hooks/useOnScreen';
import { useMatrixText } from '../hooks/useMatrixText';

const AnimatedTitle: React.FC<{ text: string; as?: 'h1' | 'h2'; className?: string; }> = ({ text, as = 'h1', className }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isVisible = useOnScreen(ref);
  const animatedText = useMatrixText(text, isVisible, 30);
  const Tag = as;

  return (
    <Tag ref={ref} className={className}>
      {animatedText || <span className="opacity-0">{text}</span>}
    </Tag>
  );
};

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
    <section id="hero" ref={sectionRef} className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center overflow-hidden">
       <MatrixBackground />
       <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/80 to-brand-dark"></div>
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedTitle 
          as="h1" 
          text="Votre Roadmap, Pilotée par l'API." 
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 font-mono"
        />
        <p className={`text-lg md:text-xl text-brand-light-gray max-w-3xl mx-auto mb-8 transition-opacity duration-1000 ease-out motion-safe:${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1500ms' }}>
          Cessez de développer sur des suppositions. Nous transformons les conversations publiques du web en un flux de données structurées pour alimenter votre backlog et accélérer vos décisions techniques.
        </p>
        <div 
          className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 transition-opacity duration-1000 ease-out motion-safe:${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '1800ms' }}
        >
          <a href="#planifier" onClick={(e) => scrollTo(e, '#planifier')} className="w-full sm:w-auto bg-brand-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-emerald-600 transition-all duration-300 transform motion-safe:hover:scale-105">
            📞 Planifier une Démo Technique
          </a>
          <a href="#comment-ca-marche" onClick={(e) => scrollTo(e, '#comment-ca-marche')} className="w-full sm:w-auto bg-brand-gray border border-brand-border text-white font-semibold px-8 py-3 rounded-md hover:bg-brand-border transition-all duration-300">
            🖲️ Découvrir notre Pipeline
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
