import React, { useState, useEffect, useRef, FormEvent, RefObject } from 'react';
import ReactDOM from 'react-dom/client';
// =============================================
// CONSOLIDATED APPLICATION CODE
// =============================================
//
// HOOK: useOnScreen.ts
//
const useOnScreen = (ref: RefObject<HTMLElement>): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -20% 0px',
      }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);
  return isIntersecting;
};
//
// HOOK: useMatrixText.ts
//
const useMatrixText = (targetText: string, start: boolean = false, speed: number = 30) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<number | null>(null);
  const textRef = useRef(targetText);
  textRef.current = targetText;
  useEffect(() => {
    const cleanup = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    if (start) {
      let iteration = 0;
      cleanup();
      
      intervalRef.current = window.setInterval(() => {
        const currentTarget = textRef.current;
        setDisplayedText(
          currentTarget
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return currentTarget[index];
              }
              if (letter === ' ') return ' ';
              return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
            })
            .join('')
        );
        if (iteration >= currentTarget.length) {
          cleanup();
        }
        iteration += 1 / 2;
      }, speed);
    } else {
      setDisplayedText('');
      cleanup();
    }
    return cleanup;
  }, [start, speed]);
  return displayedText;
};
//
// ICONS
//
const ApiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);
const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" />
  </svg>
);
const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
  </svg>
);
const CloudIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
);
const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);
const DatabaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75v10.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75z" />
  </svg>
);
const DeliveringIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);
const HypothesisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553l-.242.972-.242-.972a.75.75 0 01.242-1.082l.972-.242-.972-.242a.75.75 0 01-1.082.242l-.972.242.972.242a.75.75 0 01.242 1.082z" />
  </svg>
);
const InsightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a15.045 15.045 0 01-7.5 0C4.508 19.659 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.5 3c1.551 0 2.986.632 4.003 1.667C12.514 3.632 13.949 3 15.5 3c2.786 0 5.25 2.322 5.25 5.25 0 3.924-2.258 11.409-4.753 13.231z" />
  </svg>
);
const IntegrationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
  </svg>
);
const ListeningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);
const MagnifyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
  </svg>
);
const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const NoiseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);
const OrganizingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125A2.25 2.25 0 014.5 4.875h15A2.25 2.25 0 0121.75 7.125v4.5A2.25 2.25 0 0119.5 13.875h-15A2.25 2.25 0 012.25 11.625v-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 16.125A2.25 2.25 0 014.5 13.875h15A2.25 2.25 0 0121.75 16.125v2.25A2.25 2.25 0 0119.5 20.625h-15A2.25 2.25 0 012.25 18.375v-2.25z" />
  </svg>
);
const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
const UnderstandingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M12 5.25v-1.5m3.75 1.5v-1.5m-3.75 18v-1.5m3.75 1.5v-1.5M5.25 12a6.75 6.75 0 0113.5 0m-13.5 0a6.75 6.75 0 0013.5 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
  </svg>
);
const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
//
// COMPONENT: AnimatedTitle
//
interface AnimatedTitleProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}
const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, as = 'h2', className }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isVisible = useOnScreen(ref);
  const animatedText = useMatrixText(text, isVisible);
  const Tag = as;
  return (
    <Tag ref={ref} className={`${className} relative`}>
      {/* This invisible span reserves the correct space to prevent layout shift */}
      <span className="opacity-0" aria-hidden="true">{text}</span>
      {/* This span overlays the animated text */}
      <span className="absolute top-0 left-0 w-full h-full">
        {animatedText}
      </span>
    </Tag>
  );
};
//
// COMPONENT: CodeBlock
//
interface CodeBlockProps {
  language: string;
  title: string;
  children: string;
}
const CodeBlock: React.FC<CodeBlockProps> = ({ language, title, children }) => {
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
            <><CheckIcon className="w-4 h-4 text-brand-primary" /><span>Copié!</span></>
          ) : (
            <><ClipboardIcon className="w-4 h-4" /><span>Copier</span></>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className={`language-${language} font-mono`}>{children}</code>
      </pre>
    </div>
  );
};
//
// COMPONENT: MatrixBackground
//
const MatrixBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const ctx = canvas.getContext('2d'); if (!ctx) return;
        let animationFrameId: number;
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 0.8;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        const alphabet = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const rainDrops: number[] = [];
        for (let x = 0; x < columns; x++) { rainDrops[x] = 1; }
        const draw = () => {
            ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#34d399';
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
            animationFrameId = window.requestAnimationFrame(draw);
        };
        draw();
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};
//
// COMPONENT: Header
//
const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 10); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { href: '#probleme', label: 'Le Problème' }, { href: '#solution', label: 'Solution' },
    { href: '#stack', label: 'Stack Technique' }, { href: '#documentation', label: 'Documentation' },
    { href: '#services', label: 'Services' },
  ];
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-brand-gray/80 backdrop-blur-sm border-b border-brand-border' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="flex items-center space-x-2">
            <CodeIcon className="w-8 h-8 text-brand-primary" />
            <span className="text-xl font-bold text-white">HOPE-SERVICES</span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)} className="text-brand-light-gray hover:text-white transition-colors relative group">
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-right group-hover:origin-left"></span>
              </a>
            ))}
            <a href="#planifier" onClick={(e) => scrollTo(e, '#planifier')} className="bg-brand-primary text-black font-semibold px-4 py-2 rounded-md hover:bg-emerald-300 transition-colors">
                Planifier une Démo
            </a>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={isMenuOpen} aria-controls="mobile-menu">
              {isMenuOpen ? <XIcon className="w-7 h-7 text-white" /> : <MenuIcon className="w-7 h-7 text-white" />}
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-menu" className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-brand-gray border-t border-brand-border`}>
        <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)} className="block text-brand-light-gray hover:text-white hover:bg-brand-dark px-3 py-2 rounded-md text-base font-medium">
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
//
// COMPONENT: Hero
//
const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <section id="hero" ref={sectionRef} className="relative text-center overflow-hidden pt-40 pb-32">
       <MatrixBackground />
       <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/80 to-brand-dark"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <AnimatedTitle as="h1" text="Votre Roadmap, Pilotée par l'API." className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 font-mono" />
        <p className={`text-lg md:text-xl text-brand-light-gray max-w-3xl mx-auto mb-10 fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '1500ms' }}>
          Cessez de développer sur des suppositions. Nous transformons les conversations publiques du web en un flux de données structurées pour alimenter votre backlog et accélérer vos décisions techniques.
        </p>
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '1800ms' }}>
          <a href="#planifier" onClick={(e) => scrollTo(e, '#planifier')} className="w-full sm:w-auto bg-brand-primary text-black font-semibold px-6 py-3 rounded-lg text-lg hover:bg-emerald-300 transition-colors duration-300">
            📞 Planifier une Démo Technique
          </a>
          <a href="#comment-ca-marche" onClick={(e) => scrollTo(e, '#comment-ca-marche')} className="w-full sm:w-auto bg-brand-gray text-white font-semibold px-6 py-3 rounded-lg text-lg border border-brand-border hover:bg-brand-border transition-colors duration-300">
            🖲️ Découvrir notre Pipeline
          </a>
        </div>
      </div>
    </section>
  );
};
//
// COMPONENT: Problem
//
const Problem: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridVisible = useOnScreen(gridRef);
  const problems = [
    { icon: <HypothesisIcon className="w-10 h-10 text-brand-primary mb-4" />, title: "Backlogs Basés sur l'Hypothèse", description: "Votre roadmap est une liste de 'peut-être'. Sans data pour le quantifier, comment savoir si vous construisez une fonctionnalité indispensable ou un gadget inutile ?" },
    { icon: <NoiseIcon className="w-10 h-10 text-brand-primary mb-4" />, title: "Feedback Utilisateur Inexploitable", description: "Les retours décisifs sont noyés dans le bruit de Discord, Reddit, Twitter/X. Vous passez à côté de rapports de bugs critiques et de demandes de fonctionnalités en or." },
    { icon: <MagnifyIcon className="w-10 h-10 text-brand-primary mb-4" />, title: "Analyse Concurrentielle Superficielle", description: "Vous connaissez le marketing de vos concurrents, mais connaissez-vous leur dette technique perçue ? C'est là que se trouvent vos plus grandes opportunités." },
  ];
  return (
    <section id="probleme" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedTitle text="Coder dans le noir coûte cher." className="text-3xl md:text-4xl font-bold text-white font-mono" />
            <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
              Votre équipe technique est votre ressource la plus précieuse. Pourtant, chaque jour, des décisions critiques sont prises sur la base d'intuitions ou de retours utilisateurs fragmentés.
            </p>
          </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className={`bg-brand-gray p-8 rounded-lg border border-brand-border fade-in ${isGridVisible ? 'visible' : ''}`} style={{ transitionDelay: `${isGridVisible ? index * 150 : 0}ms` }}>
              {problem.icon}
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-brand-light-gray">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
//
// COMPONENT: Solution
//
const Solution: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);
  const solutions = [
    { icon: <InsightIcon className="w-10 h-10 text-brand-primary mb-4" />, title: "Des Insights, pas juste des Données", description: "Nous transformons le texte non structuré en insights techniques clairs : rapports de bugs, demandes de fonctionnalités, et benchmarks concurrentiels." },
    { icon: <IntegrationIcon className="w-10 h-10 text-brand-primary mb-4" />, title: "Intégration Native", description: "Recevez les données là où vous travaillez. Poussez des tickets pré-qualifiés dans Jira, Linear ou Asana, et recevez des alertes critiques sur Slack." },
    { icon: <ApiIcon className="w-10 h-10 text-brand-primary mb-4" />, title: "Accès Programmatique Complet", description: "Notre API REST/GraphQL vous donne un contrôle total pour interroger les données et alimenter vos propres dashboards et outils d'analyse." },
  ];
  return (
    <section id="solution" className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="text-center mb-12">
          <AnimatedTitle text="Intégrez le réel dans votre cycle de dev." className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
            Nous sommes une plateforme de Data-as-a-Service. Nous vous fournissons un pipeline de données fiable qui connecte vos outils de développement directement aux conversations de votre marché.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className={`bg-brand-dark p-8 rounded-lg border border-brand-border fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}>
              {solution.icon}
              <h3 className="text-xl font-semibold text-white mb-3">{solution.title}</h3>
              <p className="text-brand-light-gray">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
