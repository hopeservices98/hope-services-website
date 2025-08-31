import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen.ts';
import { AnimatedTitle } from './AnimatedTitle.tsx';

const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const testimonials = [
  {
    quote: "L'API de HOPE-SERVICES nous a permis de diviser par trois le temps de qualification des features. On ne navigue plus à l'aveugle, on code ce que les utilisateurs attendent VRAIMENT.",
    name: "Julien Lemoine",
    title: "CTO @ ScaleUp SaaS",
  },
  {
    quote: "Le 'Backlog-as-a-Service' est une révolution. Mon équipe reçoit des tickets Jira clairs, sourcés et pré-qualifiés. C'est un gain de productivité énorme pour nos Product Managers.",
    name: "Claire Dubois",
    title: "Head of Product @ Fintech Innovante",
  },
  {
    quote: "On a pu identifier une faiblesse critique dans l'API de notre principal concurrent en moins d'une semaine. Cette information valait de l'or. C'est de la CI technique, pas du marketing.",
    name: "Alexandre Martin",
    title: "Lead Developer @ API-First Company",
  }
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <section id="temoignages" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedTitle text="Ils nous font confiance." className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
            Des leaders techniques et produit utilisent nos données pour construire de meilleurs logiciels, plus rapidement.
          </p>
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-brand-gray p-8 rounded-lg border border-brand-border flex flex-col fade-in ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}
            >
              <p className="text-brand-light-gray mb-6 flex-grow">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <UserCircleIcon className="w-12 h-12 text-brand-primary mr-4 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-brand-light-gray">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;