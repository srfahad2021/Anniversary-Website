/**
 * Audio manager — background music, heartbeat, volume control
 */

import { CONFIG } from './config.js';

let audioCtx = null;
let musicEl = null;
let isMuted = false;
let savedVolume = CONFIG.music.defaultVolume;

export function initAudio() {
  musicEl = document.getElementById('bg-music');
  if (musicEl && CONFIG.music.src) {
    musicEl.src = CONFIG.music.src;
    musicEl.volume = 0;
  }

  const playBtn = document.getElementById('music-play');
  const pauseBtn = document.getElementById('music-pause');
  const volumeSlider = document.getElementById('music-volume');
  const muteBtn = document.getElementById('music-mute');

  playBtn?.addEventListener('click', () => playMusic());
  pauseBtn?.addEventListener('click', () => pauseMusic());
  muteBtn?.addEventListener('click', () => toggleMute());

  volumeSlider?.addEventListener('input', (e) => {
    const vol = e.target.value / 100;
    savedVolume = vol;
    if (!isMuted && musicEl) musicEl.volume = vol;
  });

  if (volumeSlider) {
    volumeSlider.value = CONFIG.music.defaultVolume * 100;
  }
}

export function showMusicControls() {
  document.getElementById('music-controls')?.classList.remove('hidden');
}

export async function fadeInMusic(duration = CONFIG.music.fadeInDuration) {
  if (!musicEl) return;
  try {
    await musicEl.play();
  } catch {
    // Autoplay blocked — user can press play
    return;
  }
  const target = isMuted ? 0 : savedVolume;
  const steps = 30;
  const stepTime = (duration * 1000) / steps;
  for (let i = 0; i <= steps; i++) {
    musicEl.volume = (target * i) / steps;
    await new Promise((r) => setTimeout(r, stepTime));
  }
}

export function playMusic() {
  musicEl?.play();
  if (musicEl && !isMuted) musicEl.volume = savedVolume;
}

export function pauseMusic() {
  musicEl?.pause();
}

export function setMusicVolume(vol) {
  savedVolume = vol;
  if (musicEl && !isMuted) musicEl.volume = vol;
}

export function duckMusic() {
  if (musicEl) musicEl.volume = CONFIG.music.letterVolume;
}

export function restoreMusic() {
  if (musicEl && !isMuted) musicEl.volume = savedVolume;
}

export function climaxMusic() {
  if (musicEl && !isMuted) musicEl.volume = Math.min(1, savedVolume + 0.2);
}

function toggleMute() {
  isMuted = !isMuted;
  const muteBtn = document.getElementById('music-mute');
  if (muteBtn) muteBtn.textContent = isMuted ? '🔇' : '🔊';
  if (musicEl) musicEl.volume = isMuted ? 0 : savedVolume;
}

export function playHeartbeat(times = 3) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    for (let i = 0; i < times; i++) {
      const t = audioCtx.currentTime + i * 0.9;
      playHeartbeatPulse(t, 0.12);
      playHeartbeatPulse(t + 0.15, 0.08);
    }
  } catch {
    // Silent fallback
  }
}

function playHeartbeatPulse(time, gain) {
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(60, time);
  osc.frequency.exponentialRampToValueAtTime(40, time + 0.15);
  g.gain.setValueAtTime(0, time);
  g.gain.linearRampToValueAtTime(gain, time + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
  osc.connect(g);
  g.connect(audioCtx.destination);
  osc.start(time);
  osc.stop(time + 0.25);
}

export function resumeAudioContext() {
  if (audioCtx?.state === 'suspended') audioCtx.resume();
}
