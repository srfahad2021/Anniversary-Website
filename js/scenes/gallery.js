import { CONFIG } from '../config.js';

let built = false;

export function initGalleryScene() {
  return {
    onEnter() {
      if (!built) {
        buildGallery();
        built = true;
      }
      initGalleryScroll();
    },
  };
}

function buildGallery() {
  const track = document.getElementById('gallery-track');
  track.innerHTML = '';

  CONFIG.photos.forEach((photo, i) => {
    const slide = document.createElement('div');
    slide.className = `gallery-slide${i === 0 ? ' active' : ''}`;
    slide.innerHTML = `
      <div class="gallery-image-wrap">
        <img src="${photo.src}" alt="${photo.title}" loading="lazy"
          onerror="this.style.background='linear-gradient(135deg,#2a1a30,#4a2040)';this.style.minHeight='100%';this.removeAttribute('src')">
      </div>
      <div class="gallery-caption glass-card">
        <div class="date">${photo.date}</div>
        <div class="title">${photo.title}</div>
        <div class="memory">${photo.memory}</div>
      </div>
    `;
    track.appendChild(slide);
  });
}

function initGalleryScroll() {
  const track = document.getElementById('gallery-track');
  const slides = track.querySelectorAll('.gallery-slide');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          slides.forEach((s) => s.classList.remove('active'));
          entry.target.classList.add('active');
          gsap.fromTo(entry.target.querySelector('.gallery-image-wrap'),
            { scale: 0.92, opacity: 0.7 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
          );
        }
      });
    },
    { root: track, threshold: 0.6 }
  );

  slides.forEach((s) => observer.observe(s));
}
