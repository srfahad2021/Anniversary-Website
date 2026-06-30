/**
 * Global particle system — canvas-based hearts, sparkles, golden dust
 */

import { randomRange } from './utils.js';

let canvas, ctx, particles = [], butterflies = [], animationId = null;
let width, height;

const COLORS = {
  pink: 'rgba(255, 214, 231,',
  gold: 'rgba(255, 215, 0,',
  soft: 'rgba(248, 200, 220,',
  white: 'rgba(255, 255, 255,',
};

export function initGlobalParticles() {
  canvas = document.getElementById('global-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 40; i++) {
    particles.push(createParticle('ambient'));
  }

  for (let i = 0; i < 3; i++) {
    butterflies.push({
      x: randomRange(0, width),
      y: randomRange(0, height),
      vx: randomRange(-0.3, 0.3),
      vy: randomRange(-0.2, 0.2),
      phase: randomRange(0, Math.PI * 2),
      emoji: '🦋',
    });
  }

  animate();
}

function resize() {
  if (!canvas) return;
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

function createParticle(type, x, y) {
  const types = {
    ambient: { size: randomRange(1, 3), speed: randomRange(0.2, 0.6), color: COLORS.pink, life: Infinity },
    heart: { size: randomRange(8, 16), speed: randomRange(1, 3), color: COLORS.pink, life: 120, emoji: '❤️' },
    sparkle: { size: randomRange(2, 5), speed: randomRange(0.5, 2), color: COLORS.gold, life: 80 },
    gold: { size: randomRange(1, 4), speed: randomRange(0.3, 1.5), color: COLORS.gold, life: 100 },
    petal: { size: randomRange(4, 8), speed: randomRange(0.5, 1.5), color: COLORS.soft, life: 150 },
  };

  const config = types[type] || types.ambient;
  return {
    type,
    x: x ?? randomRange(0, width),
    y: y ?? randomRange(0, height),
    vx: randomRange(-0.5, 0.5),
    vy: -config.speed,
    size: config.size,
    color: config.color,
    alpha: randomRange(0.3, 0.8),
    life: config.life,
    maxLife: config.life,
    emoji: config.emoji,
    rotation: randomRange(0, Math.PI * 2),
    rotSpeed: randomRange(-0.02, 0.02),
  };
}

function animate() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotSpeed;

    if (p.life !== Infinity) {
      p.life--;
      p.alpha = (p.life / p.maxLife) * 0.8;
      if (p.life <= 0) {
        particles[i] = createParticle('ambient');
        return;
      }
    }

    if (p.y < -20) {
      p.y = height + 20;
      p.x = randomRange(0, width);
    }
    if (p.x < -20) p.x = width + 20;
    if (p.x > width + 20) p.x = -20;

    drawParticle(p);
  });

  butterflies.forEach((b) => {
    b.phase += 0.02;
    b.x += b.vx + Math.sin(b.phase) * 0.5;
    b.y += b.vy + Math.cos(b.phase) * 0.3;
    if (b.x < -30) b.x = width + 30;
    if (b.x > width + 30) b.x = -30;
    if (b.y < -30) b.y = height + 30;
    if (b.y > height + 30) b.y = -30;

    ctx.globalAlpha = 0.6;
    ctx.font = '16px serif';
    ctx.fillText(b.emoji, b.x, b.y);
    ctx.globalAlpha = 1;
  });

  animationId = requestAnimationFrame(animate);
}

function drawParticle(p) {
  ctx.save();
  ctx.globalAlpha = p.alpha;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);

  if (p.emoji) {
    ctx.font = `${p.size}px serif`;
    ctx.fillText(p.emoji, 0, 0);
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `${p.color} ${p.alpha})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = `${p.color} 0.5)`;
    ctx.fill();
  }

  ctx.restore();
}

export function burstParticles(x, y, count = 12, type = 'heart') {
  for (let i = 0; i < count; i++) {
    const p = createParticle(type, x, y);
    p.vx = randomRange(-3, 3);
    p.vy = randomRange(-4, -1);
    p.life = randomRange(60, 120);
    p.maxLife = p.life;
    particles.push(p);
  }
}

export function spawnTrail(x, y) {
  const types = ['heart', 'sparkle', 'gold'];
  const type = types[Math.floor(Math.random() * types.length)];
  const p = createParticle(type, x, y);
  p.vx = randomRange(-1, 1);
  p.vy = randomRange(-2, 0);
  p.life = 40;
  p.maxLife = 40;
  particles.push(p);
}

export function massiveExplosion() {
  for (let i = 0; i < 80; i++) {
    const types = ['heart', 'sparkle', 'gold', 'petal'];
    const type = types[Math.floor(Math.random() * types.length)];
    const p = createParticle(type, width / 2, height / 2);
    p.vx = randomRange(-6, 6);
    p.vy = randomRange(-8, 4);
    p.life = randomRange(80, 160);
    p.maxLife = p.life;
    particles.push(p);
  }
}

export function stopGlobalParticles() {
  if (animationId) cancelAnimationFrame(animationId);
}

/**
 * Dedicated canvas particle engine for intro / finale scenes
 */
export class SceneParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas?.getContext('2d');
    this.particles = [];
    this.running = false;
    this.raf = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerHeight;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.loop();
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  clear() {
    this.particles = [];
    this.ctx?.clearRect(0, 0, this.w, this.h);
  }

  addBurst(x, y, count, color = COLORS.pink) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + randomRange(-0.2, 0.2);
      const speed = randomRange(1, 5);
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: randomRange(2, 6),
        color,
        alpha: 1,
        life: randomRange(40, 100),
        maxLife: 100,
      });
    }
  }

  addGathering(targetX, targetY, count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: randomRange(0, this.w),
        y: randomRange(0, this.h),
        targetX, targetY,
        gathering: true,
        size: randomRange(2, 5),
        color: COLORS.pink,
        alpha: randomRange(0.5, 1),
        life: Infinity,
      });
    }
  }

  loop() {
    if (!this.running || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.w, this.h);

    this.particles = this.particles.filter((p) => {
      if (p.gathering) {
        p.x += (p.targetX - p.x) * 0.03;
        p.y += (p.targetY - p.y) * 0.03;
      } else {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life--;
        p.alpha = p.life / p.maxLife;
      }

      this.ctx.globalAlpha = p.alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color} ${p.alpha})`;
      this.ctx.shadowBlur = 12;
      this.ctx.shadowColor = `${p.color} 0.6)`;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;

      return p.gathering || p.life > 0;
    });

    this.raf = requestAnimationFrame(() => this.loop());
  }
}
