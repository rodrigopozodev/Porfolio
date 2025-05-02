import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  scrollToContact() {
    const contactSection = this.document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadCV() {
    const link = this.renderer.createElement('a');
    link.setAttribute('href', 'assets/pdf/Rodrigo_Pozo_Sánchez_CV.pdf');
    link.setAttribute('download', 'Rodrigo_Pozo_Sánchez_CV.pdf');
    this.renderer.appendChild(this.document.body, link);
    link.click();
    this.renderer.removeChild(this.document.body, link);
  }
}
