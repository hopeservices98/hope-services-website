import React, { useRef } from 'react';
import { HypothesisIcon } from './icons/HypothesisIcon';
import { NoiseIcon } from './icons/NoiseIcon';
import { MagnifyIcon } from './icons/MagnifyIcon';
import { useOnScreen } from '../hooks/useOnScreen';
import { AnimatedTitle } from './AnimatedTitle';

const problems = [
  {
    icon: <HypothesisIcon className="w-10 h-10 text-brand-primary mb-4" />,
    title: "Backlogs Basés sur l'Hypothèse",
    description: "Votre roadmap est une liste de 'peut-être'. Sans data pour le quantifier, comment savoir si vous construisez une fonctionnalité indispensable ou un gadget inutile ?",
  },
  {
    icon: <NoiseIcon className="w-10 h-10 text-brand-primary mb-4" />,
    title: "Feedback Utilisateur Inexploitable",
    description: "Les retours décisifs sont noyés dans le bruit de Discord, Reddit, Twitter/X. Vous passez à côté de rapports de bugs critiques et de demandes de fonctionnalités en or.",
  },
  {
    icon: <MagnifyIcon className="w-10 h-10 text-brand-primary mb-4" />,
    title: "Analyse Concurrentielle Superficielle",
    description: "Vous connaissez le marketing de vos concurrents, mais connaissez-vous leur dette technique perçue ? C'est là que se trouvent vos plus grandes opportunités.",
  },
];

const Problem: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridVisible = useOnScreen(gridRef);
  
  return (
    <section id="probleme" className="py-20 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <AnimatedTitle text="Coder dans le noir coûte cher." className="text-3xl md:text-4xl font-bold text-white font-mono" />
            <p className="text-lg text-brand-light-gray mt-4 max-w-3xl mx-auto">
              Votre équipe technique est votre ressource la plus précieuse. Pourtant, chaque jour, des décisions critiques sont prises sur la base d'intuitions ou de retours utilisateurs fragmentés.
            </p>
          </div>
        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className={`bg-brand-gray p-8 rounded-lg border border-brand-border transition-all duration-300 motion-safe:hover:-translate-y-2 motion-safe:hover:border-brand-primary/50 motion-safe:hover:shadow-lg motion-safe:hover:shadow-brand-primary/10
                         motion-safe:transition-opacity motion-safe:duration-700 motion-safe:ease-out ${isGridVisible ? 'opacity-100' : 'opacity-0'}`}
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