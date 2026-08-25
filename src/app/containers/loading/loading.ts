import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="centerContent">
      <div class="sk-circle">
        @for (i of circles; track i) {
          <div class="sk-circle{{ i }} sk-child"></div>
        }
      </div>
    </div>
  `,
})
export class Loading {
  protected readonly circles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}
