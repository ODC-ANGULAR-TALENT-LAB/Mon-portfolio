import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2,
  inject,
  input,
} from '@angular/core';

export type RevealDirection = 'bottom' | 'top' | 'left' | 'right';
export type RevealEffect = 'fade' | 'slide';

// Valeurs par defaut de react-reveal (lib/globals.js et RevealBase.js).
const DEFAULT_DURATION = 1000;
const DEFAULT_DISTANCE = '100%';
const FRACTION = 0.2;

const NAMESPACE = `reveal-${Math.floor(1e15 * Math.random())}-`;
let sheet: CSSStyleSheet | null | undefined;
let counter = 1;
const keyframeNames = new Map<string, string>();

/**
 * Cree (une seule fois) la regle @keyframes correspondante et renvoie son nom.
 * Transcrit lib/globals.js -> animation() de react-reveal.
 */
function keyframes(body: string): string {
  const existing = keyframeNames.get(body);
  if (existing) {
    return existing;
  }
  if (sheet === undefined) {
    const style = document.createElement('style');
    document.head.appendChild(style);
    sheet = style.sheet;
  }
  const name = NAMESPACE + counter++;
  try {
    sheet?.insertRule(`@keyframes ${name}{${body}}`, sheet.cssRules.length);
  } catch {
    return '';
  }
  keyframeNames.set(body, name);
  return name;
}

/**
 * Portage de react-reveal (<Fade> / <Slide>), d'apres src/in-and-out/Fade.js :
 *  - distance par defaut '100%' (relative a la taille de l'element) ;
 *  - left -> translate3d(-d, 0, 0), right -> translate3d(d, 0, 0),
 *    top  -> translate3d(0, -d, 0), bottom -> translate3d(0, d, 0) ;
 *  - Fade anime opacite + transform, Slide uniquement transform ;
 *  - declenchement quand 20 % de l'element est visible (fraction: 0.2).
 *
 * On utilise une vraie animation CSS, comme la librairie d'origine, et non
 * l'API Web Animations : l'animation reste appliquee apres son terme, ce qui
 * garde l'element sur sa propre couche de composition. Le rendu du texte
 * (anticrenelage) est ainsi identique a celui de la version React.
 *
 * Avant l'animation l'element ne porte que `opacity: 0` et reste a sa place :
 * appliquer la translation des le depart sortirait les elements left/right du
 * viewport, et l'IntersectionObserver ne les verrait jamais.
 *
 *   <div class="greet-main" appReveal="bottom" [revealDuration]="1000" revealDistance="40px">
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective implements AfterViewInit, OnDestroy {
  readonly appReveal = input<RevealDirection>('bottom');
  readonly revealDuration = input(DEFAULT_DURATION);
  readonly revealDistance = input('');
  readonly revealEffect = input<RevealEffect>('fade');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;
  private revealed = false;

  ngAfterViewInit(): void {
    if (this.prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const el = this.host.nativeElement;
    this.renderer.setStyle(el, 'opacity', '0');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.reveal();
          }
        }
      },
      { threshold: FRACTION },
    );
    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private reveal(): void {
    if (this.revealed) {
      return;
    }
    this.revealed = true;
    this.observer?.disconnect();

    const el = this.host.nativeElement;
    const offset = this.offsetTransform();
    const name = keyframes(
      this.revealEffect() === 'fade'
        ? `from {opacity: 0;transform: ${offset};} to {opacity: 1;transform: none;}`
        : `from {transform: ${offset};} to {transform: none;}`,
    );

    this.renderer.setStyle(el, 'animation-fill-mode', 'both');
    this.renderer.setStyle(el, 'animation-duration', `${this.revealDuration()}ms`);
    this.renderer.setStyle(el, 'animation-delay', '0ms');
    this.renderer.setStyle(el, 'animation-iteration-count', '1');
    this.renderer.setStyle(el, 'opacity', '1');
    this.renderer.setStyle(el, 'animation-name', name);
  }

  private offsetTransform(): string {
    const dist = this.revealDistance() || DEFAULT_DISTANCE;
    switch (this.appReveal()) {
      case 'top':
        return `translate3d(0, -${dist}, 0)`;
      case 'left':
        return `translate3d(-${dist}, 0, 0)`;
      case 'right':
        return `translate3d(${dist}, 0, 0)`;
      default:
        return `translate3d(0, ${dist}, 0)`;
    }
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
