import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm
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


  onSubmit(form: NgForm) { // Inject NgForm reference
    if (!this.isBrowser) {
        console.log('Mailto links only work in a browser environment.');
        return;
    }

    const recipientEmail = 'rodrigopozosanchez@gmail.com';
    const subject = encodeURIComponent(this.contactForm.subject || 'Contacto desde el sitio web');
    const body = encodeURIComponent(
      `Nombre: ${this.contactForm.name}\n` +
      `Correo Electrónico: ${this.contactForm.email}\n\n` +
      `Mensaje:\n${this.contactForm.message}`
    );

    // Construct the mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    console.log('Opening email client with mailto link:', mailtoLink);
    console.log('Datos del formulario:', this.contactForm);

    // Open the default email client - This prepares an email, it doesn't send it automatically.
    window.location.href = mailtoLink;

    // Reset form after attempting to open email client
    // Use setTimeout to allow the mailto link to process before reset
    setTimeout(() => {
        form.resetForm(); // Use resetForm from NgForm to clear fields and validation state
        this.contactForm = { name: '', email: '', subject: '', message: '' }; // Also reset component model
        console.log('Formulario reiniciado.');
    }, 100); // Small delay
  }
}
