import { Component, inject } from '@angular/core';
import { TalkCard } from '../../components/talk-card/talk-card';
import { talkSection } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';
import { RevealDirective } from '../../shared/reveal.directive';
import { Emoji } from '../../shared/emoji';

@Component({
  selector: 'app-talks',
  imports: [RevealDirective, TalkCard, Emoji],
  template: `
    @if (talkSection.display) {
      <div class="main" id="talks" appReveal="bottom" [revealDuration]="1000" revealDistance="20px">
        <div class="talk-header">
          <h1 class="talk-header-title">{{ talkSection.title }}</h1>
          <p
            [class]="
              theme.isDark() ? 'dark-mode talk-header-subtitle' : 'subTitle talk-header-subtitle'
            "
          >
            <app-emoji [text]="talkSection.subtitle" />
          </p>
          @for (talk of talkSection.talks; track talk.title) {
            <app-talk-card [talkDetails]="talk" />
          }
        </div>
      </div>
    }
  `,
})
export class Talks {
  protected readonly theme = inject(ThemeService);
  protected readonly talkSection = talkSection;
}
