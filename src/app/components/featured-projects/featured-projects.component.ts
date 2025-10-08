import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@/pipes/translate.pipe';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './featured-projects.component.html',
})
export class FeaturedProjectsComponent {
  // Lista de últimos proyectos (se limita a 8 en la plantilla)
  items = [
    { title: '', url: 'https://zapaspro.netlify.app', desc: 'Desarrolado con Angular y Node.js con TypeScript. Permite explorar modelos de zapatillas, añadir productos al carrito y completar la compra. Incluye control de stock por tallas y colores, gestión de usuarios y almacenamiento de datos en SQLite.', image: 'assets/images/ZapasPro.png' },
  ];
}