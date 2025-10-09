import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@/components/Diseño-General/traductor/translate.pipe';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-proyectos-recientes',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, LucideAngularModule],
  templateUrl: './proyectos-recientes.component.html',
})
export class ProyectosRecientesComponent {
  // Datos: últimos proyectos visibles (máx. 8 en plantilla)
  items = [
    {
      title: 'ZapasPro',
      url: 'https://zapaspro.netlify.app/',
      desc: 'Desarrolado con Angular y Node.js con TypeScript. Permite explorar modelos de zapatillas, añadir productos al carrito y completar la compra. Incluye control de stock por tallas y colores, gestión de usuarios y almacenamiento de datos en SQLite.',
      image: 'assets/images/ZapasPro_Rosa.png',
    },
    {
      title: 'Punteator',
      url: 'https://punteator.netlify.app/',
      desc: 'Aplicación web para puntuar y anotar contenido. Próximamente más detalles.',
      image: 'assets/svg/Claro_Puntero.png',
    },
  ];

  // Estado: índice del bocadillo (opciones) abierto
  bubbleOpenIndex: number | null = null;

  // Utilidad: identifica tarjetas especiales (ZapasPro)
  isZapasPro(item: { image?: string }): boolean {
    return (item.image ?? '').includes('ZapasPro');
  }

  constructor(private router: Router) {}

  // UI: alterna apertura de opciones bajo tarjeta
  openOptions(index: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.bubbleOpenIndex = this.bubbleOpenIndex === index ? null : index;
  }

  // UI: cierra opciones
  closeOptions() {
    this.bubbleOpenIndex = null;
  }

  // Acción: visita la web del proyecto (nueva pestaña)
  visitWeb(item: { url?: string }) {
    if (item.url) window.open(item.url, '_blank');
    this.closeOptions();
  }

  // Navegación: ir a la página de proyectos con índice
  moreInfo(index: number) {
    this.router.navigate(['/proyectos'], { state: { index } });
    this.closeOptions();
  }
}