import { CONFIG } from '../config.js';

let animated = false;

export function initFinalScene() {
  return {
    onEnter() {
      const container = document.getElementById('final-text');
      container.innerHTML = '';

      const msg = CONFIG.finalMessage;
      const title = document.createElement('span');
      title.className = 'script-line';
      title.textContent = msg.title;
      container.appendChild(title);

      msg.lines.forEach((line) => {
        if (line === '') {
          container.appendChild(document.createElement('br'));
        } else {
          const p = document.createElement('span');
          p.textContent = line;
          container.appendChild(p);
          container.appendChild(document.createElement('br'));
        }
      });

      if (!animated) {
        gsap.fromTo('.final-heart', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' });
        gsap.fromTo('#final-text', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' });
        gsap.fromTo('#btn-final', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'power2.out' });
        animated = true;
      }
    },
  };
}
