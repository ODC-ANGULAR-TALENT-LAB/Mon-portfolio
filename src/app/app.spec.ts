import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';
import { caseStudies, certifications, contactForm, expertise, profile } from './core/content';
import { ThemeService } from './core/theme';
import { stepIndex } from './components/gallery/gallery';

/** jsdom ne fournit pas matchMedia. */
function stubMatchMedia(dark = false): void {
  window.matchMedia = ((query: string) =>
    ({
      matches: dark,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }) as unknown as MediaQueryList) as typeof window.matchMedia;
}

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let el: HTMLElement;

  beforeEach(async () => {
    stubMatchMedia();
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('affiche toutes les sections de la navigation', () => {
    for (const id of ['top', 'projets', 'parcours', 'expertise', 'certifications', 'contact']) {
      expect(el.querySelector(`#${id}`), id).toBeTruthy();
    }
    for (const a of Array.from(el.querySelectorAll<HTMLAnchorElement>('.site-nav a[href^="#"]'))) {
      expect(el.querySelector(a.getAttribute('href')!), a.href).toBeTruthy();
    }
  });

  it('liste chaque produit dans l’index et lui donne une étude de cas', () => {
    const rows = el.querySelectorAll('.product-row');
    expect(rows.length).toBe(caseStudies.length);
    for (const p of caseStudies) {
      expect(el.querySelector(`#case-${p.id}`), p.id).toBeTruthy();
    }
  });

  it('propose chaque certificat avec son PDF', () => {
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('.cert-link'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual(certifications.map((c) => c.pdf));
  });

  it('expose les moyens de contact', () => {
    expect(el.querySelector(`a[href="mailto:${profile.email}"]`)).toBeTruthy();
    expect(el.querySelector(`a[href="${profile.github}"]`)).toBeTruthy();
    expect(el.querySelector(`a[href="${profile.resume}"][download]`)).toBeTruthy();
  });

  it('pose le thème sur <html> et le bascule', () => {
    const theme = TestBed.inject(ThemeService);
    TestBed.tick();
    expect(document.documentElement.dataset['theme']).toBe('light');
    theme.toggle();
    TestBed.tick();
    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});

describe('formulaire de contact', () => {
  let fixture: ComponentFixture<App>;
  let el: HTMLElement;
  let http: HttpTestingController;

  beforeEach(async () => {
    stubMatchMedia();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    el = fixture.nativeElement;
    http = TestBed.inject(HttpTestingController);
  });

  function fill(values: Record<string, string>): void {
    for (const [id, value] of Object.entries(values)) {
      const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#cf-${id}`)!;
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
    el.querySelector<HTMLFormElement>('.contact-form')!.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  }

  it('envoie le message au relais e-mail et confirme l’envoi', () => {
    fill({ name: 'Awa', email: 'awa@example.com', message: 'Bonjour, parlons d’un projet.' });

    const req = http.expectOne(contactForm.endpoint);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Accept')).toBe('application/json');
    expect(req.request.body).toMatchObject({
      name: 'Awa',
      email: 'awa@example.com',
      _replyto: 'awa@example.com',
    });
    req.flush({ success: 'true' });
    fixture.detectChanges();

    expect(el.querySelector('.contact-form-status .ok')).toBeTruthy();
  });

  it('signale un échec quand le relais refuse le message', () => {
    fill({ name: 'Awa', email: 'awa@example.com', message: 'Bonjour, parlons d’un projet.' });
    http.expectOne(contactForm.endpoint).flush({ success: 'false', message: 'activation' });
    fixture.detectChanges();
    expect(el.querySelector('.contact-form-status .ko')).toBeTruthy();
  });

  it('ignore un robot qui remplit le champ piège', () => {
    fill({ name: 'Bot', email: 'bot@example.com', message: 'Achetez nos backlinks !!!', website: 'spam.example' });
    http.expectNone(contactForm.endpoint);
  });
});

describe('contenu', () => {
  it('ne cite en preuve d’expertise que des projets existants ou des libellés explicites', () => {
    const ids = new Set(caseStudies.map((p) => p.id));
    for (const area of expertise) {
      for (const ref of area.provenIn) {
        // un identifiant court en minuscules doit correspondre a une etude de cas
        if (/^[a-z]+$/.test(ref)) expect(ids.has(ref), `${area.name} -> ${ref}`).toBe(true);
      }
    }
  });

  it('donne au moins une capture à chaque étude de cas', () => {
    for (const p of caseStudies) expect(p.shots.length, p.id).toBeGreaterThan(0);
  });
});

describe('stepIndex', () => {
  it('avance et recule dans la série', () => {
    expect(stepIndex(0, 1, 4)).toBe(1);
    expect(stepIndex(2, -1, 4)).toBe(1);
  });
});
