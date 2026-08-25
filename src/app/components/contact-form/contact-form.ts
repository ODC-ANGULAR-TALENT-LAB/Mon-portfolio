import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { contactForm, contactInfo } from '../../core/portfolio';

type SendState = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Formulaire de contact.
 *
 * Un site Angular compile en fichiers statiques ne peut pas envoyer d'e-mail
 * par lui-meme : il faut un service qui recoive le formulaire. Deux modes :
 *
 *  - `contactForm.endpoint` renseigne (Formspree, Web3Forms, Brevo...) :
 *    le message est envoye en arriere-plan, l'utilisateur ne quitte pas la page ;
 *  - endpoint vide : repli sur `mailto:` — le message est pre-rempli dans le
 *    logiciel de messagerie du visiteur, qui n'a plus qu'a l'envoyer.
 *
 * Le repli fonctionne sans aucune configuration, ce qui evite un bouton mort.
 */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  protected readonly state = signal<SendState>('idle');
  protected readonly usesMailto = !contactForm.endpoint;
  protected readonly contactEmail = contactInfo.email_address;

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
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

    const { name, email, message } = this.form.getRawValue();

    if (this.usesMailto) {
      const subject = `Message de ${name} — portfolio`;
      const body = `${message}\n\n—\n${name}\n${email}`;
      window.location.href =
        `mailto:${contactInfo.email_address}` +
        `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      this.state.set('sent');
      return;
    }

    this.state.set('sending');
    this.http
      .post(contactForm.endpoint, { name, email, message, _subject: `Message de ${name}` })
      .subscribe({
        next: () => {
          this.state.set('sent');
          this.form.reset();
        },
        error: () => this.state.set('error'),
      });
  }
}
