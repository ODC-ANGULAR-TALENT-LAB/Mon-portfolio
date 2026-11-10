import { ChangeDetectionStrategy, Component } from '@angular/core';
import { certifications, degrees, profile } from '../../core/content';
import { Icon } from '../../components/icon/icon';
import { TechLogo } from '../../components/tech-logo/tech-logo';
import { Reveal, Tilt } from '../../shared/motion';

/** Certifications (avec justificatif telechargeable), diplomes et langues. */
@Component({
  selector: 'app-credentials',
  imports: [Icon, TechLogo, Reveal, Tilt],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section shell" id="certifications" aria-labelledby="certifs-title">
      <header class="section-head" appReveal>
        <p class="section-kicker"><app-icon name="award" /> Certifications</p>
        <h2 class="section-title" id="certifs-title">Certifications et formation</h2>
        <p class="section-lede">
          Chaque certificat s’ouvre en PDF ; les certificats DataCamp portent leur numéro
          d’authentification.
        </p>
      </header>

      <ul class="cert-list">
        @for (c of certifications; track c.title; let i = $index) {
          <li class="cert" [style.--i]="i" appReveal>
            <a class="cert-thumb" [href]="c.pdf" target="_blank" rel="noopener" appTilt="9"
               [attr.aria-label]="'Ouvrir le certificat ' + c.title + ' (PDF)'">
              <img [src]="c.thumbnail" alt="" loading="lazy" decoding="async" width="720" height="416" />
              <span class="tilt-glare" aria-hidden="true"></span>
            </a>
            <div class="cert-body">
              <h3>{{ c.title }}</h3>
              <p class="cert-issuer">
                <app-tech-logo [name]="c.issuer === 'DataCamp' ? 'DataCamp' : 'Orange'" />
                {{ c.issuer }}, {{ c.date }}
              </p>
              <p class="cert-meta">
                {{ c.length }}
                @if (c.note) {
                  <br />{{ c.note }}
                }
                @if (c.credentialId) {
                  <br />N° {{ c.credentialId }}
                }
              </p>
              <a class="cert-link" [href]="c.pdf" target="_blank" rel="noopener">
                Voir le certificat <app-icon name="external" />
              </a>
            </div>
          </li>
        }
      </ul>

      <div class="credentials-columns" appReveal>
        <div>
          <h3 class="subsection-title"><app-icon name="graduation" /> Diplômes</h3>
          <ol class="degree-list">
            @for (d of degrees; track d.title) {
              <li>
                <span class="degree-period">{{ d.period }}</span>
                <span class="degree-title">{{ d.title }}</span>
                <span class="degree-school">
                  {{ d.school }}@if (d.detail) {, {{ d.detail.toLowerCase() }}}
                </span>
              </li>
            }
          </ol>
        </div>
        <div>
          <h3 class="subsection-title"><app-icon name="globe" /> Langues</h3>
          <dl class="language-list">
            @for (l of languages; track l.name) {
              <div>
                <dt>{{ l.name }}</dt>
                <dd>{{ l.level }}</dd>
              </div>
            }
          </dl>
        </div>
      </div>
    </section>
  `,
})
export class Credentials {
  protected readonly certifications = certifications;
  protected readonly degrees = degrees;
  protected readonly languages = profile.languages;
}
