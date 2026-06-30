/**
 * Magical scene transitions
 */

const overlay = () => document.getElementById('transition-overlay');

export async function transitionHeartMorph(fromScene, toScene) {
  const el = overlay();
  el.style.background = 'radial-gradient(circle, rgba(255,100,120,0.3) 0%, #120B16 70%)';
  el.classList.add('active');

  await gsap.to(el, { opacity: 1, duration: 0.5, ease: 'power2.in' });
  fromScene?.classList.remove('active');
  toScene?.classList.add('active');

  await gsap.to(el, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.2,
  });

  el.classList.remove('active');
}

export async function transitionGlowFade(fromScene, toScene) {
  const el = overlay();
  el.style.background = 'var(--bg-plum)';
  el.classList.add('active');

  await gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.inOut' });
  fromScene?.classList.remove('active');
  toScene?.classList.add('active');
  await gsap.to(el, { opacity: 0, duration: 0.8, ease: 'power2.out' });
  el.classList.remove('active');
}

export async function transitionPetalWipe(fromScene, toScene) {
  const el = overlay();
  el.style.background = 'linear-gradient(180deg, transparent, rgba(248,200,220,0.4), var(--bg-plum))';
  el.classList.add('active');

  await gsap.fromTo(el, { opacity: 0, y: '-100%' }, { opacity: 1, y: '0%', duration: 0.7, ease: 'power3.inOut' });
  fromScene?.classList.remove('active');
  toScene?.classList.add('active');
  await gsap.to(el, { opacity: 0, duration: 0.6, ease: 'power2.out' });
  el.classList.remove('active');
  gsap.set(el, { y: '0%' });
}

export async function transitionParticleDissolve(fromScene, toScene) {
  const el = overlay();
  el.style.background = 'radial-gradient(circle at center, rgba(255,215,0,0.2) 0%, var(--bg-plum) 80%)';
  el.classList.add('active');

  await gsap.fromTo(el, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1.2, duration: 0.5, ease: 'power2.in' });
  fromScene?.classList.remove('active');
  toScene?.classList.add('active');
  await gsap.to(el, { opacity: 0, scale: 1, duration: 0.7, ease: 'power2.out' });
  el.classList.remove('active');
  gsap.set(el, { scale: 1 });
}

export async function transitionFadeBlack(callback) {
  const el = overlay();
  el.style.background = '#000';
  el.classList.add('active');

  await gsap.to(el, { opacity: 1, duration: 1, ease: 'power2.in' });
  if (callback) await callback();
  await gsap.to(el, { opacity: 0, duration: 1.2, ease: 'power2.out' });
  el.classList.remove('active');
}

const TRANSITIONS = [
  transitionGlowFade,
  transitionHeartMorph,
  transitionPetalWipe,
  transitionParticleDissolve,
];

let transitionIndex = 0;

export function nextTransition(fromScene, toScene) {
  const fn = TRANSITIONS[transitionIndex % TRANSITIONS.length];
  transitionIndex++;
  return fn(fromScene, toScene);
}
