import { useState, useEffect, RefObject } from 'react';

export const useOnScreen = (ref: RefObject<HTMLElement>): boolean => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Mettre à jour l'état uniquement lorsque l'élément devient visible
        if (entry.isIntersecting) {
          setIntersecting(true);
          // Optionnel: déconnecter l'observateur après la première intersection pour la performance
          // si l'animation ne doit se produire qu'une seule fois.
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -20% 0px', // L'animation se déclenche quand l'élément est à 20% du bas de l'écran
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
  }, [ref]); // Le tableau de dépendances est correct

  return isIntersecting;
};