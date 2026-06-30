import { CONFIG } from '../config.js';
import { createPetals } from '../floating-hearts.js';
import { delay } from '../utils.js';

let typed = false;

export function initWelcomeScene() {
  return {
    async onEnter() {
      const container = document.getElementById('welcome-typing');
      const btn = document.getElementById('btn-welcome');
      const petals = document.getElementById('welcome-petals');

      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
      container.innerHTML = '';
      petals.innerHTML = '';
      createPetals(petals, 20);

      if (!typed) {
        await typeWelcomeMessage(container);
        typed = true;
      } else {
        renderWelcomeMessage(container);
      }

      gsap.to(btn, { opacity: 1, duration: 0.8, ease: 'power2.out' });
      btn.style.pointerEvents = 'auto';
    },
  };
}

async function typeWelcomeMessage(container) {
  for (const line of CONFIG.welcomeMessage) {
    if (line.type === 'highlight') {
      const el = document.createElement('span');
      el.className = 'highlight';
      container.appendChild(el);
      await typeText(el, line.text, 60);
      container.appendChild(document.createElement('br'));
    } else if (line.text === '') {
      container.appendChild(document.createElement('br'));
      await delay(200);
    } else {
      const el = document.createElement('span');
      container.appendChild(el);
      await typeText(el, line.text, 35);
      container.appendChild(document.createElement('br'));
    }
    await delay(150);
  }
}

function renderWelcomeMessage(container) {
  CONFIG.welcomeMessage.forEach((line) => {
    if (line.type === 'highlight') {
      const el = document.createElement('span');
      el.className = 'highlight';
      el.textContent = line.text;
      container.appendChild(el);
      container.appendChild(document.createElement('br'));
    } else if (line.text === '') {
      container.appendChild(document.createElement('br'));
    } else {
      const el = document.createElement('span');
      el.textContent = line.text;
      container.appendChild(el);
      container.appendChild(document.createElement('br'));
    }
  });
}

async function typeText(el, text, speed) {
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await delay(speed);
  }
}
