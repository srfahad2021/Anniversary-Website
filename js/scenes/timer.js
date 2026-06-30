import { CONFIG } from '../config.js';
import { getRelationshipDuration, animateNumber } from '../utils.js';

let interval = null;

export function initTimerScene() {
  return {
    onEnter() {
      updateTimer();
      if (interval) clearInterval(interval);
      interval = setInterval(updateTimer, 1000);

      gsap.fromTo('.timer-heart', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' });
      gsap.fromTo('.timer-display .timer-unit', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 });
    },
    onLeave() {
      if (interval) clearInterval(interval);
    },
  };
}

function updateTimer() {
  const d = getRelationshipDuration(CONFIG.relationshipStart);

  animateNumber(document.getElementById('t-years'), d.years);
  animateNumber(document.getElementById('t-months'), d.months);
  animateNumber(document.getElementById('t-days'), d.days);
  animateNumber(document.getElementById('t-hours'), d.hours);
  animateNumber(document.getElementById('t-minutes'), d.minutes);
  animateNumber(document.getElementById('t-seconds'), d.seconds);
}
