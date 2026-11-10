import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteFooter } from './components/site-footer/site-footer';
import { SiteHeader } from './components/site-header/site-header';
import { ThemeService } from './core/theme';
import { CaseStudies } from './sections/case-studies/case-studies';
import { Contact } from './sections/contact/contact';
import { Credentials } from './sections/credentials/credentials';
import { Expertise } from './sections/expertise/expertise';
import { Hero } from './sections/hero/hero';
import { Journey } from './sections/journey/journey';
import { TechMarquee } from './sections/tech-marquee/tech-marquee';

@Component({
  selector: 'app-root',
  imports: [SiteHeader, Hero, TechMarquee, CaseStudies, Journey, Expertise, Credentials, Contact, SiteFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main">Aller au contenu</a>
    <app-site-header />
    <main id="main" tabindex="-1">
      <app-hero />
      <app-tech-marquee />
      <app-case-studies />
      <app-journey />
      <app-expertise />
      <app-credentials />
      <app-contact />
    </main>
    <app-site-footer />
  `,
})
export class App {
  // Instancie le service des le demarrage : il applique le theme sur <html>.
  protected readonly theme = inject(ThemeService);
}
