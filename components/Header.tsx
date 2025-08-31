import React, { useState, useEffect } from 'react';
import { CodeIcon } from './icons/CodeIcon';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const navLinks = [
    { href: '#probleme', label: 'Le Problème' },
    { href: '#solution', label: 'Solution' },
    { href: '#stack', label: 'Stack Technique' },
    { href: '#documentation', label: 'Documentation' },
    { href: '#services', label: 'Services' },
  ];
  
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setIsMenuOpen(false);
      document.querySelector(id)?.scrollIntoView({
          behavior: 'smooth'
      });
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-brand-gray/80 backdrop-blur-sm border-b border-brand-border' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="flex items-center space-x-2">
              <CodeIcon className="w-8 h-8 text-brand-primary" />
              <span className="text-xl font-bold text-white">HOPE-SERVICES</span>
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={(e) => scrollTo(e, link.href)} 
                  className="text-brand-light-gray hover:text-white transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </a>
              ))}
            </nav>
            <a href="#planifier" onClick={(e) => scrollTo(e, '#planifier')} className="hidden md:inline-block bg-brand-primary text-white font-semibold px-5 py-2 rounded-md hover:bg-emerald-600 transition-all duration-300 motion-safe:hover:scale-105">
              Planifier une Démo
            </a>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Ouvrir le menu">
                {isMenuOpen ? <XIcon className="w-7 h-7 text-white" /> : <MenuIcon className="w-7 h-7 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-lg transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
           onClick={() => setIsMenuOpen(false)}>
        <nav className="flex flex-col items-center justify-center h-full pt-16">
          {navLinks.map((link, index) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={(e) => scrollTo(e, link.href)} 
              className="text-2xl text-brand-light-gray hover:text-white py-4 transition-all duration-300 motion-safe:opacity-0 motion-safe:translate-y-4"
              style={{ transitionDelay: `${isMenuOpen ? index * 100 + 200 : 0}ms`, opacity: isMenuOpen ? 1 : 0, transform: isMenuOpen ? 'translateY(0)' : 'translateY(1rem)' }}
            >
              {link.label}
            </a>
          ))}
          <a href="#planifier" 
            onClick={(e) => scrollTo(e, '#planifier')} 
            className="mt-8 bg-brand-primary text-white font-semibold px-8 py-3 rounded-md hover:bg-emerald-600 transition-all duration-300 motion-safe:hover:scale-105 motion-safe:opacity-0 motion-safe:translate-y-4"
            style={{ transitionDelay: `${isMenuOpen ? navLinks.length * 100 + 200 : 0}ms`, opacity: isMenuOpen ? 1 : 0, transform: isMenuOpen ? 'translateY(0)' : 'translateY(1rem)' }}
          >
            Planifier une Démo
          </a>
        </nav>
      </div>
    </>
  );
};

export default Header;
