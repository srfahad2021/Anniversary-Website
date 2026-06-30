import { CONFIG } from '../config.js';
import { duckMusic, restoreMusic } from '../audio-manager.js';
import { delay } from '../utils.js';

let played = false;

export function initLetterScene() {
  return {
    async onEnter() {
      if (played) return;
      played = true;

      const envelope = document.getElementById('envelope');
      const letterStage = document.getElementById('letter-stage');
      const letterPaper = document.getElementById('letter-paper');
      const letterText = document.getElementById('letter-text');
      const cursor = document.getElementById('letter-cursor');
      const btn = document.getElementById('btn-letter');

      btn.classList.add('hidden');
      letterText.textContent = '';
      envelope.classList.remove('open');
      letterStage.classList.remove('reading');
      letterPaper.scrollTop = 0;

      await delay(800);
      envelope.classList.add('open');
      await delay(900);
      letterStage.classList.add('reading');
      await delay(600);

      duckMusic();
      cursor.style.display = 'inline';

      await typeLetter(letterText, CONFIG.loveLetter, 30);

      cursor.style.display = 'none';
      restoreMusic();

      btn.classList.remove('hidden');
      gsap.fromTo(btn, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
    },
  };
}

async function typeLetter(el, text, speed) {
  const paper = document.getElementById('letter-paper');
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    if (paper && i % 8 === 0) {
      paper.scrollTop = paper.scrollHeight;
    }
    if (i % 3 === 0) await delay(speed);
    else await delay(speed * 0.3);
  }
  if (paper) paper.scrollTop = paper.scrollHeight;
}
