import { ChangeDetectionStrategy, Component } from '@angular/core';
import { experiences } from '../../core/content';
import { Experience } from '../../core/content.types';
import { Icon, IconName } from '../../components/icon/icon';
import { Reveal } from '../../shared/motion';

const KIND_ICON: Record<Experience['kind'], IconName> = {
  Emploi: 'wrench',
  Stage: 'briefcase',
  Formation: 'graduation',
};

/** Parcours : une frise chronologique, du plus recent au plus ancien. */
@Component({
  selector: 'app-journey',
  imports: [Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section shell" id="parcours" aria-labelledby="parcours-title">
      <header class="section-head" appReveal>
        <p class="section-kicker"><app-icon name="briefcase" /> Parcours</p>
        <h2 class="section-title" id="parcours-title">Du composant à l’interface</h2>
        <p class="section-lede">
          Du dépannage de matériel à la conception de logiciels : je connais une machine
          du composant jusqu’à l’interface.
        </p>
      </header>

      <ol class="timeline" appReveal>
        @for (e of experiences; track e.org; let i = $index) {
          <li class="timeline-item" [style.--i]="i">
            <span class="timeline-node" aria-hidden="true"><app-icon [name]="icon[e.kind]" /></span>
            <p class="timeline-period">{{ e.period }}</p>
            <div class="timeline-body">
              <h3 class="timeline-role">{{ e.role }}</h3>
              <p class="timeline-org">
                {{ e.org }}, {{ e.place }}
                <span class="kind kind-{{ e.kind.toLowerCase() }}">{{ e.kind }}</span>
              </p>
              <p>{{ e.summary }}</p>
              @if (e.highlights.length) {
                <ul class="case-list">
                  @for (h of e.highlights; track $index) {
                    <li>{{ h }}</li>
                  }
                </ul>
              }
            </div>
          </li>
        }
      </ol>
    </section>
  `,
})
export class Journey {
  protected readonly experiences = experiences;
  protected readonly icon = KIND_ICON;
}
