import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import { useMatrixText } from '../hooks/useMatrixText';

interface AnimatedTitleProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, as = 'h2', className }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isVisible = useOnScreen(ref);
  const animatedText = useMatrixText(text, isVisible);
  const Tag = as;

  // Rendu du texte non-animé pour le SEO et si les animations sont désactivées
  const fallbackText = <span className="opacity-0 absolute -z-10">{text}</span>

  return (
    <Tag ref={ref} className={className}>
      {animatedText || <span className="opacity-0">{text}</span>}
      {fallbackText}
    </Tag>
  );
};