import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular'; 

interface Project {
  title: string;
  name: string;
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
  safeZapasproUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://zapaspro.netlify.app/store/")
  projects: Project[] = [
    {
      title: "ZapasPro",
      description: "Una tienda online completa con carrito, proceso de pago e integración de pagos.",
      image: "", // Use placeholder image
      name: "zapaspro",
      technologies: ["Angular", "Node.js", "TypeScript", "Tailwind", "SQLite"],
      frontendRepo: "https://github.com/rodrigopozodev/ZapasPro_Front",
      backendRepo: "https://github.com/rodrigopozodev/ZapasPro_Back",
      demoLink: "https://zapaspro.netlify.app/store",
      aiHint: "screenshot zapaspro store" // Keep the hint for screenshot
    },
    // {
    //   title: "App Gestión de Tareas",
    //   name: "taskmanager",
    //   description: "Una aplicación de gestión de tareas estilo Kanban con funcionalidad de arrastrar y soltar.",
    //   image: "",
    //   technologies: ["React", "Firebase", "Tailwind CSS"],
    //   codeLink: "#",
    //   demoLink: "#",
    //   aiHint: "tablero kanban tareas"

    // },
    // {
    //   title: "Dashboard Meteorológico",
    //   name: "weather",
    //   description: "Información meteorológica en tiempo real con mapas interactivos y pronósticos.",
    //   image: "",
    //   technologies: ["JavaScript", "OpenWeather API", "Chart.js"],
    //   codeLink: "#",
    //   demoLink: "#",
    //   aiHint: "mapa tiempo pronostico"

    // },
  ];
  constructor(private sanitizer: DomSanitizer) { }

  showProjectInfo(project: Project) {
    // Placeholder function for Info button click
    // In the future, this could navigate to a details page or show a modal
    console.log('Show info for project:', project.title);
    // Example navigation (requires Router to be injected):
    // this.router.navigate(['/project-details', project.id]);
  }
}

