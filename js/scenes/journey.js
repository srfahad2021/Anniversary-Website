import { CONFIG } from '../config.js';

export function initJourneyScene() {
  return {
    onEnter() {
      document.getElementById('journey-subtitle').textContent = CONFIG.journey.subtitle;

      gsap.fromTo('.journey-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      gsap.fromTo('.journey-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' });
      gsap.fromTo('.scene-journey .btn-primary', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power2.out' });
    },
  };
}
