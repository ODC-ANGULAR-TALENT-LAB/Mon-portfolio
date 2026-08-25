import { Component, HostListener, computed, input, signal } from '@angular/core';

export interface ProjectShot {
  src: string;
  alt: string;
}

/**
 * Galerie de captures pour une carte projet : une image principale, une bande
 * de vignettes quand il y en a plusieurs, et un agrandissement au clic.
 * Sans capture, le composant ne rend rien (la carte reste valide).
 */
@Component({
  selector: 'app-project-gallery',
  templateUrl: './project-gallery.html',
  styleUrl: './project-gallery.scss',
})
export class ProjectGallery {
  readonly shots = input<ProjectShot[]>([]);
  readonly projectName = input('');

  protected readonly current = signal(0);
  protected readonly zoomed = signal(false);

  protected readonly active = computed(() => this.shots()[this.current()] ?? null);
  protected readonly hasThumbs = computed(() => this.shots().length > 1);

  protected select(index: number): void {
    this.current.set(index);
  }

  protected open(): void {
    if (this.active()) {
      this.zoomed.set(true);
    }
  }

  protected close(): void {
    this.zoomed.set(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.close();
  }
}
