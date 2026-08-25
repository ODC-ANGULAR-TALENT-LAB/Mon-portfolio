import { Component, computed, input } from '@angular/core';
import { splitEmoji } from '../core/emoji';

/**
 * Equivalent de react-easy-emoji : remplace les emoji d'une chaine par les
 * images twemoji, avec les memes URL, attributs et styles inline.
 *
 * Le template est volontairement ecrit sur une seule ligne (et soustrait a
 * prettier) : le moindre retour a la ligne entre les segments ajouterait des
 * espaces parasites autour des emoji.
 *
 *   <app-emoji [text]="greeting.subTitle" />
 */
@Component({
  selector: 'app-emoji',
  // prettier-ignore
  template: `@for (part of parts(); track $index) {@if (part.kind === 'text') {{{ part.value }}} @else {<img [src]="part.src" [alt]="part.match" draggable="false" style="height: 1em; width: 1em; margin: 0 0.05em 0 0.1em; vertical-align: -0.1em" />}}`,
  styles: ':host { display: contents; }',
})
export class Emoji {
  readonly text = input.required<string>();
  protected readonly parts = computed(() => splitEmoji(this.text()));
}
