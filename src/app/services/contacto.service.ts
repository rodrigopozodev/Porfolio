import { Injectable } from '@angular/core';

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactoService {
  // Using FormSubmit (no keys required). First submission triggers a verification email.
  private endpoint = 'https://formsubmit.co/ajax/rodrigopozosanchez@gmail.com';

  async send(payload: ContactPayload): Promise<{ ok: boolean; message?: string }>
  {
    const body = {
      name: payload.name,
      email: payload.email,
      message: payload.message,
      subject: payload.subject ?? 'Contacto desde el portafolio',
      _template: 'table',
    };
    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, message: json?.message || 'No se pudo enviar el mensaje.' };
    }
    return { ok: true, message: json?.message };
  }
}