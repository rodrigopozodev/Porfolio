import { Component, QueryList, ViewChildren, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  templateUrl: './proyectos.component.html',
  imports: [CommonModule, LucideAngularModule],
})
export class ProyectosComponent implements OnInit, OnDestroy {
  activeIndex = 0;
  private animating = false;

  // Datos de proyectos (ampliable)
  projects = [
    {
      title: 'ZapasPro',
      description:
        'Aplicación web para e-commerce de zapatillas. Explora modelos, gestiona carrito y completa compras con control de stock por tallas/colores.',
      category: 'WEB APPLICATION',
      image: 'assets/images/ZapasPro_Rosa.png',
      url: 'https://zapaspro.netlify.app/',
      bgClass: 'bg-[hsl(var(--accent))]'
    },
    {
      title: 'Punteator',
      description:
        'Aplicación web para puntuar y anotar contenido. Permite evaluar ítems y exportar resultados de manera sencilla.',
      category: 'WEB APPLICATION',
      image: 'assets/svg/Claro_Puntero.png',
      url: 'https://punteator.netlify.app/',
      bgClass: 'bg-muted'
    },
    // Puedes añadir más proyectos aquí con el mismo formato
  ];

  @ViewChild('scrollContainer') scrollContainer?: ElementRef<HTMLDivElement>;
  @ViewChildren('sectionRef') sectionRefs?: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Oculta barras de desplazamiento vertical en toda la página de Proyectos
    document.documentElement.style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';

    // Leer índice desde router state para mantener URL limpia (/proyectos)
    const stateIdx = (history.state?.index ?? null) as number | null;
    if (typeof stateIdx === 'number' && stateIdx >= 0 && stateIdx < this.projects.length) {
      setTimeout(() => this.goToIndex(stateIdx), 0);
    }

    // Si se llega con query param ?index=, desplazamos a la sección indicada
    this.route.queryParamMap.subscribe((params) => {
      const idxParam = params.get('index');
      if (idxParam !== null) {
        const idx = Number(idxParam);
        if (!Number.isNaN(idx) && idx >= 0 && idx < this.projects.length) {
          // Si ya tenemos refs, desplaza; si no, espera al siguiente ciclo
          setTimeout(() => this.goToIndex(idx), 0);
        }
      }
    });
  }

  ngOnDestroy() {
    // Restaura el comportamiento por defecto al salir de Proyectos
    document.documentElement.style.overflowY = '';
    document.body.style.overflowY = '';
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    if (this.animating || !this.sectionRefs) return;
    const dir = Math.sign(e.deltaY);
    if (dir > 0) this.goToIndex(Math.min(this.activeIndex + 1, this.projects.length - 1));
    else if (dir < 0) this.goToIndex(Math.max(this.activeIndex - 1, 0));
  }

  goToIndex(idx: number) {
    if (!this.scrollContainer || !this.sectionRefs) return;
    const container = this.scrollContainer.nativeElement;
    const target = this.sectionRefs.toArray()[idx]?.nativeElement;
    if (!target) return;
    this.activeIndex = idx;
    this.animating = true;
    const to = target.offsetTop;
    this.animateScrollTo(container, to, 1000); // 1s de animación
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