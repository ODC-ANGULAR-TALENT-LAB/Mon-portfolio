import { AfterViewInit, Component, ElementRef, OnDestroy, input, viewChild } from '@angular/core';
import lottie, { AnimationItem } from 'lottie-web';

/**
 * Equivalent de DisplayLottie (lottie-react). lottie-web charge le JSON
 * directement depuis public/assets/lottie, ce qui evite d'embarquer les
 * animations dans le bundle.
 */
@Component({
  selector: 'app-display-lottie',
  template: '<div #container class="lottie-container"></div>',
  // Pas de style sur :host : il est neutralise globalement en display: contents
  // (voir styles/_angular-hosts.scss), pour que .lottie-container soit l'element
  // de mise en page, comme le <div> rendu par lottie-react cote React.
  styles: '.lottie-container { display: block; width: 100%; }',
})
export class DisplayLottie implements AfterViewInit, OnDestroy {
  readonly path = input.required<string>();

  private readonly container = viewChild.required<ElementRef<HTMLElement>>('container');
  private animation?: AnimationItem;

  ngAfterViewInit(): void {
    this.animation = lottie.loadAnimation({
      container: this.container().nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: this.path(),
    });
  }

  ngOnDestroy(): void {
    this.animation?.destroy();
  }
}
