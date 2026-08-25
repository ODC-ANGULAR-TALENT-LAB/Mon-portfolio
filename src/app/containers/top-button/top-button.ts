import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-top-button',
  template: `
    <button
      id="topButton"
      title="Remonter en haut"
      [style.visibility]="visible() ? 'visible' : 'hidden'"
      (click)="scrollToTop()"
    >
      <i class="fas fa-hand-point-up" aria-hidden="true"></i>
    </button>
  `,
})
export class TopButton implements OnInit, OnDestroy {
  protected readonly visible = signal(false);

  private readonly onScroll = () => this.visible.set(window.scrollY > 20);

  ngOnInit(): void {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  protected scrollToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
