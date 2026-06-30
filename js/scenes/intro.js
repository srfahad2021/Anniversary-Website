import { CONFIG } from '../config.js';
import { SceneParticles } from '../particle-system.js';
import { playHeartbeat } from '../audio-manager.js';
import { fadeInMusic, showMusicControls } from '../audio-manager.js';
import { goToScene } from '../scene-manager.js';
import { delay } from '../utils.js';

let particles = null;

export function initIntroScene() {
  return {
    async onEnter() {
      const canvas = document.getElementById('intro-canvas');
      const introText = document.getElementById('intro-text');
      const namesEl = document.getElementById('intro-names');

      introText.classList.add('hidden');
      namesEl.textContent = `${CONFIG.names.her} ❤️`;

      particles = new SceneParticles('intro-canvas');
      particles.start();

      playHeartbeat(3);
      await delay(800);

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      // Tiny heart grows
      await animateGrowingHeart(canvas, cx, cy);
      await delay(500);

      // Particles gather into giant heart
      particles.addGathering(cx, cy, 200);
      await delay(2500);

      // Show text
      introText.classList.remove('hidden');
      gsap.fromTo(introText, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' });
      await delay(2500);

      // Portal open — heart expands
      await gsap.to(canvas, { scale: 3, opacity: 0, duration: 1.2, ease: 'power2.in' });
      gsap.set(canvas, { scale: 1, opacity: 1 });

      particles.stop();
      particles.clear();

      showMusicControls();
      fadeInMusic();

      goToScene('welcome');
    },
  };
}

async function animateGrowingHeart(canvas, cx, cy) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width = window.innerWidth;
  const h = canvas.height = window.innerHeight;

  return new Promise((resolve) => {
    let size = 8;
    let pulse = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      pulse += 0.08;
      const s = size + Math.sin(pulse) * 4;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s / 30, s / 30);
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(255, 100, 120, 0.8)';
      drawHeartShape(ctx, 0, 0, 30, 'rgba(255, 100, 120, 0.9)');
      ctx.restore();

      size += 0.8;
      if (size < 60) {
        requestAnimationFrame(draw);
      } else {
        resolve();
      }
    }
    draw();
  });
}

function drawHeartShape(ctx, x, y, size, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.5, x, y + size);
  ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.5, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.fill();
}
