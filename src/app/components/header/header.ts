import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme';
import { HeadroomDirective } from '../../shared/headroom.directive';
import { ToggleSwitch } from '../toggle-switch/toggle-switch';
import {
  achievementSection,
  blogSection,
  greeting,
  openSource,
  resumeSection,
  skillsSection,
  talkSection,
  workExperiences,
} from '../../core/portfolio';

@Component({
  selector: 'app-header',
  imports: [HeadroomDirective, ToggleSwitch],
  templateUrl: './header.html',
})
export class Header {
  protected readonly theme = inject(ThemeService);
  protected readonly greeting = greeting;
  protected readonly viewExperience = workExperiences.display;
  protected readonly viewOpenSource = openSource.display;
  protected readonly viewSkills = skillsSection.display;
  protected readonly viewAchievement = achievementSection.display;
  protected readonly viewBlog = blogSection.display;
  protected readonly viewTalks = talkSection.display;
  protected readonly viewResume = resumeSection.display;

  /**
   * Referme le panneau mobile apres un clic sur un lien. Le menu repose sur
   * une case a cocher (`.menu-btn`) : sans cela, il resterait deploye
   * par-dessus la section vers laquelle l'ancre vient de faire defiler.
   */
  protected closeMenu(menuBtn: HTMLInputElement): void {
    menuBtn.checked = false;
  }
}
