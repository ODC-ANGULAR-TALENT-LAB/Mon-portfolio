import { Component, inject } from '@angular/core';
import { ContactForm } from '../../components/contact-form/contact-form';
import { SocialMedia } from '../../components/social-media/social-media';
import { contactInfo, socialMediaLinks } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';
import { Emoji } from '../../shared/emoji';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective, SocialMedia, Emoji, ContactForm],
  templateUrl: './contact.html',
})
export class Contact {
  protected readonly theme = inject(ThemeService);
  protected readonly contactInfo = contactInfo;
  protected readonly linkedin = socialMediaLinks['linkedin'] as string | undefined;

  /** Affiche « linkedin.com/in/... » plutot que l'URL complete. */
  protected readonly linkedinLabel = (socialMediaLinks['linkedin'] as string | undefined)
    ?.replace(/^https?:\/\/(www\.)?/, '')
    .replace(/\/$/, '');
}
