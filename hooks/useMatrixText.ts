import { useState, useEffect, useRef } from 'react';

export const useMatrixText = (targetText: string, start: boolean = false, speed: number = 30) => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<number | null>(null);
  const textRef = useRef(targetText);
  textRef.current = targetText;

  useEffect(() => {
    // Nettoie l'intervalle précédent si start change ou le composant est démonté
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
      setDisplayedText(''); // Réinitialise lorsque non visible
      cleanup();
    }

    return cleanup;
  }, [start, speed]);

  return displayedText;
};