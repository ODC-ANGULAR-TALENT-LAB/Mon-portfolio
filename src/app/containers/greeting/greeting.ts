import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button';
import { DisplayLottie } from '../../components/display-lottie/display-lottie';
import { SocialMedia } from '../../components/social-media/social-media';
import { greeting, illustration } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';
import { RevealDirective } from '../../shared/reveal.directive';
import { Emoji } from '../../shared/emoji';

@Component({
  selector: 'app-greeting',
  imports: [RevealDirective, DisplayLottie, SocialMedia, ButtonComponent, Emoji],
  templateUrl: './greeting.html',
})
export class Greeting {
  protected readonly theme = inject(ThemeService);
  protected readonly greeting = greeting;
  protected readonly illustration = illustration;
}
