import { SceneParticles, massiveExplosion } from '../particle-system.js';
import { climaxMusic } from '../audio-manager.js';
import { getForeverDuration, animateNumber } from '../utils.js';
import { delay } from '../utils.js';

let particles = null;
let foreverInterval = null;
let foreverStartTime = null;
let launched = false;

export function initFinaleScene() {
  return {
    async onEnter() {
      if (!launched) await launchFinale();
    },
  };
}

async function launchFinale() {
  if (launched) return;
  launched = true;

  const app = document.getElementById('app');
  const content = document.getElementById('finale-content');

  app.classList.add('shake');
  climaxMusic();

  particles = new SceneParticles('finale-canvas');
  particles.start();

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      particles.addBurst(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight * 0.6,
        30
      );
      massiveExplosion();
    }, i * 400);
  }

  await delay(2500);
  app.classList.remove('shake');

  content.classList.remove('hidden');
  gsap.fromTo(content, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' });

  // Pin start time so the counter actually counts up
  foreverStartTime = Date.now() - 1000;

  if (foreverInterval) clearInterval(foreverInterval);
  updateForeverTimer();
  foreverInterval = setInterval(updateForeverTimer, 1000);
}

function updateForeverTimer() {
  if (!foreverStartTime) return;

  const d = getForeverDuration(foreverStartTime);

  animateNumber(document.getElementById('f-years'), d.years, 2);
  animateNumber(document.getElementById('f-months'), d.months, 2);
  animateNumber(document.getElementById('f-days'), d.days, 2);
  animateNumber(document.getElementById('f-hours'), d.hours, 2);
  animateNumber(document.getElementById('f-minutes'), d.minutes, 2);
  animateNumber(document.getElementById('f-seconds'), d.seconds, 2);
}

export function startFinaleFireworks() {
  setInterval(() => {
    if (!launched || !particles) return;
    particles.addBurst(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight * 0.5,
      15
    );
  }, 2000);
}
