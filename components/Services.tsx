import React, { useRef } from 'react';
import { CheckIcon } from './icons/CheckIcon.tsx';
import { useOnScreen } from '../hooks/useOnScreen.ts';
import { AnimatedTitle } from './AnimatedTitle.tsx';

const plans = [
  {
    name: "ESSENTIEL",
    price: "250€",
    period: "/ mois",
    subtext: "Idéal pour démarrer",
    description: "Pour les entreprises qui veulent commencer à exploiter les données du web.",
    features: [
      "Accès complet à notre API de données",
      "Surveillance jusqu'à 5 sources",
      "Dashboard de visualisation",
      "Support par email",
    ],
    cta: "Commencer",
    popular: false,
  },
  {
    name: "ÉQUIPE PRO",
    price: "750€",
    period: "/ mois",
    subtext: "À partir de",
    description: "Pour les équipes qui veulent maximiser leur efficacité et leur réactivité.",
    features: [
      "Tous les avantages de ESSENTIEL",
      "Intégrations à vos outils (Slack, Trello...)",
      "Rapports d'analyse automatisés",
      "Surveillance jusqu'à 20 sources",
      "Support prioritaire",
    ],
    cta: "Choisir Équipe Pro",
    popular: true,
  },
  {
    name: "STRATÉGIQUE",
    price: "Sur Devis",
    period: "",
    subtext: "Généralement à partir de 2,500€ / mois",
    description: "Pour les entreprises qui veulent un avantage concurrentiel décisif.",
    features: [
      "Tous les avantages de ÉQUIPE PRO",
      "Tableaux de bord concurrentiels en temps réel",
      "Accès à nos modèles prédictifs",
      "Sources illimitées",
      "Accompagnement et support dédiés",
    ],
    cta: "Contactez-nous",
    popular: false,
  },
];

const Services: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef);

    const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({
            behavior: 'smooth'
        });
    }

  return (
    <section id="services" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="text-center mb-12"
        >
          <AnimatedTitle text="Des Offres Conçues pour la Croissance" className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
            Choisissez le plan qui s'adapte à la maturité de votre entreprise et de vos processus.
          </p>
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-brand-gray rounded-lg border ${plan.popular ? 'border-brand-primary' : 'border-brand-border'} p-8 flex flex-col relative fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}
            >
              {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 right-8 bg-brand-primary text-black text-sm font-semibold px-4 py-1 rounded-full">
                  Le plus populaire
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-brand-light-gray mb-6 min-h-[48px]">{plan.description}</p>
                
                <div className="mb-6 text-left">
                  {plan.subtext && <p className="text-sm text-brand-light-gray">{plan.subtext}</p>}
                  <p>
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-brand-light-gray">{plan.period}</span>}
                  </p>
                </div>
                
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-brand-primary mr-3 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#planifier" onClick={(e) => scrollTo(e, '#planifier')} className={`w-full text-center font-semibold py-3 rounded-lg mt-8 transition-colors ${plan.popular ? 'bg-brand-primary text-black hover:bg-emerald-300' : 'bg-brand-dark hover:bg-brand-border border border-brand-border'}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;