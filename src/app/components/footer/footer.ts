import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme';
import { RevealDirective } from '../../shared/reveal.directive';
import { Emoji } from '../../shared/emoji';

@Component({
  selector: 'app-footer',
  imports: [RevealDirective, Emoji],
  template: `
    <div class="footer-div" appReveal="bottom" [revealDuration]="1000" revealDistance="5px">
      <p [class]="theme.isDark() ? 'dark-mode footer-text' : 'footer-text'">
        <app-emoji text="Conçu et développé avec ❤️ par BITEP Christian" />
      </p>
    </div>
  `,
})
export class Footer {
  protected readonly theme = inject(ThemeService);
}
