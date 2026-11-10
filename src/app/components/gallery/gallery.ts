import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Screenshot } from '../../core/content.types';
import { Icon } from '../icon/icon';
import { Tilt } from '../../shared/motion';

/**
 * Index de la capture voisine quand on avance (+1) ou recule (-1).
 *
 * Choix d'ergonomie : en arrivant au bout de la serie, on revient au debut
 * (boucle) ou on reste sur la derniere image (butee) ?
 */
export function stepIndex(current: number, delta: 1 | -1, length: number): number {
  // TODO(Christian) : choisir entre boucle et butee. Version actuelle : boucle.
  return (current + delta + length) % length;
}

/**
 * Galerie d'une etude de cas : une grande capture, des vignettes, et un
 * agrandissement plein ecran dans un <dialog> natif (focus piege, Echap pour
 * fermer, fond assombri : tout est fourni par le navigateur).
 */
@Component({
  selector: 'app-gallery',
  imports: [Icon, Tilt],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gallery.html',
  host: { class: 'gallery' },
})
export class Gallery {
  readonly shots = input.required<Screenshot[]>();
  readonly name = input.required<string>();
  /** Affiche dans la barre d'adresse du cadre navigateur. */
  readonly domain = input('');

  protected readonly index = signal(0);
  protected readonly current = computed(() => this.shots()[this.index()]);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected select(i: number): void {
    this.index.set(i);
  }

  protected step(delta: 1 | -1): void {
    this.index.set(stepIndex(this.index(), delta, this.shots().length));
  }

  protected open(): void {
    this.dialog().nativeElement.showModal();
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  protected onDialogKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') this.step(1);
    if (event.key === 'ArrowLeft') this.step(-1);
  }

  /** Un clic sur le fond (hors de l'image) ferme l'agrandissement. */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.close();
  }
}
