import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { tech } from '../../core/tech';

/**
 * Logo d'une technologie dans sa couleur de marque, avec son nom en option.
 *
 * Les marques au logo tres sombre (Vercel, Nx, Prisma...) deviendraient
 * invisibles sur le theme sombre : on les repere par leur luminance et, en
 * theme sombre seulement, elles prennent la couleur du texte.
 */
@Component({
  selector: 'app-tech-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'tech',
    '[class.tech-dark-brand]': 'darkBrand()',
    '[class.tech-with-label]': 'label()',
    '[style.--brand]': 't().hex',
    '[attr.title]': 'label() ? null : t().label',
  },
  template: `<span class="tech-mark" aria-hidden="true">@if (t().path) {<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" focusable="false"><path [attr.d]="t().path" /></svg>} @else {<span class="tech-mono">{{ t().mono }}</span>}</span>@if (label()) {<span class="tech-label">{{ t().label }}</span>} @else {<span class="visually-hidden">{{ t().label }}</span>}`,
})
export class TechLogo {
  readonly name = input.required<string>();
  readonly label = input(false);

  protected readonly t = computed(() => tech(this.name()));
  protected readonly darkBrand = computed(() => luminance(this.t().hex) < 0.1);
}

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}
