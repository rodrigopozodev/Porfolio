import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  codeLink?: string; // Optional code link
  demoLink?: string; // Optional demo link
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
      title: "E-commerce Platform",
      description: "A full-featured online store with cart, checkout, and payment integration.",
      image: "https://picsum.photos/384/192",
      technologies: ["Angular", "Node.js", "MongoDB", "Stripe"],
      codeLink: "#", // Replace with actual link
      demoLink: "#", // Replace with actual link
      aiHint: "online store shopping cart"
    },
    {
      title: "Task Management App",
      description: "A Kanban-style task management application with drag-and-drop functionality.",
      image: "https://picsum.photos/384/192",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      codeLink: "#",
      demoLink: "#",
      aiHint: "kanban board tasks"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather information with interactive maps and forecasts.",
      image: "https://picsum.photos/384/192",
      technologies: ["JavaScript", "OpenWeather API", "Chart.js"],
      codeLink: "#",
      demoLink: "#",
      aiHint: "weather map forecast"
    },
  ];
}
