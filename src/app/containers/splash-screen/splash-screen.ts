import { Component, inject } from '@angular/core';
import { DisplayLottie } from '../../components/display-lottie/display-lottie';
import { greeting, splashScreen } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';

@Component({
  selector: 'app-splash-screen',
  imports: [DisplayLottie],
  template: `
    <div [class]="theme.isDark() ? 'dark-mode splash-container' : 'splash-container'">
      <div class="splash-animation-container">
        <app-display-lottie [path]="splashScreen.animationPath" />
      </div>
      <div class="splash-title-container">
        <span class="grey-color"> &lt;</span>
        <span class="splash-title">{{ greeting.username }}</span>
        <span class="grey-color">/&gt;</span>
      </div>
    </div>
  `,
})
export class SplashScreen {
  protected readonly theme = inject(ThemeService);
  protected readonly greeting = greeting;
  protected readonly splashScreen = splashScreen;
}
