import { ChangeDetectionStrategy, Component } from '@angular/core';
import { caseStudies, expertise } from '../../core/content';
import { Icon } from '../../components/icon/icon';
import { TechLogo } from '../../components/tech-logo/tech-logo';
import { Reveal, Spotlight, Tilt } from '../../shared/motion';

interface Proof {
  label: string;
  href?: string;
}

/**
 * Expertise par domaine. Chaque domaine renvoie aux etudes de cas qui le
 * prouvent : une competence sans realisation associee n'est qu'un mot-cle.
 */
@Component({
  selector: 'app-expertise',
  imports: [Icon, TechLogo, Reveal, Spotlight, Tilt],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './expertise.html',
})
export class Expertise {
  protected readonly areas = expertise.map((area) => ({
    ...area,
    proofs: area.provenIn.map(toProof),
  }));
}

function toProof(ref: string): Proof {
  const project = caseStudies.find((p) => p.id === ref);
  return project ? { label: project.name, href: `#case-${project.id}` } : { label: ref };
}
