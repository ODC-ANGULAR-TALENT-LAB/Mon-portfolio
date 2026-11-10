import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { prefersReducedMotion } from '../../shared/motion';

/**
 * Machine a ecrire : tape un mot, le laisse lire, l'efface, passe au suivant.
 * Les lecteurs d'ecran recoivent la liste complete une seule fois, sans le
 * bruit des lettres qui changent.
 */
@Component({
  selector: 'app-type-rotator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'type-rotator' },
  template: `<span class="visually-hidden">{{ words().join(', ') }}</span><span class="type-rotator-text" aria-hidden="true">{{ text() }}</span><span class="type-rotator-caret" aria-hidden="true"></span>`,
})
export class TypeRotator implements OnInit {
  readonly words = input.required<string[]>();
  protected readonly text = signal('');

  private timer?: ReturnType<typeof setTimeout>;
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const words = this.words();
    if (prefersReducedMotion()) {
      this.text.set(words[0]);
      return;
    }
    let w = 0;
    let i = 0;
    let deleting = false;

    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      this.text.set(word.slice(0, i));

      let delay = deleting ? 35 : 70;
      if (!deleting && i === word.length) {
        deleting = true;
        delay = 1800; // temps de lecture
      } else if (deleting && i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
        delay = 350;
      }
      this.timer = setTimeout(tick, delay);
    };
    this.timer = setTimeout(tick, 900);
    this.destroyRef.onDestroy(() => clearTimeout(this.timer));
  }
}
