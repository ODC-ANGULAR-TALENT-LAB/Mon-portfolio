import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { twitterDetails } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';
import { Loading } from '../loading/loading';

declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTimeline: (
          source: { sourceType: string; screenName: string },
          target: HTMLElement,
          options?: Record<string, unknown>,
        ) => Promise<HTMLElement | undefined>;
      };
    };
  }
}

const WIDGETS_SRC = 'https://platform.twitter.com/widgets.js';

/**
 * Remplacant de react-twitter-embed : le script officiel des widgets est
 * charge une seule fois, puis la timeline est reconstruite a chaque
 * changement de theme (comme la prop `key` de la version React).
 */
@Component({
  selector: 'app-twitter-embed',
  imports: [Loading],
  template: `
    @if (display) {
      <div class="tw-main-div" id="twitter">
        <div class="centerContent">
          <div #timeline></div>
          @if (!loaded()) {
            <app-loading />
          }
        </div>
      </div>
    }
  `,
})
export class TwitterEmbed implements AfterViewInit, OnDestroy {
  protected readonly display = twitterDetails.display && !!twitterDetails.userName;
  protected readonly loaded = signal(false);

  private readonly theme = inject(ThemeService);
  private readonly timeline = viewChild<ElementRef<HTMLElement>>('timeline');
  private ready = false;
  private timeoutId?: ReturnType<typeof setTimeout>;

  constructor() {
    if (twitterDetails.display && !twitterDetails.userName) {
      console.error('Twitter username for twitter section is missing');
    }
    effect(() => {
      const isDark = this.theme.isDark();
      if (this.ready) {
        this.renderTimeline(isDark);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.display) {
      return;
    }
    loadWidgetsScript()
      .then(() => {
        this.ready = true;
        this.renderTimeline(this.theme.isDark());
      })
      .catch(() => {
        this.showFallback();
      });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  private renderTimeline(isDark: boolean): void {
    const host = this.timeline()?.nativeElement;
    if (!host || !window.twttr) {
      return;
    }
    host.innerHTML = '';
    window.twttr.widgets
      .createTimeline({ sourceType: 'profile', screenName: twitterDetails.userName }, host, {
        height: 400,
        theme: isDark ? 'dark' : 'light',
        borderColor: '#fff',
        chrome: 'nofooter',
      })
      .then(() => {
        this.loaded.set(true);
      })
      .catch(() => this.showFallback());

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      if (!host.innerHTML.includes('iframe')) {
        this.showFallback();
      }
    }, 10000);
  }

  private showFallback(): void {
    const host = this.timeline()?.nativeElement;
    this.loaded.set(true);
    if (host) {
      host.innerHTML =
        "<div class='centerContent'><h2>Can't load? Check privacy protection settings</h2></div>";
    }
  }
}

let scriptPromise: Promise<void> | undefined;

function loadWidgetsScript(): Promise<void> {
  if (window.twttr) {
    return Promise.resolve();
  }
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = WIDGETS_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('twitter widgets.js failed to load'));
    document.head.appendChild(script);
  });
  return scriptPromise;
}
