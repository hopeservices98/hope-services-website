import React, { useRef } from 'react';
import { HypothesisIcon } from './icons/HypothesisIcon.tsx';
import { NoiseIcon } from './icons/NoiseIcon.tsx';
import { MagnifyIcon } from './icons/MagnifyIcon.tsx';
import { useOnScreen } from '../hooks/useOnScreen.ts';
import { AnimatedTitle } from './AnimatedTitle.tsx';

const problems = [
  {
    icon: <HypothesisIcon className="w-10 h-10 text-brand-primary mb-4" />,
    title: "Stratégies Basées sur l'Hypothèse",
    description: "Votre plan d'action est une liste de 'peut-être'. Sans data pour le quantifier, comment savoir si vous lancez un produit indispensable ou un service inutile ?",
  },
  {
    icon: <NoiseIcon className="w-10 h-10 text-brand-primary mb-4" />,
    title: "Feedback Client Inexploitable",
    description: "Les retours décisifs sont noyés dans le bruit de Discord, Reddit, Twitter/X. Vous passez à côté de retours critiques et d'opportunités de marché en or.",
  },
  {
    icon: <MagnifyIcon className="w-10 h-10 text-brand-primary mb-4" />,
    title: "Analyse Concurrentielle Superficielle",
    description: "Vous connaissez le marketing de vos concurrents, mais connaissez-vous leurs faiblesses opérationnelles perçues ? C'est là que se trouvent vos plus grandes opportunités.",
  },
];

const Problem: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridVisible = useOnScreen(gridRef);
  
  return (
    <section id="probleme" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedTitle text="Décider à l'aveugle coûte cher." className="text-3xl md:text-4xl font-bold text-white font-mono" />
            <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
              Vos équipes sont votre ressource la plus précieuse. Pourtant, chaque jour, des décisions critiques sont prises sur la base d'intuitions ou de retours clients fragmentés.
            </p>
          </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className={`bg-brand-gray p-8 rounded-lg border border-brand-border fade-in ${isGridVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${isGridVisible ? index * 150 : 0}ms` }}
            >
              {problem.icon}
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-brand-light-gray">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;