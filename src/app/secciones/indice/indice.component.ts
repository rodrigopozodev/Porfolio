import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class IndiceComponent implements OnInit, OnDestroy {
  secciones = ['sobre-mi', 'proyectos', 'servicios', 'blog', 'testimonios', 'contacto', 'habilidades'];
  currentSection: string = '';
  observer: IntersectionObserver | null = null; // Inicializado con null

  ngOnInit() {
    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: null,
      threshold: 0.5 // Detecta cuando la sección esté al 50% en el viewport
    });

    this.secciones.forEach(seccion => {
      const sectionElement = document.getElementById(seccion);
      if (sectionElement) {
        if (this.observer) {
          this.observer.observe(sectionElement);
        }
      }
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.currentSection = entry.target.id;
      }
    });
  }

  scrollToSection(seccion: string) {
    const element = document.getElementById(seccion);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  }
}
