import React, { useState, useRef, FormEvent } from 'react';
import { useOnScreen } from '../hooks/useOnScreen.ts';
import { AnimatedTitle } from './AnimatedTitle.tsx';
import { SpinnerIcon } from './icons/SpinnerIcon.tsx';

// --- Local Icon Components ---
const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H9a.375.375 0 01-.375-.375v-1.5A.375.375 0 019 6.75zM9 12.75h6.375a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H9a.375.375 0 01-.375-.375v-1.5A.375.375 0 019 12.75z" />
  </svg>
);

const Scheduling: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);

  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    if (!formData.name || !formData.email || !formData.company) {
      setError('Tous les champs sont requis.');
      setStatus('error');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Veuillez entrer une adresse email valide.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError('');

    // Simulating API call
    setTimeout(() => {
      // Assuming the lead capture is successful
      setStatus('success');
    }, 1500);
  };

  // IMPORTANT: Replace with your actual Calendly link
  const calendlyUrl = `https://calendly.com/VOTRE_LIEN/demo?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;

  return (
    <section id="planifier" className="py-20 bg-brand-dark">
      <div 
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in ${isVisible ? 'visible' : ''}`}
      >
        <AnimatedTitle text={status !== 'success' ? "Prêt à arrêter de coder à l'aveugle ?" : "Planifiez votre démo"} className="text-3xl md:text-4xl font-bold text-white font-mono" />
        <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto mb-12">
          {status !== 'success' 
            ? "Planifiez une démo de 45 minutes avec un ingénieur pour découvrir comment intégrer la voix de votre marché dans votre cycle de développement."
            : "Choisissez un créneau qui vous convient dans le calendrier ci-dessous. Vos informations ont été pré-remplies."
          }
        </p>
        
        <div className="max-w-2xl mx-auto">
          {status !== 'success' ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="relative">
                  <UserIcon className="w-5 h-5 text-brand-light-gray absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    required
                    aria-label="Votre nom complet"
                    className="w-full bg-brand-gray border border-brand-border rounded-lg py-3 pr-4 pl-12 text-white placeholder-brand-light-gray focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  />
                </div>
                <div className="relative">
                   <MailIcon className="w-5 h-5 text-brand-light-gray absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email professionnel"
                    required
                    aria-label="Email professionnel"
                    className="w-full bg-brand-gray border border-brand-border rounded-lg py-3 pr-4 pl-12 text-white placeholder-brand-light-gray focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  />
                </div>
                <div className="relative">
                  <BuildingIcon className="w-5 h-5 text-brand-light-gray absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nom de l'entreprise"
                    required
                    aria-label="Nom de l'entreprise"
                    className="w-full bg-brand-gray border border-brand-border rounded-lg py-3 pr-4 pl-12 text-white placeholder-brand-light-gray focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  />
                </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-primary text-black font-semibold py-3 px-6 rounded-lg text-lg hover:bg-emerald-300 transition-colors duration-300 flex items-center justify-center"
              >
                {status === 'loading' ? (
                  <>
                    <SpinnerIcon className="w-5 h-5 mr-2" />
                    <span>Vérification...</span>
                  </>
                ) : (
                  <span>Étape Suivante</span>
                )}
              </button>
              {status === 'error' && error && (
                <p className="mt-4 text-red-400">{error}</p>
              )}
            </form>
          ) : (
            <div className="bg-brand-gray border border-brand-border rounded-lg overflow-hidden min-h-[700px]">
              <iframe
                src={calendlyUrl}
                width="100%"
                height="700"
                frameBorder="0"
                title="Planifier une démo via Calendly"
                className="min-h-[700px]"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Scheduling;