import { Component, computed, inject, signal } from '@angular/core';
import { BlogCard, BlogCardInfo } from '../../components/blog-card/blog-card';
import { GithubService } from '../../core/github';
import { blogSection } from '../../core/portfolio';
import { ThemeService } from '../../core/theme';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-blogs',
  imports: [RevealDirective, BlogCard],
  template: `
    @if (blogSection.display) {
      <div class="main" id="blogs" appReveal="bottom" [revealDuration]="1000" revealDistance="20px">
        <div class="blog-header">
          <h1 class="blog-header-text">{{ blogSection.title }}</h1>
          <p [class]="theme.isDark() ? 'dark-mode blog-subtitle' : 'subTitle blog-subtitle'">
            {{ blogSection.subtitle }}
          </p>
        </div>
        <div class="blog-main-div">
          <div class="blog-text-div">
            @for (blog of blogs(); track $index) {
              <app-blog-card [blog]="blog" />
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class Blogs {
  private readonly github = inject(GithubService);
  protected readonly theme = inject(ThemeService);
  protected readonly blogSection = blogSection;

  private readonly mediumBlogs = signal<BlogCardInfo[] | null>(null);

  /** Les billets Medium remplacent la liste statique quand ils sont disponibles. */
  protected readonly blogs = computed<BlogCardInfo[]>(
    () => this.mediumBlogs() ?? blogSection.blogs,
  );

  constructor() {
    if (blogSection.displayMediumBlogs === 'true') {
      this.github.getMediumBlogs().subscribe({
        next: (response) =>
          this.mediumBlogs.set(
            response.items.map((item) => ({
              url: item.link,
              title: item.title,
              description: extractTextContent(item.content),
            })),
          ),
        error: (error) => {
          console.error(
            `${error} (because of this error Blogs section could not be displayed. Blogs section has reverted to default)`,
          );
          this.mediumBlogs.set(null);
        },
      });
    }
  }
}

/** L'API Medium renvoie du HTML : on ne garde que le texte des paragraphes. */
function extractTextContent(html: string): string {
  if (typeof html !== 'string') {
    return '';
  }
  return html
    .split(/<\/p>/i)
    .map((part) => part.split(/<p[^>]*>/i).pop() ?? '')
    .filter((el) => el.trim().length > 0)
    .map((el) => el.replace(/<\/?[^>]+(>|$)/g, '').trim())
    .join(' ');
}
