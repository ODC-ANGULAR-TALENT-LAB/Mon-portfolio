import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme';
import { Emoji } from '../../shared/emoji';

@Component({
  selector: 'app-toggle-switch',
  imports: [Emoji],
  template: `
    <label class="switch">
      <input type="checkbox" [checked]="theme.isDark()" (change)="theme.changeTheme()" />
      <span class="slider round">
        <span class="emoji"><app-emoji [text]="theme.isDark() ? '🌜' : '☀️'" /></span>
      </span>
    </label>
  `,
})
export class ToggleSwitch {
  protected readonly theme = inject(ThemeService);
}
