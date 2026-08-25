import { Component, inject, input } from '@angular/core';
import { ThemeService } from '../../core/theme';
import { openUrlInNewTab } from '../../core/utils';

export interface BlogCardInfo {
  url: string;
  title: string;
  description: string;
  image?: string;
}

@Component({
  selector: 'app-blog-card',
  template: `
    <div (click)="open(blog().url, blog().title)">
      <div [class]="theme.isDark() ? 'blog-container dark-mode' : 'blog-container'">
        <a
          [class]="theme.isDark() ? 'dark-mode blog-card blog-card-shadow' : 'blog-card'"
          href="#blog"
        >
          <h3 [class]="theme.isDark() ? 'small-dark blog-title' : 'blog-title'">
            {{ blog().title }}
          </h3>
          <p [class]="theme.isDark() ? 'small-dark small' : 'small'">
            {{ blog().description }}
          </p>
          <div class="go-corner">
            <div class="go-arrow">→</div>
          </div>
        </a>
      </div>
    </div>
  `,
})
export class BlogCard {
  readonly blog = input.required<BlogCardInfo>();
  protected readonly theme = inject(ThemeService);
  protected readonly open = openUrlInNewTab;
}
