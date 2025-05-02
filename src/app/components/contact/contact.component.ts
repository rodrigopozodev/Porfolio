import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '', // Added subject field
    message: ''
  };
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
     this.isBrowser = isPlatformBrowser(this.platformId);
  }


  onSubmit() {
    if (!this.isBrowser) {
        console.log('Mailto links only work in a browser environment.');
        return;
    }

    const recipientEmail = 'rodrigopozosanchez@gmail.com';
    const subject = encodeURIComponent(this.contactForm.subject || 'Contacto desde el sitio web'); // Default subject if empty
    const body = encodeURIComponent(
      `Nombre: ${this.contactForm.name}\n` +
      `Correo Electrónico: ${this.contactForm.email}\n\n` +
      `Mensaje:\n${this.contactForm.message}`
    );

    // Construct the mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Open the default email client
    window.location.href = mailtoLink;

    console.log('Intento de envío de correo a:', recipientEmail);
    console.log('Datos del formulario:', this.contactForm);

    // Reset form (optional)
    // Consider delaying reset or showing a success message first
    // this.contactForm = { name: '', email: '', subject: '', message: '' };
  }
}
