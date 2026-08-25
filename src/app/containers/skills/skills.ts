import { Component, inject } from '@angular/core';
import { DisplayLottie } from '../../components/display-lottie/display-lottie';
import { SoftwareSkill } from '../../components/software-skill/software-skill';
import { illustration, skillsSection } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';
import { RevealDirective } from '../../shared/reveal.directive';
import { Emoji } from '../../shared/emoji';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective, DisplayLottie, SoftwareSkill, Emoji],
  templateUrl: './skills.html',
})
export class Skills {
  protected readonly theme = inject(ThemeService);
  protected readonly skillsSection = skillsSection;
  protected readonly illustration = illustration;
}
