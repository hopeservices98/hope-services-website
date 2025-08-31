import React, { useState } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon.tsx';
import { CheckIcon } from './icons/CheckIcon.tsx';

interface CodeBlockProps {
  language: string;
  title: string;
  children: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, title, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-brand-dark border border-brand-border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-brand-gray border-b border-brand-border">
        <p className="text-sm text-brand-light-gray font-semibold">{title}</p>
        <button 
          onClick={handleCopy} 
          className="flex items-center gap-1.5 text-sm text-brand-light-gray hover:text-white transition-colors"
          aria-label="Copier le code"
        >
          {copied ? (
            <>
              <CheckIcon className="w-4 h-4 text-brand-primary" />
              <span>Copié!</span>
            </>
          ) : (
            <>
              <ClipboardIcon className="w-4 h-4" />
              <span>Copier</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className={`language-${language} font-mono`}>{children}</code>
      </pre>
    </div>
  );
};