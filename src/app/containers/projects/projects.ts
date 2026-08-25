import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../components/button/button';
import { GithubRepoCard } from '../../components/github-repo-card/github-repo-card';
import { GithubRepoEdge, GithubService } from '../../core/github';
import { openSource, socialMediaLinks } from '../../core/portfolio';

@Component({
  selector: 'app-projects',
  imports: [GithubRepoCard, ButtonComponent],
  template: `
    @if (openSource.display && !failed()) {
      <div class="main" id="opensource">
        <h1 class="project-title">Projets open source</h1>
        <div class="repo-cards-div-main">
          @for (repo of repos(); track repo.node.id) {
            <app-github-repo-card [repo]="repo" />
          }
        </div>
        <app-button
          text="Plus de projets"
          className="project-button"
          [href]="githubUrl"
          [newTab]="true"
        />
      </div>
    }
  `,
})
export class Projects {
  private readonly github = inject(GithubService);
  protected readonly openSource = openSource;
  protected readonly githubUrl = socialMediaLinks['github'] as string;
  protected readonly repos = signal<GithubRepoEdge[]>([]);
  protected readonly failed = signal(false);

  constructor() {
    // Inutile d'interroger profile.json si la section n'est pas affichee.
    if (!openSource.display) {
      return;
    }
    this.github.getProfile().subscribe({
      next: (response) => this.repos.set(response.data.user.pinnedItems.edges),
      error: (error) => {
        console.error(
          `${error} (because of this error, nothing is shown in place of Projects section. Also check if Projects section has been configured)`,
        );
        this.failed.set(true);
      },
    });
  }
}
