import { Component } from '@angular/core';
import { DisplayLottie } from '../../components/display-lottie/display-lottie';
import { illustration, techStack } from '../../core/portfolio';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-skill-progress',
  imports: [RevealDirective, DisplayLottie],
  template: `
    @if (techStack.viewSkillBars) {
      <div
        class="skills-container"
        appReveal="bottom"
        [revealDuration]="1000"
        revealDistance="20px"
      >
        <div class="skills-bar">
          <h1 class="skills-heading">Niveau</h1>
          @for (exp of techStack.experience; track exp.Stack) {
            <div class="skill">
              <p>{{ exp.Stack }}</p>
              <div class="meter">
                <span [style.width]="exp.progressPercentage"></span>
              </div>
            </div>
          }
        </div>

        <div class="skills-image">
          @if (illustration.animated) {
            <app-display-lottie path="assets/lottie/build.json" />
          } @else {
            <img alt="Illustration : compétences" src="assets/images/skill.svg" />
          }
        </div>
      </div>
    }
  `,
})
export class SkillProgress {
  protected readonly techStack = techStack;
  protected readonly illustration = illustration;
}
