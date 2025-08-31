import React, { useRef } from 'react';
import { InsightIcon } from './icons/InsightIcon.tsx';
import { IntegrationIcon } from './icons/IntegrationIcon.tsx';
import { ApiIcon } from './icons/ApiIcon.tsx';
import { useOnScreen } from '../hooks/useOnScreen.ts';
import { AnimatedTitle } from './AnimatedTitle.tsx';

const solutions = [
  {
    icon: <InsightIcon className="w-10 h-10 text-brand-primary mb-4" />,
    title: "Des Insights, pas juste des Données",
    description: "Nous transformons le texte non structuré en insights techniques clairs : rapports de bugs, demandes de fonctionnalités, et benchmarks concurrentiels.",
  },
  {
    icon: <IntegrationIcon className="w-10 h-10 text-brand-primary mb-4" />,
    title: "Intégration Native",
    description: "Recevez les données là où vous travaillez. Poussez des tickets pré-qualifiés dans Jira, Linear ou Asana, et recevez des alertes critiques sur Slack.",
  },
  {
    icon: <ApiIcon className="w-10 h-10 text-brand-primary mb-4" />,
    title: "Accès Programmatique Complet",
    description: "Notre API REST/GraphQL vous donne un contrôle total pour interroger les données et alimenter vos propres dashboards et outils d'analyse.",
  },
];

const Solution: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <section id="solution" className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-12">
          <AnimatedTitle text="Intégrez le réel dans votre cycle de dev." className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
            Nous sommes une plateforme de Data-as-a-Service. Nous vous fournissons un pipeline de données fiable qui connecte vos outils de développement directement aux conversations de votre marché.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div 
              key={index} 
              className={`bg-brand-dark p-8 rounded-lg border border-brand-border fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}
            >
              {solution.icon}
              <h3 className="text-xl font-semibold text-white mb-3">{solution.title}</h3>
              <p className="text-brand-light-gray">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;