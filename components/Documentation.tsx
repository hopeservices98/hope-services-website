import React from 'react';
import { AnimatedTitle } from './AnimatedTitle.tsx';
import { CodeBlock } from './CodeBlock.tsx';

const curlExample = `curl "https://api.hope-services.com/v1/insights?type=bug" \\
  -H "Authorization: Bearer VOTRE_CLE_API"`;

const javascriptExample = `const fetchInsights = async () => {
  const response = await fetch('https://api.hope-services.com/v1/insights?type=bug', {
    headers: {
      'Authorization': 'Bearer VOTRE_CLE_API'
    }
  });
  const data = await response.json();
  console.log(data);
};

fetchInsights();`;

const jsonExample = `{
  "data": [
    {
      "id": "ins_1a2b3c4d5e6f",
      "content": "L'authentification via Google échoue sur Android 14 avec la dernière mise à jour.",
      "source": {
        "platform": "discord",
        "url": "https://discord.com/channels/..."
      },
      "type": "bug_report",
      "sentiment": {
        "score": -0.85,
        "label": "négatif"
      },
      "timestamp": "2024-05-21T10:30:00Z",
      "tags": ["login", "android", "auth"]
    }
  ],
  "pagination": {
    "next_cursor": "..."
  }
}`;

const Documentation: React.FC = () => {
  return (
    <section id="documentation" className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedTitle text="Documentation API" className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
            Notre API est conçue pour être simple, prévisible et efficace. Voici comment commencer en quelques minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Colonne de gauche: Explications */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Démarrage Rapide</h3>
              <p className="text-brand-light-gray">
                Toutes les requêtes sont authentifiées via une clé API. Vous pouvez obtenir votre clé en planifiant une démo avec nous. L'URL de base de l'API est : 
                <code className="text-sm bg-brand-dark border border-brand-border rounded-md px-2 py-1 mx-1.5 font-mono text-brand-primary">https://api.hope-services.com/v1</code>
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Authentification</h3>
              <p className="text-brand-light-gray">
                Pour vous authentifier, passez votre clé API dans l'en-tête <code className="text-sm bg-brand-dark border border-brand-border rounded-md px-2 py-1 mx-1.5 font-mono text-gray-300">Authorization</code> en utilisant le schéma <code className="text-sm bg-brand-dark border border-brand-border rounded-md px-2 py-1 mx-1.5 font-mono text-gray-300">Bearer</code>.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Endpoint Principal</h3>
              <p className="text-brand-light-gray mb-4">
                Le point d'accès principal pour récupérer les insights est <code className="text-sm bg-brand-dark border border-brand-border rounded-md px-2 py-1 mx-1.5 font-mono text-gray-300">/insights</code>. Il supporte plusieurs paramètres de filtrage :
              </p>
              <ul className="space-y-2 text-brand-light-gray">
                <li><code className="font-mono text-white">type</code> : 'bug_report', 'feature_request'</li>
                <li><code className="font-mono text-white">source</code> : 'discord', 'reddit', etc.</li>
                <li><code className="font-mono text-white">sentiment</code> : 'positif', 'négatif', 'neutre'</li>
              </ul>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-white mb-4">Structure de la Donnée</h3>
                <p className="text-brand-light-gray">
                    Toutes les réponses de l'API sont au format JSON. Voici un exemple d'un objet <code className="font-mono text-white">insight</code>.
                </p>
            </div>
          </div>
          
          {/* Colonne de droite: Exemples de code */}
          <div className="relative">
            <div className="lg:sticky top-24 space-y-8">
              <CodeBlock language="bash" title="Exemple cURL">
                  {curlExample}
              </CodeBlock>
              <CodeBlock language="javascript" title="Exemple JavaScript (fetch)">
                  {javascriptExample}
              </CodeBlock>
              <CodeBlock language="json" title="Exemple de Réponse JSON">
                  {jsonExample}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation;