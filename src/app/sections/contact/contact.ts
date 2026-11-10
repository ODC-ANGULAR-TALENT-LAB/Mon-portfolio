import { ChangeDetectionStrategy, Component } from '@angular/core';
import { profile } from '../../core/content';
import { ContactForm } from '../../components/contact-form/contact-form';
import { Icon } from '../../components/icon/icon';
import { Reveal } from '../../shared/motion';

@Component({
  selector: 'app-contact',
  imports: [ContactForm, Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section contact shell" id="contact" aria-labelledby="contact-title">
      <div class="contact-intro" appReveal>
        <p class="section-kicker"><app-icon name="mail" /> Contact</p>
        <h2 class="section-title" id="contact-title">Travaillons ensemble</h2>
        <p class="section-lede">
          Un poste, un stage ou un produit à construire : écrivez-moi directement ou laissez un message ici.
        </p>
        <a class="contact-email" [href]="'mailto:' + p.email">{{ p.email }}</a>

        <ul class="contact-channels">
          <li>
            <a [href]="'tel:' + p.phone.replaceAll(' ', '')"><app-icon name="phone" /> {{ p.phone }}</a>
          </li>
          <li>
            <a [href]="p.linkedin" target="_blank" rel="noopener"><app-icon name="linkedin" /> LinkedIn</a>
          </li>
          <li>
            <a [href]="p.github" target="_blank" rel="noopener"><app-icon name="github" /> GitHub</a>
          </li>
          <li>
            <a [href]="p.resume" download><app-icon name="download" /> CV en PDF</a>
          </li>
        </ul>
      </div>

      <app-contact-form appReveal />
    </section>
  `,
})
export class Contact {
  protected readonly p = profile;
}
