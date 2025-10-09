import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@/components/Diseño-General/traductor/translate.pipe';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, LucideAngularModule],
  templateUrl: './featured-projects.component.html',
})
export class FeaturedProjectsComponent {
  // Lista de últimos proyectos (se limita a 8 en la plantilla)
  items = [
    { title: 'ZapasPro', url: 'https://zapaspro.netlify.app/', desc: 'Desarrolado con Angular y Node.js con TypeScript. Permite explorar modelos de zapatillas, añadir productos al carrito y completar la compra. Incluye control de stock por tallas y colores, gestión de usuarios y almacenamiento de datos en SQLite.', image: 'assets/images/ZapasPro_Rosa.png' },
    { title: 'Punteator', url: 'https://punteator.netlify.app/', desc: 'Aplicación web para puntuar y anotar contenido. Próximamente más detalles.', image: 'assets/svg/Claro_Puntero.png' },
  ];

  // Control de bocadillos por clic
  bubbleOpenIndex: number | null = null;

  // Identifica la tarjeta de ZapasPro para aplicar los bocadillos
  isZapasPro(item: { image?: string }): boolean {
    return (item.image ?? '').includes('ZapasPro');
  }

  constructor(private router: Router) {}

  openOptions(index: number, event: MouseEvent) {
    // Evita la navegación directa para mostrar opciones
    event.preventDefault();
    event.stopPropagation();
    // Alterna selección: si ya está abierto, ciérralo
    this.bubbleOpenIndex = this.bubbleOpenIndex === index ? null : index;
  }

  closeOptions() {
    this.bubbleOpenIndex = null;
  }

  visitWeb(item: { url?: string }) {
    if (item.url) window.open(item.url, '_blank');
    this.closeOptions();
  }

  moreInfo(index: number) {
    this.router.navigate(['/proyectos'], { state: { index } });
    this.closeOptions();
  }
}