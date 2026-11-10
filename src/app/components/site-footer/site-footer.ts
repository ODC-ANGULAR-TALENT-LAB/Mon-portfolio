import { ChangeDetectionStrategy, Component } from '@angular/core';
import { profile } from '../../core/content';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="site-footer">
      <div class="shell site-footer-inner">
        <p>{{ profile.legalName }}, {{ profile.location }}</p>
        <p>
          Site écrit en Angular 22.
          <a href="https://github.com/ODC-ANGULAR-TALENT-LAB/Mon-portfolio" target="_blank" rel="noopener">Lire le code source</a>
        </p>
      </div>
    </footer>
  `,
})
export class SiteFooter {
  protected readonly profile = profile;
}
