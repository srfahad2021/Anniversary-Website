import { burstParticles, spawnTrail, SceneParticles } from '../particle-system.js';
import { randomRange } from '../utils.js';

let canvas, ctx, particles = null;
let touchActive = false;
let showBtnTimer = null;

export function initInteractiveScene() {
  return {
    onEnter() {
      canvas = document.getElementById('interactive-canvas');
      ctx = canvas.getContext('2d');
      resizeCanvas();

      particles = new SceneParticles('interactive-canvas');
      particles.start();

      const hint = document.getElementById('interactive-hint');
      const btn = document.getElementById('btn-interactive');
      btn.classList.add('hidden');
      hint.classList.remove('hidden');

      canvas.addEventListener('touchstart', onTouch, { passive: true });
      canvas.addEventListener('touchmove', onMove, { passive: true });
      canvas.addEventListener('touchend', onEnd, { passive: true });

      showBtnTimer = setTimeout(() => {
        btn.classList.remove('hidden');
        gsap.fromTo(btn, { opacity: 0 }, { opacity: 1, duration: 0.6 });
      }, 8000);
    },
    onLeave() {
      canvas?.removeEventListener('touchstart', onTouch);
      canvas?.removeEventListener('touchmove', onMove);
      canvas?.removeEventListener('touchend', onEnd);
      if (showBtnTimer) clearTimeout(showBtnTimer);
      particles?.stop();
    },
  };
}

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onTouch(e) {
  touchActive = true;
  const t = e.touches[0];
  burstParticles(t.clientX, t.clientY, 15, 'heart');
  particles.addBurst(t.clientX, t.clientY, 20);
  document.getElementById('interactive-hint')?.classList.add('hidden');
}

function onMove(e) {
  if (!touchActive) return;
  const t = e.touches[0];
  spawnTrail(t.clientX, t.clientY);
  particles.addBurst(t.clientX, t.clientY, 3);

  // Draw heart trail on canvas
  drawTrailHeart(t.clientX, t.clientY);
}

function onEnd() {
  touchActive = false;
}

function drawTrailHeart(x, y) {
  if (!ctx) return;
  ctx.save();
  ctx.globalAlpha = randomRange(0.4, 0.8);
  ctx.font = `${randomRange(12, 20)}px serif`;
  ctx.fillText('❤️', x, y);
  ctx.restore();
}
