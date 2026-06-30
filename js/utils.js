/**
 * Shared utility functions
 */

export function pad(num, digits = 2) {
  return String(num).padStart(digits, '0');
}

export function getUnlockTime(unlockDate) {
  const d = new Date(unlockDate + 'T00:00:00');
  return d.getTime();
}

export function isUnlocked(unlockDate, devBypass = false) {
  if (devBypass) return true;
  return Date.now() >= getUnlockTime(unlockDate);
}

export function getTimeUntilUnlock(unlockDate) {
  return Math.max(0, getUnlockTime(unlockDate) - Date.now());
}

export function getRelationshipDuration(startDate) {
  const start = new Date(startDate);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return { years, months, days, hours, minutes, seconds };
}

export function getForeverDuration(startTime) {
  const start = typeof startTime === 'number' ? startTime : Date.now() - 1000;
  const diff = Math.max(0, Date.now() - start);
  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  const days = totalDays % 30;
  const totalMonths = Math.floor(totalDays / 30);
  const months = totalMonths % 12;
  const years = Math.floor(totalMonths / 12);

  return { years, months, days, hours, minutes, seconds };
}

export function animateNumber(el, newValue, padDigits = 0) {
  const display = padDigits ? pad(newValue, padDigits) : String(newValue);
  if (el.textContent !== display) {
    el.textContent = display;
    el.classList.remove('tick');
    void el.offsetWidth;
    el.classList.add('tick');
  }
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}
