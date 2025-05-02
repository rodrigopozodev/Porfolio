import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LucideAngularModule], // Removed CommonModule
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  githubLink = "#"; // Replace with your GitHub profile link
  emailLink = "mailto:your.email@example.com"; // Replace with your email
}
