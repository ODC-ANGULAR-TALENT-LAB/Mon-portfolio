import { Component } from '@angular/core';
import { EducationCard } from '../../components/education-card/education-card';
import { educationInfo } from '../../core/portfolio';

@Component({
  selector: 'app-education',
  imports: [EducationCard],
  template: `
    @if (educationInfo.display) {
      <div class="education-section" id="education">
        <h1 class="education-heading">Formation</h1>
        <div class="education-card-container">
          @for (school of educationInfo.schools; track school.schoolName) {
            <app-education-card [school]="school" />
          }
        </div>
      </div>
    }
  `,
})
export class Education {
  protected readonly educationInfo = educationInfo;
}
