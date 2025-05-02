import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  codeLink?: string; // Optional single code link
  demoLink?: string; // Optional demo link
  frontendRepo?: string; // Optional frontend repo link
  backendRepo?: string; // Optional backend repo link
  aiHint: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: "Plataforma E-commerce",
      description: "Una tienda online completa con carrito, proceso de pago e integración de pagos.",
      image: "https://picsum.photos/384/192",
      technologies: ["Angular", "Node.js", "MongoDB", "Stripe"],
      frontendRepo: "https://github.com/rodrigopozodev/ZapasPro_Front", // Added frontend link
      backendRepo: "https://github.com/rodrigopozodev/ZapasPro_Back", // Added backend link
      demoLink: "https://zapaspro.netlify.app/", // Updated demo link
      aiHint: "tienda online carrito compra"
    },
    {
      title: "App Gestión de Tareas",
      description: "Una aplicación de gestión de tareas estilo Kanban con funcionalidad de arrastrar y soltar.",
      image: "https://picsum.photos/384/192",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      codeLink: "#",
      demoLink: "#",
      aiHint: "tablero kanban tareas"
    },
    {
      title: "Dashboard Meteorológico",
      description: "Información meteorológica en tiempo real con mapas interactivos y pronósticos.",
      image: "https://picsum.photos/384/192",
      technologies: ["JavaScript", "OpenWeather API", "Chart.js"],
      codeLink: "#",
      demoLink: "#",
      aiHint: "mapa tiempo pronostico"
    },
  ];
}
