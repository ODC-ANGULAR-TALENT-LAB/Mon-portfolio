import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <div [class]="className()">
      <a
        class="main-button"
        [attr.href]="href() ?? null"
        [attr.target]="newTab() ? '_blank' : null"
      >
        {{ text() }}
      </a>
    </div>
  `,
})
export class ButtonComponent {
  readonly text = input('');
  readonly className = input('');
  readonly href = input<string | undefined>(undefined);
  readonly newTab = input(false);
}
