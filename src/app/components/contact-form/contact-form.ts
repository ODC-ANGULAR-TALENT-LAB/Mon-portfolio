import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { contactForm, profile } from '../../core/content';

type SendState = 'idle' | 'sending' | 'sent' | 'error';

/** Reponse de FormSubmit : `success` est une chaine, pas un booleen. */
interface FormSubmitResponse {
  success?: string | boolean;
  message?: string;
}

/**
 * Formulaire de contact.
 *
 * Un site Angular compile en fichiers statiques ne peut pas envoyer d'e-mail
 * par lui-meme : il faut un service qui recoive le formulaire. Deux modes :
 *
 *  - `contactForm.endpoint` renseigne (FormSubmit) : le message est envoye
 *    en arriere-plan et arrive dans la boite mail, le visiteur reste sur la page ;
 *  - endpoint vide : repli sur `mailto:` — le message est pre-rempli dans le
 *    logiciel de messagerie du visiteur, qui n'a plus qu'a l'envoyer.
 *
 * Le repli fonctionne sans aucune configuration, ce qui evite un bouton mort.
 */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  protected readonly state = signal<SendState>('idle');
  protected readonly usesMailto = !contactForm.endpoint;
  protected readonly contactEmail = profile.email;

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    /** Champ piege, invisible pour un humain : un robot qui le remplit est ignore. */
    website: [''],
  });

  protected invalid(field: 'name' | 'email' | 'message'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.dirty || control.touched);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, message, website } = this.form.getRawValue();
    if (website) {
      // Robot : on fait comme si tout s'etait bien passe, sans rien envoyer.
      this.state.set('sent');
      return;
    }

    if (this.usesMailto) {
      const subject = `Message de ${name} — portfolio`;
      const body = `${message}\n\n—\n${name}\n${email}`;
      window.location.href =
        `mailto:${profile.email}` +
        `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      this.state.set('sent');
      return;
    }

    this.state.set('sending');
    const payload = {
      name,
      email,
      message,
      _subject: `Portfolio : nouveau message de ${name}`,
      _replyto: email, // « Repondre » dans Gmail ecrit directement au visiteur
      _template: 'table',
      _captcha: 'false',
    };
    this.http
      .post<FormSubmitResponse>(contactForm.endpoint, payload, {
        headers: new HttpHeaders({ Accept: 'application/json' }),
      })
      .subscribe({
        next: (res) => {
          if (res?.success === false || res?.success === 'false') {
            this.state.set('error');
            return;
          }
          this.state.set('sent');
          this.form.reset();
        },
        error: () => this.state.set('error'),
      });
  }
}
