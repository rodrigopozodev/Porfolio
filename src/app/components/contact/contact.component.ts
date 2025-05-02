import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    message: ''
  };

  onSubmit() {
    // Handle form submission logic here
    // e.g., send data to a backend or email service
    console.log('Form submitted:', this.contactForm);
    // Add logic to show success/error message
    // Reset form (optional)
    this.contactForm = { name: '', email: '', message: '' };
  }
}
