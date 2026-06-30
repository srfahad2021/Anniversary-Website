/**
 * Main entry point — initializes all scenes and starts the experience
 */

import { CONFIG } from './config.js';
import { isUnlocked } from './utils.js';
import { initAudio, showMusicControls, fadeInMusic } from './audio-manager.js';
import { initGlobalParticles } from './particle-system.js';
import { initTouchHearts } from './floating-hearts.js';
import { registerScene, initNavigation, setInitialScene, goToScene } from './scene-manager.js';
import { initLockScene } from './scenes/lock.js';
import { initIntroScene } from './scenes/intro.js';
import { initWelcomeScene } from './scenes/welcome.js';
import { initJourneyScene } from './scenes/journey.js';
import { initGalleryScene } from './scenes/gallery.js';
import { initLoveMeterScene } from './scenes/loveMeter.js';
import { initReasonsScene } from './scenes/reasons.js';
import { initLetterScene } from './scenes/letter.js';
import { initTimerScene } from './scenes/timer.js';
import { initInteractiveScene } from './scenes/interactive.js';
import { initFinalScene } from './scenes/final.js';
import { initFinaleScene, startFinaleFireworks } from './scenes/finale.js';

function registerAllScenes() {
  registerScene('lock', initLockScene(CONFIG.unlockDate));
  registerScene('intro', initIntroScene());
  registerScene('welcome', initWelcomeScene());
  registerScene('journey', initJourneyScene());
  registerScene('gallery', initGalleryScene());
  registerScene('love-meter', initLoveMeterScene());
  registerScene('reasons', initReasonsScene());
  registerScene('letter', initLetterScene());
  registerScene('timer', initTimerScene());
  registerScene('interactive', initInteractiveScene());
  registerScene('final', initFinalScene());
  registerScene('finale', initFinaleScene());
}

function determineStartScene() {
  const introPlayed = sessionStorage.getItem('introPlayed');

  if (!isUnlocked(CONFIG.unlockDate, CONFIG.devBypassLock)) {
    return 'lock';
  }

  if (!introPlayed) {
    sessionStorage.setItem('introPlayed', 'true');
    return 'intro';
  }

  return 'welcome';
}

async function init() {
  initAudio();
  initGlobalParticles();
  initTouchHearts();
  registerAllScenes();
  initNavigation();
  startFinaleFireworks();

  const startScene = determineStartScene();
  setInitialScene(startScene);

  // If already unlocked and skipping lock/intro, start music
  if (startScene === 'welcome') {
    showMusicControls();
    fadeInMusic();
  }

  // Prevent pull-to-refresh and bounce
  document.body.addEventListener('touchmove', (e) => {
    if (e.target.closest('.gallery-track')) return;
    if (!e.target.closest('#interactive-canvas')) {
      // Allow default only on scrollable gallery
    }
  }, { passive: true });

  // Resume audio context on first interaction (iOS requirement)
  document.addEventListener('touchstart', () => {
    import('./audio-manager.js').then((m) => m.resumeAudioContext());
  }, { once: true });
}

document.addEventListener('DOMContentLoaded', init);
