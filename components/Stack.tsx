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
        title: "Définition des Sources & Formats",
        description: "Nous définissons avec vous les entités à surveiller (marques, concurrents) et le format des données dont vous avez besoin.",
    },
    {
        icon: <CloudIcon className="w-8 h-8 mb-4 text-brand-primary" />,
        title: "Collection via Workers Distribués",
        description: "Notre infrastructure scanne les sources à grande échelle de manière éthique et robuste, en respectant les bonnes pratiques.",
    },
    {
        icon: <CogIcon className="w-8 h-8 mb-4 text-brand-primary" />,
        title: "Pipeline de Traitement & d'Enrichissement",
        description: "La donnée brute est nettoyée, normalisée, et classifiée (Problème, Opportunité) via notre pipeline de traitement.",
    },
    {
        icon: <ApiIcon className="w-8 h-8 mb-4 text-brand-primary" />,
        title: "Livraison des Données via API et Rapports",
        description: "Consommez les données via notre API, recevez des alertes via webhooks (Slack) ou des rapports automatisés (Email, etc.).",
    }
];

const Stack: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef);

    return (
        <section id="processus" className="py-20 bg-brand-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <AnimatedTitle text="Notre Processus & Méthodologie" className="text-3xl md:text-4xl font-bold text-white font-mono" />
                     <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
                        Une plateforme de données robuste pour vous donner un accès direct à la voix de votre marché.
                    </p>
                </div>
                <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stackItems.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-brand-dark p-6 rounded-lg border border-brand-border fade-in ${isVisible ? 'visible' : ''}`}
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