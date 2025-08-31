import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { AnimatedTitle } from './AnimatedTitle';

const services = [
  {
    title: `"Backlog-as-a-Service" Pré-priorisé`,
    description: "Recevez des tickets auto-créés et mis à jour dans Jira/Linear, pré-remplis avec description, sources, score de popularité et tag (Bug, Feature). Le PM n'a plus qu'à affiner et assigner.",
    revolutionary: "Vous automatisez la collecte et la qualification des besoins, la partie la plus chronophage de la gestion de produit."
  },
  {
    title: "API de Benchmarking Technique en Temps Réel",
    description: `Accédez à des endpoints d'API pour comparer des produits. Ex: GET /benchmark?products=A,B&metric=bug_reports. Construisez des dashboards internes qui suivent la "santé technique perçue" de vos concurrents.`,
    revolutionary: `Nous offrons de la "Competitive Intelligence" en tant que service purement technique, quantifiable et intégrable.`
  },
  {
    title: "Moteur de Prédiction d'Impact de Roadmap",
    description: `Utilisez nos modèles prédictifs pour simuler votre roadmap. "Quel sera l'impact sur le sentiment global si nous développons les features A et B ?". Le modèle se base sur le "poids" et le sentiment des demandes passées.`,
    revolutionary: `Passez de l'analyse descriptive (ce qui s'est passé) à l'analyse prédictive (ce qui se passera), un outil d'aide à la décision pour CTOs et CPOs.`
  }
]

const RevolutionaryServices: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <section id="revolution" className="py-20 bg-brand-gray overflow-hidden">
      <div className="container mx-auto px-6">
        <div
          className="text-center mb-12"
        >
          <AnimatedTitle text="Aller Au-Delà de la Donnée Brute" className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="text-lg text-brand-light-gray mt-4 max-w-3xl mx-auto">
            Nos services avancés transforment les insights en actions et en stratégies prédictives.
          </p>
        </div>
        <div ref={sectionRef} className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index} 
              className={`bg-brand-dark p-8 rounded-lg border border-brand-border motion-safe:transition-all motion-safe:duration-300 hover:border-brand-primary/50 motion-safe:transition-opacity motion-safe:duration-700 motion-safe:ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}
            >
                <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">Service Révolutionnaire</span>
                <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-brand-light-gray mb-4">{service.description}</p>
                <p className="text-white bg-brand-gray/50 p-4 rounded-md border border-brand-border/50">
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