//
// COMPONENT: HowItWorks
//
const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);
  const steps = [
    { icon: <ListeningIcon className="w-10 h-10 text-brand-primary mb-4" />, step: "ÉTAPE 01", title: "ÉCOUTER", description: "Nos 'oreilles' numériques parcourent le web en continu (forums, réseaux sociaux, etc.) pour capter toutes les conversations pertinentes sur votre produit et vos concurrents." },
    { icon: <UnderstandingIcon className="w-10 h-10 text-brand-primary mb-4" />, step: "ÉTAPE 02", title: "COMPRENDRE", description: "Notre intelligence artificielle lit et analyse chaque phrase. Elle sait si c'est un bug, une idée de fonctionnalité, ou un simple avis, et en mesure le sentiment (positif, négatif)." },
    { icon: <OrganizingIcon className="w-10 h-10 text-brand-primary mb-4" />, step: "ÉTAPE 03", title: "ORGANISER", description: "Nous transformons ce chaos d'informations en 'fiches' de données claires et structurées (format JSON), faciles à utiliser pour n'importe quelle machine ou logiciel." },
    { icon: <DeliveringIcon className="w-10 h-10 text-brand-primary mb-4" />, step: "ÉTAPE 04", title: "LIVRER", description: "Nous vous livrons ces fiches là où vous en avez besoin : directement dans vos outils (Jira, Slack) ou via notre API pour que vos développeurs puissent construire dessus." },
  ];
  return (
    <section id="comment-ca-marche" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedTitle text="De la Donnée Brute à la Décision Claire" className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
            Notre service est une machine qui transforme les conversations publiques en un signal clair pour vos équipes techniques. Voici comment.
          </p>
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className={`bg-brand-gray p-6 rounded-lg border border-brand-border flex flex-col fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}>
              {step.icon}
              <p className="text-sm font-semibold text-brand-primary mb-2">{step.step}</p>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-brand-light-gray text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        <div className={`mt-16 bg-brand-gray p-8 rounded-lg border border-brand-border text-center fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${isVisible ? (steps.length * 150) + 200 : 0}ms` }}>
            <h3 className="text-2xl font-bold text-white mb-3">Le Résultat ?</h3>
            <p className="text-lg text-brand-light-gray max-w-4xl mx-auto">
                Vous n'achetez pas juste de la donnée. Vous obtenez des réponses structurées aux questions que vous vous posez chaque jour : "Sur quoi devons-nous travailler ensuite ?", "Quels sont les bugs les plus urgents ?", "Où nos concurrents sont-ils faibles ?". Le tout, livré en temps réel.
            </p>
        </div>
      </div>
    </section>
  );
};
//
// COMPONENT: Stack
//
const Stack: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef);
    const stackItems = [
        { icon: <DatabaseIcon className="w-8 h-8 mb-4 text-brand-primary" />, title: "Définition des Sources & Schémas", description: "Nous définissons avec vous les entités à surveiller (produits, concurrents) et le schéma de données de sortie JSON." },
        { icon: <CloudIcon className="w-8 h-8 mb-4 text-brand-primary" />, title: "Collection via Workers Distribués", description: "Notre infrastructure scanne les sources à grande échelle de manière éthique et robuste, en respectant les bonnes pratiques." },
        { icon: <CogIcon className="w-8 h-8 mb-4 text-brand-primary" />, title: "Pipeline de Traitement & d'Enrichissement (ETL)", description: "La donnée brute est nettoyée, normalisée, et classifiée (Bug, Feature Request) via notre pipeline de traitement NLP." },
        { icon: <ApiIcon className="w-8 h-8 mb-4 text-brand-primary" />, title: "Livraison des Données via API et Intégrations", description: "Consommez les données via API REST/GraphQL, recevez des alertes via webhooks (Slack) ou des tickets auto-créés (Jira, Linear)." }
    ];
    return (
        <section id="stack" className="py-20 bg-brand-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <AnimatedTitle text="Notre Stack Technique & Méthodologie" className="text-3xl md:text-4xl font-bold text-white font-mono" />
                     <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">
                        Une plateforme de data engineering robuste pour vous donner un accès programmatique à la voix de votre marché.
                    </p>
                </div>
                <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stackItems.map((item, index) => (
                        <div key={index} className={`bg-brand-dark p-6 rounded-lg border border-brand-border fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${isVisible ? index * 150 : 0}ms` }}>
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
//
// COMPONENT: UseCases
//
const UseCases: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);
  const useCases = [
    { title: "Priorisez votre Backlog avec des Données", before: `Avant : "Je pense qu'on devrait faire ça."`, after: `Après : "La fonctionnalité X a été demandée 152 fois ce trimestre. Le ticket est prioritaire."` },
    { title: "Détectez les Bugs Avant Tout le Monde", before: "Avant : Attendre que les utilisateurs créent des tickets de support.", after: `Après : Alerte Slack : "Pic de mentions négatives sur le login (Android 14) détecté."` },
    { title: "Exploitez les Faiblesses des Concurrents", before: "Avant : Lire leurs communiqués de presse.", after: `Après : "L'API du concurrent Y est 'lente' et 'mal documentée'. C'est notre point d'attaque."` },
    { title: "Validez votre Roadmap à Moindre Coût", before: "Avant : Lancer une feature et espérer qu'elle soit utilisée.", after: "Après : Confirmer la demande organique avant d'écrire la première ligne de code." },
  ];
  return (
    <section id="cas-usages" className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedTitle text="Prenez des Décisions Produit Plus Intelligentes" className="text-3xl md:text-4xl font-bold text-white font-mono" />
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className={`bg-brand-dark p-8 rounded-lg border border-brand-border fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}>
              <h3 className="text-xl font-semibold text-white mb-6">{useCase.title}</h3>
              <div className="space-y-4">
                <p className="text-brand-light-gray line-through">{useCase.before}</p>
                <p className="text-white font-medium bg-emerald-900/50 border border-emerald-500/50 p-4 rounded-md">{useCase.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
//
// COMPONENT: Testimonials
//
const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);
  const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
  const testimonials = [
    { quote: "L'API de HOPE-SERVICES nous a permis de diviser par trois le temps de qualification des features. On ne navigue plus à l'aveugle, on code ce que les utilisateurs attendent VRAIMENT.", name: "Julien Lemoine", title: "CTO @ ScaleUp SaaS" },
    { quote: "Le 'Backlog-as-a-Service' est une révolution. Mon équipe reçoit des tickets Jira clairs, sourcés et pré-qualifiés. C'est un gain de productivité énorme pour nos Product Managers.", name: "Claire Dubois", title: "Head of Product @ Fintech Innovante" },
    { quote: "On a pu identifier une faiblesse critique dans l'API de notre principal concurrent en moins d'une semaine. Cette information valait de l'or. C'est de la CI technique, pas du marketing.", name: "Alexandre Martin", title: "Lead Developer @ API-First Company" }
  ];
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
            <div key={index} className={`bg-brand-gray p-8 rounded-lg border border-brand-border flex flex-col fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}>
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
//
// COMPONENT: Services
//
const Services: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef);
    const plans = [
        { name: "CORE API", price: "250€", period: "/ mois", subtext: "Idéal pour démarrer", description: "Pour les équipes souhaitant intégrer les données dans leurs propres systèmes.", features: ["Accès complet à l'API REST/GraphQL", "Surveillance jusqu'à 5 sources", "Dashboard de visualisation", "Support par email"], cta: "Commencer avec l'API", popular: false },
        { name: "TEAM INTEGRATION", price: "750€", period: "/ mois", subtext: "À partir de", description: "Pour les équipes produit et dev qui veulent maximiser leur efficacité.", features: ["Tous les avantages de CORE API", "Intégrations natives (Jira, Slack, Linear)", '"Backlog-as-a-Service" automatisé', "Surveillance jusqu'à 20 sources", "Support prioritaire"], cta: "Choisir Team", popular: true },
        { name: "STRATEGIC DATA", price: "Sur Devis", period: "", subtext: "Généralement à partir de 2,500€ / mois", description: "Pour les organisations data-driven qui veulent un avantage stratégique.", features: ["Tous les avantages de TEAM INTEGRATION", "API de Benchmarking en Temps Réel", "Accès aux modèles prédictifs d'impact", "Sources illimitées", "Accompagnement et support dédiés"], cta: "Contactez-nous", popular: false },
    ];
    const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  return (
    <section id="services" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedTitle text="Des Offres Conçues pour les Équipes Techniques" className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">Choisissez le plan qui s'adapte à la maturité de votre stack et de vos processus.</p>
        </div>
        <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-brand-gray rounded-lg border ${plan.popular ? 'border-brand-primary' : 'border-brand-border'} p-8 flex flex-col relative fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}>
              {plan.popular && (<div className="absolute top-0 -translate-y-1/2 right-8 bg-brand-primary text-black text-sm font-semibold px-4 py-1 rounded-full">Le plus populaire</div>)}
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-brand-light-gray mb-6 min-h-[48px]">{plan.description}</p>
                <div className="mb-6 text-left">
                  {plan.subtext && <p className="text-sm text-brand-light-gray">{plan.subtext}</p>}
                  <p><span className="text-5xl font-bold text-white">{plan.price}</span>{plan.period && <span className="text-brand-light-gray">{plan.period}</span>}</p>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (<li key={i} className="flex items-start"><CheckIcon className="w-5 h-5 text-brand-primary mr-3 mt-1 flex-shrink-0" /><span>{feature}</span></li>))}
                </ul>
              </div>
              <a href="#planifier" onClick={(e) => scrollTo(e, '#planifier')} className={`w-full text-center font-semibold py-3 rounded-lg mt-8 transition-colors ${plan.popular ? 'bg-brand-primary text-black hover:bg-emerald-300' : 'bg-brand-dark hover:bg-brand-border border border-brand-border'}`}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
//
// COMPONENT: RevolutionaryServices
//
const RevolutionaryServices: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);
  const services = [
    { title: `"Backlog-as-a-Service" Pré-priorisé`, description: "Recevez des tickets auto-créés et mis à jour dans Jira/Linear, pré-remplis avec description, sources, score de popularité et tag (Bug, Feature). Le PM n'a plus qu'à affiner et assigner.", revolutionary: "Vous automatisez la collecte et la qualification des besoins, la partie la plus chronophage de la gestion de produit." },
    { title: "API de Benchmarking Technique en Temps Réel", description: `Accédez à des endpoints d'API pour comparer des produits. Ex: GET /benchmark?products=A,B&metric=bug_reports. Construisez des dashboards internes qui suivent la "santé technique perçue" de vos concurrents.`, revolutionary: `Nous offrons de la "Competitive Intelligence" en tant que service purement technique, quantifiable et intégrable.` },
    { title: "Moteur de Prédiction d'Impact de Roadmap", description: `Utilisez nos modèles prédictifs pour simuler votre roadmap. "Quel sera l'impact sur le sentiment global si nous développons les features A et B ?". Le modèle se base sur le "poids" et le sentiment des demandes passées.`, revolutionary: `Passez de l'analyse descriptive (ce qui s'est passé) à l'analyse prédictive (ce qui se passera), un outil d'aide à la décision pour CTOs et CPOs.` }
  ]
  return (
    <section id="revolution" className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedTitle text="Aller Au-Delà de la Donnée Brute" className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">Nos services avancés transforment les insights en actions et en stratégies prédictives.</p>
        </div>
        <div ref={sectionRef} className="space-y-8">
          {services.map((service, index) => (
            <div key={index} className={`bg-brand-dark border border-brand-border rounded-lg p-6 md:p-8 fade-in ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${isVisible ? index * 150 + 200 : 0}ms` }}>
                <span className="inline-block bg-brand-primary/10 text-brand-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">Service Révolutionnaire</span>
                <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-brand-light-gray mb-6">{service.description}</p>
                <p className="text-white bg-brand-gray p-4 rounded-md border border-brand-border"><span className="font-semibold">Pourquoi c'est révolutionnaire :</span> {service.revolutionary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
//
// COMPONENT: Documentation
//
const Documentation: React.FC = () => {
  const curlExample = `curl "https://api.hope-services.com/v1/insights?type=bug" \\
  -H "Authorization: Bearer VOTRE_CLE_API"`;
  const javascriptExample = `const fetchInsights = async () => {
  const response = await fetch('https://api.hope-services.com/v1/insights?type=bug', {
    headers: { 'Authorization': 'Bearer VOTRE_CLE_API' }
  });
  const data = await response.json();
  console.log(data);
};
fetchInsights();`;
  const jsonExample = `{
  "data": [
    {
      "id": "ins_1a2b3c4d5e6f",
      "content": "L'authentification via Google échoue sur Android 14...",
      "source": { "platform": "discord", "url": "..." },
      "type": "bug_report",
      "sentiment": { "score": -0.85, "label": "négatif" },
      "timestamp": "2024-05-21T10:30:00Z",
      "tags": ["login", "android", "auth"]
    }
  ],
  "pagination": { "next_cursor": "..." }
}`;
  return (
    <section id="documentation" className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedTitle text="Documentation API" className="text-3xl md:text-4xl font-bold text-white font-mono" />
          <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto">Notre API est conçue pour être simple, prévisible et efficace. Voici comment commencer.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Démarrage Rapide</h3>
              <p className="text-brand-light-gray">URL de base : <code className="text-sm bg-brand-dark border border-brand-border rounded-md px-2 py-1 mx-1.5 font-mono text-brand-primary">https://api.hope-services.com/v1</code></p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Authentification</h3>
              <p className="text-brand-light-gray">Passez votre clé API dans l'en-tête <code className="text-sm bg-brand-dark border border-brand-border rounded-md px-2 py-1 mx-1.5 font-mono">Authorization: Bearer VOTRE_CLE_API</code>.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Endpoint Principal: /insights</h3>
              <ul className="space-y-2 text-brand-light-gray">
                <li><code className="font-mono text-white">type</code>: 'bug_report', 'feature_request'</li>
                <li><code className="font-mono text-white">source</code>: 'discord', 'reddit'</li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <div className="lg:sticky top-24 space-y-8">
              <CodeBlock language="bash" title="Exemple cURL">{curlExample}</CodeBlock>
              <CodeBlock language="javascript" title="Exemple JavaScript (fetch)">{javascriptExample}</CodeBlock>
              <CodeBlock language="json" title="Exemple de Réponse JSON">{jsonExample}</CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
//
// COMPONENT: CTA (Scheduling)
//
const Scheduling: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(sectionRef);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>);
  const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>);
  const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H9a.375.375 0 01-.375-.375v-1.5A.375.375 0 019 6.75zM9 12.75h6.375a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H9a.375.375 0 01-.375-.375v-1.5A.375.375 0 019 12.75z" /></svg>);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) { setError('Tous les champs sont requis.'); setStatus('error'); return; }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) { setError('Veuillez entrer une adresse email valide.'); setStatus('error'); return; }
    setStatus('loading'); setError('');
    setTimeout(() => { setStatus('success'); }, 1500);
  };
  const calendlyUrl = `https://calendly.com/VOTRE_LIEN/demo?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
  return (
    <section id="planifier" className="py-20 bg-brand-dark">
      <div ref={sectionRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in ${isVisible ? 'visible' : ''}`}>
        <AnimatedTitle text={status !== 'success' ? "Prêt à arrêter de coder à l'aveugle ?" : "Planifiez votre démo"} className="text-3xl md:text-4xl font-bold text-white font-mono" />
        <p className="mt-4 text-lg text-brand-light-gray max-w-3xl mx-auto mb-12">
          {status !== 'success' ? "Planifiez une démo de 45 minutes avec un ingénieur pour découvrir comment intégrer la voix de votre marché dans votre cycle de développement." : "Choisissez un créneau qui vous convient. Vos informations ont été pré-remplies."}
        </p>
        <div className="max-w-2xl mx-auto">
          {status !== 'success' ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="relative">
                  <UserIcon className="w-5 h-5 text-brand-light-gray absolute left-4 top-1/2 -translate-y-1/2" />
                  <input type="text" name="name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Votre nom complet" required aria-label="Votre nom complet" className="w-full bg-brand-gray border border-brand-border rounded-lg py-3 pr-4 pl-12 text-white placeholder-brand-light-gray focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
              </div>
              <div className="relative">
                   <MailIcon className="w-5 h-5 text-brand-light-gray absolute left-4 top-1/2 -translate-y-1/2" />
                  <input type="email" name="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="Email professionnel" required aria-label="Email professionnel" className="w-full bg-brand-gray border border-brand-border rounded-lg py-3 pr-4 pl-12 text-white placeholder-brand-light-gray focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
              </div>
              <div className="relative">
                  <BuildingIcon className="w-5 h-5 text-brand-light-gray absolute left-4 top-1/2 -translate-y-1/2" />
                  <input type="text" name="company" value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} placeholder="Nom de l'entreprise" required aria-label="Nom de l'entreprise" className="w-full bg-brand-gray border border-brand-border rounded-lg py-3 pr-4 pl-12 text-white placeholder-brand-light-gray focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-brand-primary text-black font-semibold py-3 px-6 rounded-lg text-lg hover:bg-emerald-300 transition-colors duration-300 flex items-center justify-center">
                {status === 'loading' ? (<><SpinnerIcon className="w-5 h-5 mr-2" /><span>Vérification...</span></>) : (<span>Étape Suivante</span>)}
              </button>
              {status === 'error' && error && (<p role="alert" aria-live="assertive" className="mt-4 text-red-400">{error}</p>)}
            </form>
          ) : (
            <div className="bg-brand-gray border border-brand-border rounded-lg overflow-hidden min-h-[700px]">
              <iframe src={calendlyUrl} width="100%" height="700" frameBorder="0" title="Planifier une démo via Calendly" className="min-h-[700px]"></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
//
// COMPONENT: Footer
//
const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <CodeIcon className="w-6 h-6 text-brand-primary" />
            <span className="text-lg font-bold text-white">HOPE-SERVICES</span>
          </div>
          <p className="text-brand-light-gray text-sm">&copy; {new Date().getFullYear()} HOPE-SERVICES. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
//
// COMPONENT: App
//
const App: React.FC = () => {
  return (
    <div className="bg-brand-dark text-gray-300 font-sans">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Stack />
        <UseCases />
        <Testimonials />
        <Services />
        <RevolutionaryServices />
        <Documentation />
        <Scheduling />
      </main>
      <Footer />
    </div>
  );
};

// =============================================
// ROOT RENDER
// =============================================
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);