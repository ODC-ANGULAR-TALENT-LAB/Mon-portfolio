import { Component, inject, input } from '@angular/core';
import { ThemeService } from '../../core/theme';
import { RevealDirective } from '../../shared/reveal.directive';

export interface School {
  schoolName: string;
  logo?: string;
  subHeader: string;
  duration: string;
  desc: string;
  descBullets?: string[];
}

@Component({
  selector: 'app-education-card',
  imports: [RevealDirective],
  template: `
    <div class="education-card" appReveal="left" [revealDuration]="1000">
      <div class="education-card-rail" aria-hidden="true">
        <span class="education-card-dot"></span>
      </div>

      <div class="education-card-body">
        <p class="education-text-duration">{{ school().duration }}</p>
        <h5 class="education-text-subHeader">{{ school().subHeader }}</h5>
        <p class="education-text-school">
          @if (school().logo; as logo) {
            <img class="education-roundedimg" [src]="logo" [alt]="school().schoolName" />
          }
          {{ school().schoolName }}
        </p>
        <p class="education-text-desc">{{ school().desc }}</p>

        @if (school().descBullets?.length) {
          <ul class="education-badges">
            @for (item of school().descBullets; track $index) {
              <li class="education-badge">{{ item }}</li>
            }
          </ul>
        }
      </div>
    </div>
  `,
})
export class EducationCard {
  readonly school = input.required<School>();
  protected readonly theme = inject(ThemeService);
}
