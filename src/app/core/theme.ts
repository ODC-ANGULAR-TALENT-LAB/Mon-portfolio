import { Injectable, effect, signal } from '@angular/core';

const STORAGE_KEY = 'isDark';

/**
 * Remplace le couple StyleContext + useLocalStorage du projet React.
 * L'etat est un signal, persiste dans localStorage a chaque changement.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal(readInitialTheme());

  constructor() {
    effect(() => {
      const value = this.isDark();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch {
        // localStorage indisponible (navigation privee, quota) : on ignore
      }
    });
  }

  changeTheme(): void {
    this.isDark.update((value) => !value);
  }
}

function readInitialTheme(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      return JSON.parse(stored) as boolean;
    }
  } catch {
    // idem : on retombe sur la preference systeme
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
