import { Component } from '@angular/core';
import { socialMediaLinks } from '../../core/portfolio';

interface SocialLink {
  href: string;
  cssClass: string;
  icon: string;
}

@Component({
  selector: 'app-social-media',
  template: `
    @if (display) {
      <div class="social-media-div">
        @for (link of links; track link.cssClass) {
          <a
            [href]="link.href"
            class="icon-button {{ link.cssClass }}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i [class]="link.icon"></i>
            <span></span>
          </a>
        }
      </div>
    }
  `,
})
export class SocialMedia {
  readonly display = socialMediaLinks.display;
  readonly links: SocialLink[] = buildLinks();
}

function buildLinks(): SocialLink[] {
  const l = socialMediaLinks as Record<string, string | boolean>;
  const definitions: { key: string; cssClass: string; icon: string; mailto?: boolean }[] = [
    { key: 'github', cssClass: 'github', icon: 'fab fa-github' },
    { key: 'linkedin', cssClass: 'linkedin', icon: 'fab fa-linkedin-in' },
    { key: 'gmail', cssClass: 'google', icon: 'fas fa-envelope', mailto: true },
    { key: 'gitlab', cssClass: 'gitlab', icon: 'fab fa-gitlab' },
    { key: 'facebook', cssClass: 'facebook', icon: 'fab fa-facebook-f' },
    { key: 'instagram', cssClass: 'instagram', icon: 'fab fa-instagram' },
    { key: 'twitter', cssClass: 'twitter', icon: 'fab fa-twitter' },
    { key: 'medium', cssClass: 'medium', icon: 'fab fa-medium' },
    { key: 'stackoverflow', cssClass: 'stack-overflow', icon: 'fab fa-stack-overflow' },
    { key: 'kaggle', cssClass: 'kaggle', icon: 'fab fa-kaggle' },
  ];

  return definitions
    .filter((def) => typeof l[def.key] === 'string' && l[def.key])
    .map((def) => ({
      href: def.mailto ? `mailto:${l[def.key]}` : (l[def.key] as string),
      cssClass: def.cssClass,
      icon: def.icon,
    }));
}
