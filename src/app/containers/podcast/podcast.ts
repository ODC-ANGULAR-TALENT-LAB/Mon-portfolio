import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { podcastSection } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';
import { RevealDirective } from '../../shared/reveal.directive';
import { Emoji } from '../../shared/emoji';

@Component({
  selector: 'app-podcast',
  imports: [RevealDirective, Emoji],
  template: `
    @if (podcastSection.display) {
      <div class="main" appReveal="bottom" [revealDuration]="1000" revealDistance="20px">
        <div class="podcast-header">
          <h1 class="podcast-header-title"><app-emoji [text]="podcastSection.title" /></h1>
          <p
            [class]="
              theme.isDark()
                ? 'dark-mode podcast-header-subtitle'
                : 'subTitle podcast-header-subtitle'
            "
          >
            {{ podcastSection.subtitle }}
          </p>
        </div>
        <div class="podcast-main-div">
          @for (url of podcastUrls; track $index) {
            <div>
              <iframe
                class="podcast"
                [src]="url"
                frameBorder="0"
                scrolling="no"
                title="Podcast"
              ></iframe>
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class Podcast {
  protected readonly theme = inject(ThemeService);
  protected readonly podcastSection = podcastSection;

  private readonly sanitizer = inject(DomSanitizer);

  /** Les URL viennent de portfolio.ts (donnees de l'auteur), pas d'une saisie externe. */
  protected readonly podcastUrls: SafeResourceUrl[] = podcastSection.podcast.map((url) =>
    this.sanitizer.bypassSecurityTrustResourceUrl(url),
  );
}
