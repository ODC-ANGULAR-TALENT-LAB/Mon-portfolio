import { ComponentFixture, TestBed } from '@angular/core/testing';

// lottie-web declenche un XHR vers les JSON d'animation, indisponible sous jsdom.
vi.mock('lottie-web', () => ({
  default: { loadAnimation: () => ({ destroy: () => undefined }) },
}));

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Main } from './main';
import { ThemeService } from '../../core/theme';

/** jsdom ne fournit ni matchMedia ni IntersectionObserver. */
function installBrowserStubs(): void {
  window.matchMedia = ((query: string) =>
    ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }) as unknown as MediaQueryList) as typeof window.matchMedia;

  class IO {
    observe() {}
    disconnect() {}
    unobserve() {}
  }
  (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IO;
  (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IO;
}

describe('Main', () => {
  let fixture: ComponentFixture<Main>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    installBrowserStubs();
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Main],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Main);
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    // profile.json / blogs.json ne sont pas servis en test : on simule l'echec
    // pour que les sections retombent sur les donnees statiques.
    for (const req of httpMock.match(() => true)) {
      req.error(new ProgressiveEventStub());
    }
    fixture.detectChanges();
  });

  it('affiche le splash screen au demarrage', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.splash-container')).toBeTruthy();
  });

  it('affiche les sections activees une fois le splash termine', async () => {
    const component = fixture.componentInstance as unknown as {
      showSplash: { set: (v: boolean) => void };
    };
    component.showSplash.set(false);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('header.header')).toBeTruthy();
    expect(el.querySelector('#greeting')).toBeTruthy();
    expect(el.querySelector('#skills')).toBeTruthy();
    expect(el.querySelector('#education')).toBeTruthy();
    expect(el.querySelector('#experience')).toBeTruthy();
    expect(el.querySelector('#projects')).toBeTruthy();
    expect(el.querySelector('#contact')).toBeTruthy();
    expect(el.querySelector('.footer-div')).toBeTruthy();
    expect(el.querySelector('#topButton')).toBeTruthy();
  });

  it('masque les sections sans contenu', () => {
    const component = fixture.componentInstance as unknown as {
      showSplash: { set: (v: boolean) => void };
    };
    component.showSplash.set(false);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    for (const id of ['#opensource', '#achievements', '#blogs', '#talks']) {
      expect(el.querySelector(id)).toBeNull();
    }
  });

  it('affiche les informations personnelles', () => {
    const component = fixture.componentInstance as unknown as {
      showSplash: { set: (v: boolean) => void };
    };
    component.showSplash.set(false);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.logo-name')?.textContent).toContain('Christian');
    expect(el.querySelector('a[href^="mailto:"]')?.getAttribute('href')).toBe(
      'mailto:christianbitep8@gmail.com',
    );
    expect(el.querySelector('a[href="https://github.com/christian08-bit"]')).toBeTruthy();
  });

  it('bascule la classe dark-mode avec le service de theme', () => {
    const theme = TestBed.inject(ThemeService);
    const root = (fixture.nativeElement as HTMLElement).firstElementChild!;
    const before = root.classList.contains('dark-mode');

    theme.changeTheme();
    fixture.detectChanges();

    expect(root.classList.contains('dark-mode')).toBe(!before);
  });
});

/** Erreur reseau minimale acceptee par HttpTestingController. */
class ProgressiveEventStub extends ErrorEvent {
  constructor() {
    super('error', { message: 'fichier absent en test' });
  }
}
