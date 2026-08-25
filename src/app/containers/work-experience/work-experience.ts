import { Component } from '@angular/core';
import { ExperienceCard } from '../../components/experience-card/experience-card';
import { workExperiences } from '../../core/portfolio';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-work-experience',
  imports: [RevealDirective, ExperienceCard],
  template: `
    @if (workExperiences.display) {
      <div id="experience">
        <div
          class="experience-container"
          id="workExperience"
          appReveal="bottom"
          [revealDuration]="1000"
          revealDistance="20px"
        >
          <div>
            <h1 class="experience-heading">Expériences</h1>
            <div class="experience-cards-div">
              @for (card of workExperiences.experience; track $index) {
                <app-experience-card
                  [cardInfo]="{
                    company: card.company,
                    desc: card.desc,
                    date: card.date,
                    companylogo: card.companylogo,
                    role: card.role,
                    descBullets: card.descBullets,
                  }"
                />
              }
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class WorkExperience {
  protected readonly workExperiences = workExperiences;
}
