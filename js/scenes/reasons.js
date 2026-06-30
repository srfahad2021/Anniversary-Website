import { CONFIG } from '../config.js';

const VISIBLE_STACK = 4;
let currentIndex = 0;
let built = false;
let isAnimating = false;
let floatTween = null;

export function initReasonsScene() {
  return {
    onEnter() {
      if (!built) {
        setupNav();
        built = true;
      }
      currentIndex = 0;
      renderStack();
      updateCounter();
    },
  };
}

function renderStack() {
  const stack = document.getElementById('card-stack');
  stack.innerHTML = '';

  const count = Math.min(VISIBLE_STACK, CONFIG.reasons.length - currentIndex);

  for (let i = count - 1; i >= 0; i--) {
    const card = createCard(CONFIG.reasons[currentIndex + i], i);
    stack.appendChild(card);
  }

  startFloatAnimation();
}

function createCard(reason, depth) {
  const card = document.createElement('div');
  card.className = 'reason-card glass-card';
  card.dataset.index = String(reason.number - 1);
  card.innerHTML = `
    <div class="card-number">Reason ${reason.number}</div>
    <div class="card-title">${reason.title}</div>
    <div class="card-text">${reason.text}</div>
  `;

  gsap.set(card, {
    x: 0,
    y: depth * 8,
    rotation: 0,
    scale: 1 - depth * 0.04,
    opacity: 1 - depth * 0.12,
    zIndex: VISIBLE_STACK - depth,
    transformOrigin: '50% 50%',
  });

  return card;
}

function getTopCard() {
  const stack = document.getElementById('card-stack');
  const cards = stack.querySelectorAll('.reason-card');
  return cards.length ? cards[cards.length - 1] : null;
}

function startFloatAnimation() {
  if (floatTween) floatTween.kill();

  const top = getTopCard();
  if (!top) return;

  const baseY = gsap.getProperty(top, 'y') || 0;
  floatTween = gsap.to(top, {
    y: baseY - 5,
    duration: 2.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

function setupNav() {
  document.getElementById('card-prev').addEventListener('click', () => swipeCard('left'));
  document.getElementById('card-next').addEventListener('click', () => swipeCard('right'));

  const stack = document.getElementById('card-stack');
  let startX = 0;
  let startY = 0;

  stack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  stack.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      swipeCard(dx > 0 ? 'right' : 'left');
    }
  }, { passive: true });
}

async function swipeCard(direction) {
  if (isAnimating) return;
  if (currentIndex >= CONFIG.reasons.length - 1) return;

  const stack = document.getElementById('card-stack');
  const topCard = getTopCard();
  if (!topCard) return;

  isAnimating = true;
  if (floatTween) floatTween.kill();

  const xOut = direction === 'left' ? -window.innerWidth * 1.1 : window.innerWidth * 1.1;
  const rotation = direction === 'left' ? -10 : 10;

  await gsap.to(topCard, {
    x: xOut,
    rotation,
    opacity: 0,
    duration: 0.42,
    ease: 'power2.in',
  });

  topCard.remove();
  currentIndex++;

  const remaining = stack.querySelectorAll('.reason-card');
  const tl = gsap.timeline();

  remaining.forEach((card, i) => {
    const depth = remaining.length - 1 - i;
    tl.to(card, {
      y: depth * 8,
      scale: 1 - depth * 0.04,
      opacity: 1 - depth * 0.12,
      rotation: 0,
      x: 0,
      duration: 0.38,
      ease: 'power2.out',
      overwrite: true,
    }, 0);
  });

  await tl;

  const backIndex = currentIndex + remaining.length;
  if (backIndex < CONFIG.reasons.length) {
    const depth = remaining.length;
    const newCard = createCard(CONFIG.reasons[backIndex], depth);
    gsap.set(newCard, { opacity: 0, y: depth * 8 + 20 });
    stack.insertBefore(newCard, stack.firstChild);

    await gsap.to(newCard, {
      y: depth * 8,
      opacity: 1 - depth * 0.12,
      duration: 0.38,
      ease: 'power2.out',
    });
  }

  startFloatAnimation();
  updateCounter();
  isAnimating = false;
}

function updateCounter() {
  document.getElementById('card-counter').textContent =
    `Reason ${currentIndex + 1} / ${CONFIG.reasons.length}`;
}
