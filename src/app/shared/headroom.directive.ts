import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2, inject } from '@angular/core';

type HeadroomState = 'unfixed' | 'pinned' | 'unpinned';
type HeadroomAction = 'none' | 'pin' | 'unpin' | 'unpin-snap' | 'unfix';

// Valeurs par defaut de react-headroom.
const UP_TOLERANCE = 5;
const DOWN_TOLERANCE = 0;
const PIN_START = 0;

/**
 * Portage de react-headroom. Applique a l'element interne ; l'element parent
 * doit porter la classe .headroom-wrapper, dont la hauteur est fixee a celle
 * de l'en-tete pour que le flux ne bouge pas quand l'en-tete passe en fixed.
 *
 * La machine a etats reprend shouldUpdate() de la librairie d'origine :
 * unfixed (en haut, position relative) / pinned / unpinned.
 */
@Directive({ selector: '[appHeadroom]' })
export class HeadroomDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);

  private state: HeadroomState = 'unfixed';
  private translateY: 0 | '-100%' = 0;
  private animation = false;
  private height = 0;
  private lastKnownScrollY = 0;
  private scrollTicking = false;
  private resizeTicking = false;

  private readonly onScroll = () => {
    if (!this.scrollTicking) {
      this.scrollTicking = true;
      requestAnimationFrame(() => this.update());
    }
  };
  private readonly onResize = () => {
    if (!this.resizeTicking) {
      this.resizeTicking = true;
      requestAnimationFrame(() => this.setHeightOffset());
    }
  };

  ngAfterViewInit(): void {
    this.setHeightOffset();
    this.render();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  private setHeightOffset(): void {
    this.height = this.host.nativeElement.offsetHeight;
    const wrapper = this.host.nativeElement.parentElement;
    if (wrapper) {
      this.renderer.setStyle(wrapper, 'height', this.height ? `${this.height}px` : null);
    }
    this.resizeTicking = false;
  }

  private update(): void {
    const currentScrollY = window.pageYOffset;

    if (!this.isOutOfBound(currentScrollY)) {
      switch (this.shouldUpdate(this.lastKnownScrollY, currentScrollY)) {
        case 'pin':
          this.setState('pinned', 0, true, 'headroom headroom--pinned');
          break;
        case 'unpin':
          this.setState('unpinned', '-100%', true, 'headroom headroom--unpinned');
          break;
        case 'unpin-snap':
          this.setState(
            'unpinned',
            '-100%',
            false,
            'headroom headroom--unpinned headroom-disable-animation',
          );
          break;
        case 'unfix':
          this.setState(
            'unfixed',
            0,
            false,
            'headroom headroom--unfixed headroom-disable-animation',
          );
          break;
      }
    }

    this.lastKnownScrollY = currentScrollY;
    this.scrollTicking = false;
  }

  private setState(
    state: HeadroomState,
    translateY: 0 | '-100%',
    animation: boolean,
    className: string,
  ): void {
    this.state = state;
    this.translateY = translateY;
    this.animation = animation;
    this.render(className);
  }

  private render(className = 'headroom headroom--unfixed headroom-disable-animation'): void {
    const el = this.host.nativeElement;
    const set = (prop: string, value: string | null) =>
      value === null
        ? this.renderer.removeStyle(el, prop)
        : this.renderer.setStyle(el, prop, value);

    set('position', this.state === 'unfixed' ? 'relative' : 'fixed');
    set('top', '0');
    set('left', '0');
    set('right', '0');
    set('z-index', '1');
    set('transform', `translate3D(0, ${this.translateY}, 0)`);
    set('transition', this.animation ? 'all .2s ease-in-out' : null);

    this.renderer.setAttribute(
      el,
      'class',
      this.animation ? `${className} headroom--scrolled` : className,
    );
  }

  /** Transcription de react-headroom/src/shouldUpdate.js */
  private shouldUpdate(lastKnownScrollY: number, currentScrollY: number): HeadroomAction {
    const scrollDirection = currentScrollY >= lastKnownScrollY ? 'down' : 'up';
    const distanceScrolled = Math.abs(currentScrollY - lastKnownScrollY);

    if (currentScrollY <= PIN_START && this.state !== 'unfixed') {
      return 'unfix';
    }
    if (currentScrollY <= this.height && scrollDirection === 'down' && this.state === 'unfixed') {
      return 'none';
    }
    if (
      currentScrollY > this.height + PIN_START &&
      scrollDirection === 'down' &&
      this.state === 'unfixed'
    ) {
      return 'unpin-snap';
    }
    if (
      scrollDirection === 'down' &&
      (this.state === 'pinned' || this.state === 'unfixed') &&
      currentScrollY > this.height + PIN_START &&
      distanceScrolled > DOWN_TOLERANCE
    ) {
      return 'unpin';
    }
    if (
      scrollDirection === 'up' &&
      distanceScrolled > UP_TOLERANCE &&
      this.state !== 'pinned' &&
      this.state !== 'unfixed'
    ) {
      return 'pin';
    }
    if (
      scrollDirection === 'up' &&
      currentScrollY <= this.height &&
      this.state !== 'pinned' &&
      this.state !== 'unfixed'
    ) {
      return 'pin';
    }
    return 'none';
  }

  private isOutOfBound(currentScrollY: number): boolean {
    const pastTop = currentScrollY < 0;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight,
    );
    const pastBottom = currentScrollY + viewportHeight > documentHeight;
    return pastTop || pastBottom;
  }
}
