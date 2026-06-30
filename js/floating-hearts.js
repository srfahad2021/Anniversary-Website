/**
 * Touch-based floating hearts and finger trails
 */

import { burstParticles, spawnTrail } from './particle-system.js';
import { randomRange, createElement } from './utils.js';

let container, holdInterval = null;

export function initTouchHearts() {
  container = document.getElementById('touch-hearts');
  if (!container) return;

  document.addEventListener('touchstart', onTouchStart, { passive: true });
  document.addEventListener('touchmove', onTouchMove, { passive: true });
  document.addEventListener('touchend', onTouchEnd, { passive: true });
  document.addEventListener('touchcancel', onTouchEnd, { passive: true });
}

function onTouchStart(e) {
  const touch = e.touches[0];
  if (!touch) return;
  spawnHeart(touch.clientX, touch.clientY);
  burstParticles(touch.clientX, touch.clientY, 6, 'heart');

  holdInterval = setInterval(() => {
    const x = touch.clientX + randomRange(-20, 20);
    const y = touch.clientY + randomRange(-20, 20);
    spawnHeart(x, y);
    burstParticles(x, y, 3, 'sparkle');
  }, 150);
}

function onTouchMove(e) {
  const touch = e.touches[0];
  if (!touch) return;
  spawnTrail(touch.clientX, touch.clientY);
  if (Math.random() > 0.7) {
    spawnHeart(touch.clientX + randomRange(-10, 10), touch.clientY + randomRange(-10, 10));
  }
}

function onTouchEnd() {
  if (holdInterval) {
    clearInterval(holdInterval);
    holdInterval = null;
  }
}

function spawnHeart(x, y) {
  const heart = createElement('div', 'touch-heart');
  heart.textContent = Math.random() > 0.8 ? '✨' : '❤️';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.fontSize = `${randomRange(14, 28)}px`;
  container.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
}

export function createPetals(parent, count = 15) {
  if (!parent) return;
  for (let i = 0; i < count; i++) {
    const petal = createElement('div', 'petal');
    petal.style.left = `${randomRange(0, 100)}%`;
    petal.style.animationDuration = `${randomRange(8, 16)}s`;
    petal.style.animationDelay = `${randomRange(0, 10)}s`;
    petal.style.width = `${randomRange(8, 14)}px`;
    petal.style.height = petal.style.width;
    parent.appendChild(petal);
  }
}
