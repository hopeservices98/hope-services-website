import React from 'react';
import { CodeIcon } from './icons/CodeIcon.tsx';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray border-t border-brand-border">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
             <CodeIcon className="w-6 h-6 text-brand-primary" />
            <span className="text-lg font-bold text-white">HOPE-SERVICES</span>
          </div>
          <p className="text-brand-light-gray text-sm">
            &copy; {new Date().getFullYear()} HOPE-SERVICES. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;