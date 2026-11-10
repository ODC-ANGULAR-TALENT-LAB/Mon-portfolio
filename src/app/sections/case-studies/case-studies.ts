import { ChangeDetectionStrategy, Component } from '@angular/core';
import { caseStudies, otherWork } from '../../core/content';
import { Gallery } from '../../components/gallery/gallery';
import { Icon } from '../../components/icon/icon';
import { TechLogo } from '../../components/tech-logo/tech-logo';
import { Reveal } from '../../shared/motion';

@Component({
  selector: 'app-case-studies',
  imports: [Gallery, Icon, TechLogo, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './case-studies.html',
})
export class CaseStudies {
  protected readonly projects = caseStudies;
  protected readonly otherWork = otherWork;
}
