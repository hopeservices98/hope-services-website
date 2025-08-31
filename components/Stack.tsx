import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen.ts';
import { DatabaseIcon } from './icons/DatabaseIcon.tsx';
import { CloudIcon } from './icons/CloudIcon.tsx';
import { CogIcon } from './icons/CogIcon.tsx';
import { ApiIcon } from './icons/ApiIcon.tsx';
import { AnimatedTitle } from './AnimatedTitle.tsx';

const stackItems = [
    {
        icon: <DatabaseIcon className="w-8 h-8 mb-4 text-brand-primary" />,
        title: "Définition des Sources & Schémas",
        description: "Nous définissons avec vous les entités à surveiller (produits, concurrents) et le schéma de données de sortie JSON.",
    },
    {
        icon: <CloudIcon className="w-8 h-8 mb-4 text-brand-primary" />,
        title: "Collection via Workers Distribués",
        description: "Notre infrastructure scanne les sources à grande échelle de manière éthique et robuste, en respectant les bonnes pratiques.",
    },
    {
        icon: <CogIcon className="w-8 h-8 mb-4 text-brand-primary" />,
        title: "Pipeline de Traitement & d'Enrichissement (ETL)",
        description: "La donnée brute est nettoyée, normalisée, et classifiée (Bug, Feature Request) via notre pipeline de traitement NLP.",
    },
    {
        icon: <ApiIcon className="w-8 h-8 mb-4 text-brand-primary" />,
        title: "Livraison des Données via API et Intégrations",
        description: "Consommez les données via API REST/GraphQL, recevez des alertes via webhooks (Slack) ou des tickets auto-créés (Jira, Linear).",
    }
];

const Stack: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef);

    return (
        <section id="stack" className="py-20 bg-brand-gray overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <AnimatedTitle text="Notre Stack Technique & Méthodologie" className="text-3xl md:text-4xl font-bold text-white font-mono" />
                     <p className="text-lg text-brand-light-gray mt-4 max-w-3xl mx-auto">
                        Une plateforme de data engineering robuste pour vous donner un accès programmatique à la voix de votre marché.
                    </p>
                </div>
                <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stackItems.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-brand-dark p-6 rounded-lg border border-brand-border motion-safe:transition-opacity motion-safe:duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transitionDelay: `${isVisible ? index * 150 : 0}ms` }}
                        >
                            {item.icon}
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-brand-light-gray text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stack;