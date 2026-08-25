import { Component, OnDestroy, inject, signal } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { splashScreen } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';
import { Achievement } from '../achievement/achievement';
import { Blogs } from '../blogs/blogs';
import { Education } from '../education/education';
import { Greeting } from '../greeting/greeting';
import { Podcast } from '../podcast/podcast';
import { Profile } from '../profile/profile';
import { Projects } from '../projects/projects';
import { SkillProgress } from '../skill-progress/skill-progress';
import { Skills } from '../skills/skills';
import { SplashScreen } from '../splash-screen/splash-screen';
import { StartupProjects } from '../startup-projects/startup-projects';
import { Talks } from '../talks/talks';
import { TopButton } from '../top-button/top-button';
import { TwitterEmbed } from '../twitter-embed/twitter-embed';
import { WorkExperience } from '../work-experience/work-experience';

@Component({
  selector: 'app-main',
  imports: [
    SplashScreen,
    Header,
    Greeting,
    Skills,
    SkillProgress,
    Education,
    WorkExperience,
    Projects,
    StartupProjects,
    Achievement,
    Blogs,
    Talks,
    TwitterEmbed,
    Podcast,
    Profile,
    Footer,
    TopButton,
  ],
  templateUrl: './main.html',
})
export class Main implements OnDestroy {
  protected readonly theme = inject(ThemeService);
  protected readonly showSplash = signal(splashScreen.enabled);

  private splashTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    if (splashScreen.enabled) {
      this.splashTimer = setTimeout(() => this.showSplash.set(false), splashScreen.duration);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.splashTimer);
  }
}
