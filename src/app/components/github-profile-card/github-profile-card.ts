import { Component, computed, input } from '@angular/core';
import { GithubProfile } from '../../core/github';
import { contactInfo, isHireable } from '../../core/portfolio';
import { RevealDirective } from '../../shared/reveal.directive';
import { SocialMedia } from '../social-media/social-media';
import { Emoji } from '../../shared/emoji';

@Component({
  selector: 'app-github-profile-card',
  imports: [RevealDirective, SocialMedia, Emoji],
  templateUrl: './github-profile-card.html',
})
export class GithubProfileCard {
  readonly prof = input.required<GithubProfile>();
  protected readonly contactInfo = contactInfo;
  protected readonly String = String;
  protected readonly hireable = computed(() => (isHireable ? 'Yes' : 'No'));
}
