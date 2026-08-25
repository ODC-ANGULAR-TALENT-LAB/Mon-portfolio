import { Component, inject, input } from '@angular/core';
import { ThemeService } from '../../core/theme';

export interface TalkDetails {
  title: string;
  subtitle: string;
  slides_url: string;
  event_url: string;
  image?: string;
}

@Component({
  selector: 'app-talk-card',
  template: `
    <div>
      <div class="container">
        <div [class]="theme.isDark() ? 'dark-rectangle rectangle' : 'rectangle'">
          <div class="diagonal-fill"></div>
          <div class="talk-card-title">{{ talkDetails().title }}</div>
          <p class="talk-card-subtitle">{{ talkDetails().subtitle }}</p>

          <div class="card-footer-button-div">
            <a [href]="talkDetails().slides_url" target="_" class="talk-button">Supports</a>
            <a [href]="talkDetails().event_url" target="_" class="talk-button">Événement</a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TalkCard {
  readonly talkDetails = input.required<TalkDetails>();
  protected readonly theme = inject(ThemeService);
}
