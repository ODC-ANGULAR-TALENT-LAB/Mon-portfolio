import { Component } from '@angular/core';
import { skillsSection } from '../../core/portfolio';

@Component({
  selector: 'app-software-skill',
  template: `
    <div>
      <div class="software-skills-main-div">
        <ul class="dev-icons">
          @for (skill of softwareSkills; track skill.skillName; let i = $index) {
            <li
              class="software-skill-inline"
              [attr.name]="skill.skillName"
              [style.--skill-color]="skill.color || null"
              [style.--skill-index]="i"
            >
              <i [class]="skill.fontAwesomeClassname"></i>
              <p>{{ skill.skillName }}</p>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class SoftwareSkill {
  readonly softwareSkills = skillsSection.softwareSkills;
}
