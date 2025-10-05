import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ContactModalComponent } from '@/components/contact/contact-modal.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LucideAngularModule, ContactModalComponent], // Añadido modal de contacto
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  isContactOpen = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  scrollToContact() {
    // Abrir modal de contacto en lugar de scroll
    this.isContactOpen = true;
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
