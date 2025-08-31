import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const HeadManager: React.FC = () => {
  React.useEffect(() => {
    document.documentElement.lang = 'fr';

    // To prevent duplication during HMR in development
    const managedNodes = document.querySelectorAll('[data-managed-by-react]');
    managedNodes.forEach(node => node.remove());

    const createEl = (tag: string, attrs: Record<string, string>, parent: HTMLElement = document.head) => {
        const el = document.createElement(tag);
        el.setAttribute('data-managed-by-react', 'true');
        for (const key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
        parent.appendChild(el);
        return el;
    }

    createEl('link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' });
    createEl('link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' });
    createEl('link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap', rel: 'stylesheet' });

    const tailwindScript = createEl('script', { src: 'https://cdn.tailwindcss.com' });
    
    // The tailwind config must be in a separate script tag that runs AFTER the main tailwind script.
    // Putting it in onload is the correct way to ensure this.
    tailwindScript.onload = () => {
        const tailwindConfigScript = createEl('script', {});
        tailwindConfigScript.innerHTML = `
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Inter', 'sans-serif'],
                  mono: ['Space Mono', 'monospace'],
                },
                colors: {
                  'brand-primary': '#34d399', // emerald-400
                  'brand-dark': '#111827',    // gray-900
                  'brand-gray': '#1f2937',    // gray-800
                  'brand-light-gray': '#9ca3af', // gray-400
                  'brand-border': '#374151',  // gray-700
                }
              }
            }
          }
        `;
    };

    const styleEl = createEl('style', {});
    styleEl.innerHTML = `
      body {
        font-family: 'Inter', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      html {
        scroll-behavior: smooth;
      }
      .animate-spin {
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .fade-in {
        transition: opacity 700ms ease-out;
        opacity: 0;
      }
      .fade-in.visible {
        opacity: 1;
      }
    `;

    // Apply base classes to the body
    document.body.className = "bg-brand-dark";
  }, []);

  return null;
};

const MainApp = () => (
  <React.Fragment>
    <HeadManager />
    <App />
  </React.Fragment>
);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
