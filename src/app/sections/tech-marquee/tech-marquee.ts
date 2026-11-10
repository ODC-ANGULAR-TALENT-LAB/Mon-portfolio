import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MARQUEE_ROWS } from '../../core/tech';
import { TechLogo } from '../../components/tech-logo/tech-logo';

/**
 * Deux bandeaux de logos qui defilent en sens inverse.
 * Chaque rangee est dupliquee : l'animation translate de -50 %, et la copie
 * prend exactement la place de l'original, d'ou une boucle sans a-coup.
 * La copie est masquee aux lecteurs d'ecran.
 */
@Component({
  selector: 'app-tech-marquee',
  imports: [TechLogo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="marquee-section" aria-label="Technologies utilisées au quotidien">
      @for (row of rows; track $index; let odd = $odd) {
        <div class="marquee" [class.marquee-reverse]="odd">
          <ul class="marquee-track">
            @for (copy of [0, 1]; track copy) {
              @for (name of row; track name) {
                <li [attr.aria-hidden]="copy === 1 ? 'true' : null">
                  <app-tech-logo [name]="name" [label]="true" />
                </li>
              }
            }
          </ul>
        </div>
      }
    </section>
  `,
})
export class TechMarquee {
  protected readonly rows = MARQUEE_ROWS;
}
