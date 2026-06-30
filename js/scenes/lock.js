import { getTimeUntilUnlock, pad } from '../utils.js';
import { playHeartbeat } from '../audio-manager.js';
import { transitionFadeBlack } from '../transitions.js';
import { goToScene } from '../scene-manager.js';

let countdownInterval = null;

export function initLockScene(unlockDate) {
  return {
    onEnter() {
      startCountdown(unlockDate);
    },
    onLeave() {
      if (countdownInterval) clearInterval(countdownInterval);
    },
  };
}

function startCountdown(unlockDate) {
  updateCountdown(unlockDate);
  countdownInterval = setInterval(() => updateCountdown(unlockDate), 1000);
}

function updateCountdown(unlockDate) {
  const remaining = getTimeUntilUnlock(unlockDate);

  if (remaining <= 0) {
    clearInterval(countdownInterval);
    onCountdownComplete();
    return;
  }

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-minutes').textContent = pad(minutes);
  document.getElementById('cd-seconds').textContent = pad(seconds);
}

async function onCountdownComplete() {
  document.querySelector('.lock-content')?.classList.add('hidden');
  playHeartbeat(4);

  await transitionFadeBlack(async () => {
    await new Promise((r) => setTimeout(r, 1500));
  });

  goToScene('intro');
}
