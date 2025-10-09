import { Component, Inject, Renderer2, ElementRef, ViewChild, ViewChildren, QueryList, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ContactModalComponent } from '@/components/contact/contact-modal.component';
import { FeaturedProjectsComponent } from '@/components/featured-projects/featured-projects.component';
import { TranslatePipe } from '@/pipes/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ContactModalComponent, TranslatePipe, FeaturedProjectsComponent], // Añadido modal de contacto, pipe y sección de destacados
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  isContactOpen = false;
  // Scroll por secciones en Inicio (Bienvenida y Proyectos)
  @ViewChild('homeScroll') homeScroll?: ElementRef<HTMLDivElement>;
  @ViewChildren('homeSection') homeSections?: QueryList<ElementRef<HTMLDivElement>>;
  activeIndex = 0;
  private animating = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    // Oculta barras de desplazamiento vertical del documento en Inicio
    document.documentElement.style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';
  }

  ngOnDestroy() {
    // Restaura barras de desplazamiento al salir de Inicio
    document.documentElement.style.overflowY = '';
    document.body.style.overflowY = '';
  }

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

  // Control de rueda: moverse entre secciones de Inicio
  onWheel(e: WheelEvent) {
    e.preventDefault();
    if (this.animating || !this.homeSections) return;
    const dir = Math.sign(e.deltaY);
    const last = (this.homeSections?.length ?? 2) - 1;
    if (dir > 0) this.goToIndex(Math.min(this.activeIndex + 1, last));
    else if (dir < 0) this.goToIndex(Math.max(this.activeIndex - 1, 0));
  }

  goToIndex(idx: number) {
    if (!this.homeScroll || !this.homeSections) return;
    const container = this.homeScroll.nativeElement;
    const target = this.homeSections.toArray()[idx]?.nativeElement;
    if (!target) return;
    this.activeIndex = idx;
    this.animating = true;
    const to = target.offsetTop;
    this.animateScrollTo(container, to, 700);
  }

  private animateScrollTo(container: HTMLElement, to: number, duration: number) {
    const start = container.scrollTop;
    const change = to - start;
    const startTime = performance.now();
    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollTop = start + change * easeInOut(progress);
      if (progress < 1) requestAnimationFrame(step);
      else this.animating = false;
    };

    requestAnimationFrame(step);
  }
}
