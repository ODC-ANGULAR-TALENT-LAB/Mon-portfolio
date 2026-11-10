import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  NgZone,
  inject,
  input,
  signal,
} from '@angular/core';

/* Directives de mouvement.
 *
 * Regles communes :
 *  - rien ne bouge si le visiteur a demande moins d'animations au systeme ;
 *  - les effets lies au pointeur ne s'activent qu'avec une souris (pas au doigt) ;
 *  - les ecouteurs pointermove tournent hors de la zone Angular et ne
 *    modifient que des variables CSS : aucune detection de changement par pixel. */

export const prefersReducedMotion = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

const finePointer = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Apparition au defilement : ajoute `is-in` quand l'element entre dans l'ecran.
 * L'animation elle-meme est en CSS ([data-reveal] dans _motion.scss), et les
 * enfants peuvent se decaler via la variable --i.
 */
@Directive({ selector: '[appReveal]', host: { 'data-reveal': '' } })
export class Reveal implements AfterViewInit {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      this.el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(this.el);
    this.destroyRef.onDestroy(() => io.disconnect());
  }
}

/**
 * Inclinaison 3D qui suit la souris, avec un reflet lumineux.
 * Expose --rx, --ry (rotation) et --gx, --gy (position du reflet, en %).
 */
@Directive({ selector: '[appTilt]', host: { class: 'tilt' } })
export class Tilt implements AfterViewInit {
  /** Inclinaison maximale en degres (attribut statique : appTilt="6"). */
  readonly appTilt = input<number | string>('');
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    if (prefersReducedMotion() || !finePointer()) return;
    const max = Number(this.appTilt()) || 8;
    let frame = 0;

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = this.el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        this.el.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`);
        this.el.style.setProperty('--rx', `${(0.5 - y) * max * 2}deg`);
        this.el.style.setProperty('--gx', `${x * 100}%`);
        this.el.style.setProperty('--gy', `${y * 100}%`);
        this.el.classList.add('is-tilting');
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      this.el.classList.remove('is-tilting');
      this.el.style.setProperty('--rx', '0deg');
      this.el.style.setProperty('--ry', '0deg');
    };

    this.zone.runOutsideAngular(() => {
      this.el.addEventListener('pointermove', move);
      this.el.addEventListener('pointerleave', leave);
    });
    this.destroyRef.onDestroy(() => {
      this.el.removeEventListener('pointermove', move);
      this.el.removeEventListener('pointerleave', leave);
    });
  }
}

/**
 * Projecteur : la position de la souris dans l'element, en variables
 * --mx / --my (pixels). Sert au halo du haut de page et aux bordures
 * lumineuses des cartes d'expertise.
 */
@Directive({ selector: '[appSpotlight]' })
export class Spotlight implements AfterViewInit {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    if (!finePointer()) return;
    const move = (e: PointerEvent) => {
      const r = this.el.getBoundingClientRect();
      this.el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      this.el.style.setProperty('--my', `${e.clientY - r.top}px`);
      // Position normalisee entre -1 et 1, pour les effets de parallaxe.
      this.el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      this.el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
    };
    this.zone.runOutsideAngular(() => this.el.addEventListener('pointermove', move));
    this.destroyRef.onDestroy(() => this.el.removeEventListener('pointermove', move));
  }
}

/** Compteur qui monte de 0 a la valeur cible quand il devient visible. */
@Directive({ selector: '[appCountUp]', host: { '[textContent]': 'display()' } })
export class CountUp implements AfterViewInit {
  readonly appCountUp = input.required<number>();
  readonly countDuration = input(1400);
  protected readonly display = signal('0');

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    const target = this.appCountUp();
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      this.display.set(format(target));
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / this.countDuration());
        this.display.set(format(Math.round(target * easeOutExpo(p))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(this.el);
    this.destroyRef.onDestroy(() => io.disconnect());
  }
}

/** Demarre vite, ralentit fort a la fin : le chiffre « se pose » sur sa valeur. */
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

function format(n: number): string {
  return n.toLocaleString('fr-FR');
}
