import { Component, inject, input } from '@angular/core';
import { ThemeService } from '../../core/theme';
import { openUrlInNewTab } from '../../core/utils';

export interface AchievementCardInfo {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  footer: { name: string; url: string }[];
}

@Component({
  selector: 'app-achievement-card',
  template: `
    <div [class]="theme.isDark() ? 'dark-mode certificate-card' : 'certificate-card'">
      <div class="certificate-image-div">
        <img
          [src]="cardInfo().image"
          [alt]="cardInfo().imageAlt || 'Card Thumbnail'"
          class="card-image"
        />
      </div>
      <div class="certificate-detail-div">
        <h5 [class]="theme.isDark() ? 'dark-mode card-title' : 'card-title'">
          {{ cardInfo().title }}
        </h5>
        <p [class]="theme.isDark() ? 'dark-mode card-subtitle' : 'card-subtitle'">
          {{ cardInfo().description }}
        </p>
      </div>
      <div class="certificate-card-footer">
        @for (link of cardInfo().footer; track $index) {
          <span
            [class]="theme.isDark() ? 'dark-mode certificate-tag' : 'certificate-tag'"
            (click)="open(link.url, link.name)"
            >{{ link.name }}</span
          >
        }
      </div>
    </div>
  `,
})
export class AchievementCard {
  readonly cardInfo = input.required<AchievementCardInfo>();
  protected readonly theme = inject(ThemeService);
  protected readonly open = openUrlInNewTab;
}
