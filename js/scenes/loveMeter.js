import { CONFIG } from '../config.js';
import { SceneParticles, massiveExplosion } from '../particle-system.js';
import { delay } from '../utils.js';

let particles = null;
let played = false;

export function initLoveMeterScene() {
  return {
    async onEnter() {
      if (played) return;
      played = true;

      const left = document.getElementById('heart-left');
      const right = document.getElementById('heart-right');
      const pair = document.getElementById('hearts-pair');
      const display = document.getElementById('love-meter-display');
      const combined = document.getElementById('combined-names');
      const fill = document.getElementById('meter-fill');
      const percent = document.getElementById('meter-percent');
      const infinite = document.getElementById('infinite-love');
      const btn = document.getElementById('btn-love-meter');

      left.textContent = `${CONFIG.names.him} ❤️`;
      right.textContent = `${CONFIG.names.her} ❤️`;
      gsap.set(left, { x: 0 });
      gsap.set(right, { x: 0 });

      display.classList.add('hidden');
      infinite.classList.add('hidden');
      btn.classList.add('hidden');
      pair.classList.remove('hidden');

      particles = new SceneParticles('love-meter-canvas');
      particles.start();

      // Hearts move toward each other
      await gsap.to(left, { x: 80, duration: 2, ease: 'power2.inOut' });
      await gsap.to(right, { x: -80, duration: 2, ease: 'power2.inOut' });

      // Meet — huge heart
      particles.addBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
      pair.classList.add('hidden');
      display.classList.remove('hidden');
      combined.textContent = `${CONFIG.names.him} ❤️ ${CONFIG.names.her}`;

      gsap.fromTo(combined, { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' });

      // Animate meter through steps
      const steps = CONFIG.loveMeterSteps;
      for (let i = 0; i < steps.length; i++) {
        const val = steps[i];
        const fillPct = Math.min(val, 100);
        fill.style.width = `${fillPct}%`;
        percent.textContent = `${val}%`;
        percent.classList.remove('burst');
        void percent.offsetWidth;
        percent.classList.add('burst');

        if (val === 100 || val === 200 || val === 500) {
          particles.addBurst(window.innerWidth / 2, window.innerHeight / 2, 30);
          await delay(400);
        }

        if (val === 500) {
          massiveExplosion();
          await delay(800);
        }

        await delay(val === 500 ? 1200 : 600);
      }

      // Infinite love
      display.classList.add('hidden');
      infinite.classList.remove('hidden');
      gsap.fromTo('.infinity', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' });
      massiveExplosion();
      await delay(2000);

      btn.classList.remove('hidden');
      gsap.fromTo(btn, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
    },
  };
}
