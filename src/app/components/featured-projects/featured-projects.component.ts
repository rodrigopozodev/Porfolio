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
    { title: 'ZapasPro', url: 'https://zapaspro.netlify.app', desc: 'E-commerce hecho con Angular y Node.', image: 'assets/images/ZapasPro.png' },
  ];
}