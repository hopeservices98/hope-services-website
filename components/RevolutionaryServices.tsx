import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen.ts';
import { AnimatedTitle } from './AnimatedTitle.tsx';

const services = [
  {
    title: `"Rapports d'Opportunités" Clé en Main`,
    description: "Recevez des rapports d'analyse directement dans vos outils, avec les problèmes clients et les opportunités de marché déjà identifiés et quantifiés. Votre équipe n'a plus qu'à agir.",
    revolutionary: "Vous automatisez la collecte et la qualification des besoins, la partie la plus chronophage de la veille stratégique."
  },
  {
    title: "Veille Concurrentielle Continue",
    description: `Suivez en temps réel les forces et faiblesses de vos concurrents sur des critères clés (satisfaction client, problèmes de service, etc.) via nos tableaux de bord interactifs.`,
    revolutionary: `Nous offrons de l'intelligence concurrentielle en tant que service, actionnable et toujours à jour.`
  },
  {
    title: "Moteur de Simulation Stratégique",
    description: `Utilisez nos modèles prédictifs pour simuler vos initiatives stratégiques. "Quel sera l'impact sur la satisfaction client si nous lançons le service A et améliorons le processus B ?".`,
    revolutionary: `Passez de l'analyse descriptive (ce qui s'est passé) à l'analyse prédictive (ce qui se passera), un outil d'aide à la décision pour les dirigeants.`
  }
]

const RevolutionaryServices: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <section id="revolution" className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-12"
        >
          <AnimatedTitle text="Aller Au-Delà de la Donnée Brute" className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
            Nos services avancés transforment les insights en actions et en stratégies prédictives.
          </p>
        </div>
        <div ref={sectionRef} className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index} 
              className={`bg-brand-dark border border-brand-border rounded-lg p-6 md:p-8 fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}
            >
                <span className="inline-block bg-brand-primary/10 text-brand-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">Service Révolutionnaire</span>
                <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-brand-light-gray mb-6">{service.description}</p>
                <p className="text-white bg-brand-gray p-4 rounded-md border border-brand-border">
                    <span className="font-semibold">Pourquoi c'est révolutionnaire :</span> {service.revolutionary}
                </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RevolutionaryServices;