import { Component, inject, input } from '@angular/core';
import { GithubRepoEdge } from '../../core/github';
import { ThemeService } from '../../core/theme';
import { formatFileSizeDisplay, openUrlInNewTab } from '../../core/utils';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-github-repo-card',
  imports: [RevealDirective],
  templateUrl: './github-repo-card.html',
})
export class GithubRepoCard {
  readonly repo = input.required<GithubRepoEdge>();
  protected readonly theme = inject(ThemeService);
  protected readonly open = openUrlInNewTab;
  protected readonly formatSize = formatFileSizeDisplay;
}
