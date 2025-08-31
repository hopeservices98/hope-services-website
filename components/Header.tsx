import React, { useState, useEffect } from 'react';
import { CodeIcon } from './icons/CodeIcon.tsx';
import { MenuIcon } from './icons/MenuIcon.tsx';
import { XIcon } from './icons/XIcon.tsx';

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

  const navLinks = [
    { href: '#probleme', label: 'Le Problème' },
    { href: '#solution', label: 'Solution' },
    { href: '#stack', label: 'Stack Technique' },
    { href: '#documentation', label: 'Documentation' },
    { href: '#services', label: 'Services' },
  ];
  
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu on link click
    document.querySelector(id)?.scrollIntoView({
        behavior: 'smooth'
    });
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-gray/80 backdrop-blur-sm border-b border-brand-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="flex items-center space-x-2">
            <CodeIcon className="w-8 h-8 text-brand-primary" />
            <span className="text-xl font-bold text-white">HOPE-SERVICES</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => scrollTo(e, link.href)} 
                className="text-brand-light-gray hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-right group-hover:origin-left"></span>
              </a>
            ))}
            <a href="#planifier" onClick={(e) => scrollTo(e, '#planifier')} className="bg-brand-primary text-black font-semibold px-4 py-2 rounded-md hover:bg-emerald-300 transition-colors">
                Planifier une Démo
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <XIcon className="w-7 h-7 text-white" /> : <MenuIcon className="w-7 h-7 text-white" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-brand-gray border-t border-brand-border`}
      >
        <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => scrollTo(e, link.href)} 
                className="block text-brand-light-gray hover:text-white hover:bg-brand-dark px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </a>
            ))}
             <a href="#planifier" onClick={(e) => scrollTo(e, '#planifier')} className="block bg-brand-primary text-black font-semibold px-3 py-3 text-center rounded-md hover:bg-emerald-300 transition-colors mt-4 mx-2">
                Planifier une Démo
            </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;