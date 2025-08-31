import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen.ts';
import { AnimatedTitle } from './AnimatedTitle.tsx';
import { ListeningIcon } from './icons/ListeningIcon.tsx';
import { UnderstandingIcon } from './icons/UnderstandingIcon.tsx';
import { OrganizingIcon } from './icons/OrganizingIcon.tsx';
import { DeliveringIcon } from './icons/DeliveringIcon.tsx';

const steps = [
  {
    icon: <ListeningIcon className="w-10 h-10 text-brand-primary mb-4" />,
    step: "ÉTAPE 01",
    title: "ÉCOUTER",
    description: "Nos 'oreilles' numériques parcourent le web en continu (forums, réseaux sociaux, etc.) pour capter toutes les conversations pertinentes sur votre produit et vos concurrents.",
  },
  {
    icon: <UnderstandingIcon className="w-10 h-10 text-brand-primary mb-4" />,
    step: "ÉTAPE 02",
    title: "COMPRENDRE",
    description: "Notre intelligence artificielle lit et analyse chaque phrase. Elle sait si c'est un bug, une idée de fonctionnalité, ou un simple avis, et en mesure le sentiment (positif, négatif).",
  },
  {
    icon: <OrganizingIcon className="w-10 h-10 text-brand-primary mb-4" />,
    step: "ÉTAPE 03",
    title: "ORGANISER",
    description: "Nous transformons ce chaos d'informations en 'fiches' de données claires et structurées (format JSON), faciles à utiliser pour n'importe quelle machine ou logiciel.",
  },
  {
    icon: <DeliveringIcon className="w-10 h-10 text-brand-primary mb-4" />,
    step: "ÉTAPE 04",
    title: "LIVRER",
    description: "Nous vous livrons ces fiches là où vous en avez besoin : directement dans vos outils (Jira, Slack) ou via notre API pour que vos développeurs puissent construire dessus.",
  },
];

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <section id="comment-ca-marche" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="text-center mb-12"
        >
          <AnimatedTitle text="De la Donnée Brute à la Décision Claire" className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
            Notre service est une machine qui transforme les conversations publiques en un signal clair pour vos équipes techniques. Voici comment.
          </p>
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`bg-brand-gray p-6 rounded-lg border border-brand-border flex flex-col fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}
            >
              {step.icon}
              <p className="text-sm font-semibold text-brand-primary mb-2">{step.step}</p>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-brand-light-gray text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        <div className={`mt-16 bg-brand-gray p-8 rounded-lg border border-brand-border text-center fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${isVisible ? (steps.length * 150) + 200 : 0}ms` }}>
            <h3 className="text-2xl font-bold text-white mb-3">Le Résultat ?</h3>
            <p className="text-lg text-brand-light-gray max-w-4xl mx-auto">
                Vous n'achetez pas juste de la donnée. Vous obtenez des réponses structurées aux questions que vous vous posez chaque jour : "Sur quoi devons-nous travailler ensuite ?", "Quels sont les bugs les plus urgents ?", "Où nos concurrents sont-ils faibles ?". Le tout, livré en temps réel.
            </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;