import { Component, inject, input, signal } from '@angular/core';
import ColorThief from 'colorthief/dist/color-thief.mjs';
import { ThemeService } from '../../core/theme';

export interface ExperienceCardInfo {
  company: string;
  companylogo?: string;
  role: string;
  date: string;
  desc: string;
  descBullets?: string[];
}

@Component({
  selector: 'app-experience-card',
  template: `
    <div [class]="theme.isDark() ? 'experience-card-dark' : 'experience-card'">
      <div [style.background]="bannerColor()" class="experience-banner">
        <div class="experience-blurred_div"></div>
        <div class="experience-div-company">
          <h5 class="experience-text-company">{{ cardInfo().company }}</h5>
        </div>

        @if (cardInfo().companylogo; as logo) {
          <img
            crossorigin="anonymous"
            class="experience-roundedimg"
            [src]="logo"
            [alt]="cardInfo().company"
            (load)="extractColor($event)"
          />
        }
      </div>
      <div class="experience-text-details">
        <h5
          [class]="theme.isDark() ? 'experience-text-role dark-mode-text' : 'experience-text-role'"
        >
          {{ cardInfo().role }}
        </h5>
        <h5
          [class]="theme.isDark() ? 'experience-text-date dark-mode-text' : 'experience-text-date'"
        >
          {{ cardInfo().date }}
        </h5>
        <p
          [class]="
            theme.isDark()
              ? 'subTitle experience-text-desc dark-mode-text'
              : 'subTitle experience-text-desc'
          "
        >
          {{ cardInfo().desc }}
        </p>
        <ul>
          @for (item of cardInfo().descBullets; track $index) {
            <li [class]="theme.isDark() ? 'subTitle dark-mode-text' : 'subTitle'">
              {{ item }}
            </li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class ExperienceCard {
  readonly cardInfo = input.required<ExperienceCardInfo>();
  protected readonly theme = inject(ThemeService);

  /** Couleur dominante du logo, extraite une fois l'image chargee (colorthief 2.x, comme React). */
  protected readonly bannerColor = signal<string | null>(null);

  protected extractColor(event: Event): void {
    const img = event.target as HTMLImageElement;
    // colorthief echantillonne un canvas dimensionne d'apres img.width/height,
    // c'est-a-dire la taille de RENDU. On attend donc la fin de la mise en page,
    // sinon la couleur extraite differe legerement de celle de la version React.
    requestAnimationFrame(() => {
      try {
        const values = new ColorThief().getColor(img);
        this.bannerColor.set(values ? 'rgb(' + values.join(', ') + ')' : null);
      } catch {
        // image cross-origin non exploitable : on garde le fond par defaut
      }
    });
  }
}
