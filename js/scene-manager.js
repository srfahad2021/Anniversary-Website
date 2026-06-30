/**
 * Scene navigation orchestrator
 */

import { nextTransition } from './transitions.js';

const scenes = new Map();
let currentScene = null;
let isTransitioning = false;

export function registerScene(name, handlers) {
  scenes.set(name, {
    el: document.querySelector(`[data-scene="${name}"]`),
    ...handlers,
  });
}

export function getCurrentScene() {
  return currentScene;
}

export async function goToScene(name) {
  if (isTransitioning || name === currentScene) return;
  const next = scenes.get(name);
  if (!next?.el) return;

  isTransitioning = true;
  const prev = currentScene ? scenes.get(currentScene) : null;

  if (prev?.onLeave) await prev.onLeave();

  await nextTransition(prev?.el, next.el);

  if (currentScene) scenes.get(currentScene)?.el?.classList.remove('active');
  next.el.classList.add('active');

  const prevName = currentScene;
  currentScene = name;

  if (next.onEnter) await next.onEnter(prevName);
  isTransitioning = false;
}

export function initNavigation() {
  document.querySelectorAll('[data-next]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-next');
      if (next) goToScene(next);
    });
  });
}

export function setInitialScene(name) {
  document.querySelectorAll('.scene').forEach((s) => s.classList.remove('active'));
  const scene = scenes.get(name);
  if (scene?.el) {
    scene.el.classList.add('active');
    currentScene = name;
    scene.onEnter?.();
  }
}
