import { gsap } from 'gsap';

/**
 * Animates elements with a staggered entrance effect
 * @param elements Array of element refs to animate
 * @param options Animation options
 */
export const staggerElements = (
  elements: (HTMLElement | null)[],
  options: {
    fromVars?: gsap.TweenVars;
    toVars?: gsap.TweenVars;
    staggerAmount?: number;
    delay?: number;
  } = {}
) => {
  const filteredElements = elements.filter(el => el !== null) as HTMLElement[];
  
  if (filteredElements.length === 0) return;
  
  const {
    fromVars = { y: 20, opacity: 0 },
    toVars = { y: 0, opacity: 1, ease: 'power2.out', duration: 0.5 },
    staggerAmount = 0.1,
    delay = 0.2
  } = options;
  
  // Set initial state
  gsap.set(filteredElements, fromVars);
  
  // Create staggered animation
  gsap.to(filteredElements, {
    ...toVars,
    stagger: staggerAmount,
    delay,
  });
};
