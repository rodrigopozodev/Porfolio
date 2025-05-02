import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {

  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadCV() {
    // Implement CV download logic here, e.g., link to a file
    console.log('Download CV clicked');
     // Example: window.open('/path/to/your/cv.pdf', '_blank');
  }
}
