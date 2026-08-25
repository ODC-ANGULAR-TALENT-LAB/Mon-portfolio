import { Component, inject } from '@angular/core';
import { AchievementCard } from '../../components/achievement-card/achievement-card';
import { achievementSection } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';
import { RevealDirective } from '../../shared/reveal.directive';
import { Emoji } from '../../shared/emoji';

@Component({
  selector: 'app-achievement',
  imports: [RevealDirective, AchievementCard, Emoji],
  template: `
    @if (achievementSection.display) {
      <div
        class="main"
        id="achievements"
        appReveal="bottom"
        [revealDuration]="1000"
        revealDistance="20px"
      >
        <div class="achievement-main-div">
          <div class="achievement-header">
            <h1
              [class]="
                theme.isDark()
                  ? 'dark-mode heading achievement-heading'
                  : 'heading achievement-heading'
              "
            >
              <app-emoji [text]="achievementSection.title" />
            </h1>
            <p
              [class]="
                theme.isDark()
                  ? 'dark-mode subTitle achievement-subtitle'
                  : 'subTitle achievement-subtitle'
              "
            >
              {{ achievementSection.subtitle }}
            </p>
          </div>
          <div class="achievement-cards-div">
            @for (card of achievementSection.achievementsCards; track card.title) {
              <app-achievement-card
                [cardInfo]="{
                  title: card.title,
                  description: card.subtitle,
                  image: card.image,
                  imageAlt: card.imageAlt,
                  footer: card.footerLink,
                }"
              />
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class Achievement {
  protected readonly theme = inject(ThemeService);
  protected readonly achievementSection = achievementSection;
}
