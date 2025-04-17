import { useState, useEffect } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook to detect when an element is visible in the viewport for scroll animations
 * 
 * @param options - Configuration options for the intersection observer
 * @returns [ref, isVisible] - Ref to attach to the element and boolean for visibility state
 */
const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, rootMargin, threshold]); // Re-run effect if these dependencies change

  return [setRef, isVisible] as const;
};

export default useScrollAnimation;
