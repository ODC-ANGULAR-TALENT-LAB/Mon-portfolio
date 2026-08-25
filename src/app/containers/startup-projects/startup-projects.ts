import { Component, inject } from '@angular/core';
import { bigProjects } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';
import { openUrlInNewTab } from '../../core/utils';
import { RevealDirective } from '../../shared/reveal.directive';
import { ProjectGallery } from '../../components/project-gallery/project-gallery';

@Component({
  selector: 'app-startup-projects',
  imports: [RevealDirective, ProjectGallery],
  templateUrl: './startup-projects.html',
})
export class StartupProjects {
  protected readonly theme = inject(ThemeService);
  protected readonly bigProjects = bigProjects;
  protected readonly open = openUrlInNewTab;
}
