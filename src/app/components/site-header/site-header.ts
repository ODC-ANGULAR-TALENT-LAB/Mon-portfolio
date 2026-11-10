import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { profile } from '../../core/content';
import { ThemeService } from '../../core/theme';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-site-header',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'menuOpen.set(false)' },
  template: `
    <header class="site-header">
      <span class="scroll-progress" aria-hidden="true"></span>
      <div class="shell site-header-inner">
        <a class="wordmark" href="#top" (click)="menuOpen.set(false)">{{ profile.displayName }}</a>

        <button
          type="button"
          class="menu-toggle"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="site-nav"
          (click)="menuOpen.update((v) => !v)"
        >
          {{ menuOpen() ? 'Fermer' : 'Menu' }}
        </button>

        <nav id="site-nav" class="site-nav" [class.is-open]="menuOpen()" aria-label="Sections">
          @for (item of nav; track item.href) {
            <a [href]="item.href" (click)="menuOpen.set(false)">{{ item.label }}</a>
          }
          <a class="site-nav-cv" [href]="profile.resume" download>
            <app-icon name="download" /> CV
          </a>
        </nav>

        <button
          type="button"
          class="theme-toggle"
          (click)="theme.toggle()"
          [attr.aria-label]="theme.theme() === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'"
        >
          <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" />
        </button>
      </div>
    </header>
  `,
})
export class SiteHeader {
  protected readonly theme = inject(ThemeService);
  protected readonly profile = profile;
  protected readonly menuOpen = signal(false);
  protected readonly nav = [
    { href: '#projets', label: 'Projets' },
    { href: '#parcours', label: 'Parcours' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#contact', label: 'Contact' },
  ];
}
