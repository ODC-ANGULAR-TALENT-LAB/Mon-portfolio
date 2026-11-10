import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

/**
 * Theme clair / sombre.
 *
 * Le theme est pose sur <html data-theme> : les couleurs sont des variables CSS
 * redefinies par ce selecteur, aucun composant n'a besoin de connaitre le theme.
 * Un script en ligne dans index.html applique la meme logique avant le premier
 * rendu, pour eviter un flash de theme clair au chargement.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly root = inject(DOCUMENT).documentElement;
  readonly theme = signal<Theme>(readInitialTheme());

  constructor() {
    effect(() => {
      const value = this.theme();
      this.root.dataset['theme'] = value;
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // stockage indisponible (navigation privee) : le theme vaut pour la session
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
}

function readInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // on retombe sur la preference systeme
  }
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
