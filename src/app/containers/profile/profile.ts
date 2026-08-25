import { Component, inject, signal } from '@angular/core';
import { GithubProfileCard } from '../../components/github-profile-card/github-profile-card';
import { GithubProfile, GithubService } from '../../core/github';
import { openSource } from '../../core/portfolio';
import { Contact } from '../contact/contact';

/**
 * Affiche la carte de profil GitHub si profile.json est disponible,
 * sinon retombe sur la section Contact statique — comme la version React.
 */
@Component({
  selector: 'app-profile',
  imports: [GithubProfileCard, Contact],
  template: `
    @if (profile(); as prof) {
      <app-github-profile-card [prof]="prof" />
    } @else {
      <app-contact />
    }
  `,
})
export class Profile {
  private readonly github = inject(GithubService);
  protected readonly profile = signal<GithubProfile | null>(null);

  constructor() {
    if (openSource.display && openSource.showGithubProfile === 'true') {
      this.github.getProfile().subscribe({
        next: (response) => this.profile.set(response.data.user),
        error: (error) => {
          console.error(
            `${error} (because of this error GitHub contact section could not be displayed. Contact section has reverted to default)`,
          );
          this.profile.set(null);
        },
      });
    }
  }
}
