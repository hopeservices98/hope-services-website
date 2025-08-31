import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen.ts';
import { AnimatedTitle } from './AnimatedTitle.tsx';

const useCases = [
  {
    title: "Priorisez vos Projets avec des Données",
    before: `Avant : "Je pense qu'on devrait faire ça."`,
    after: `Après : "Le service X a été demandé 152 fois ce trimestre. Le projet est prioritaire."`,
  },
  {
    title: "Détectez les Problèmes Avant Tout le Monde",
    before: "Avant : Attendre que les clients mécontents contactent le support.",
    after: `Après : Alerte Slack : "Pic de mentions négatives sur notre service de livraison détecté."`,
  },
  {
    title: "Exploitez les Faiblesses des Concurrents",
    before: "Avant : Lire leurs communiqués de presse.",
    after: `Après : "Le service client du concurrent Y est 'lent' et 'peu réactif'. C'est notre point d'attaque."`,
  },
  {
    title: "Validez votre Stratégie à Moindre Coût",
    before: "Avant : Lancer un service et espérer qu'il soit utilisé.",
    after: "Après : Confirmer la demande du marché avant d'investir le premier euro.",
  },
];

const UseCases: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <section id="cas-usages" className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="text-center mb-12"
        >
          <AnimatedTitle text="Prenez des Décisions Stratégiques Plus Intelligentes" className="text-3xl md:text-4xl font-bold text-white font-mono" />
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index} 
              className={`bg-brand-dark p-8 rounded-lg border border-brand-border fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">{useCase.title}</h3>
              <div className="space-y-4">
                <p className="text-brand-light-gray line-through">{useCase.before}</p>
                <p className="text-white font-medium bg-emerald-900/50 border border-emerald-500/50 p-4 rounded-md">{useCase.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;