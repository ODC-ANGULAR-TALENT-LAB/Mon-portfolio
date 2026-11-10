import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { caseStudies, profile, stats } from '../../core/content';
import { ProjectStatus } from '../../core/content.types';
import { ORBIT } from '../../core/tech';
import { Icon } from '../../components/icon/icon';
import { TechLogo } from '../../components/tech-logo/tech-logo';
import { TypeRotator } from '../../components/type-rotator/type-rotator';
import { CountUp, Reveal, Spotlight, Tilt } from '../../shared/motion';

const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'En ligne',
  source: 'Code public',
  private: 'Projet privé',
};

/**
 * Haut de page : identite et portrait entoure d'une orbite 3D de logos,
 * chiffres cles, puis l'index des produits livres. Survoler une ligne de
 * l'index affiche sa capture dans une fenetre de navigateur inclinable.
 */
@Component({
  selector: 'app-hero',
  imports: [Icon, TechLogo, TypeRotator, CountUp, Reveal, Spotlight, Tilt],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly profile = profile;
  protected readonly projects = caseStudies;
  protected readonly stats = stats;
  protected readonly orbit = ORBIT;
  protected readonly orbitStep = 360 / ORBIT.length;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly active = signal(0);
}
