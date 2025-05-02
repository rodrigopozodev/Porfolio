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

  githubLink = "https://github.com/rodrigopozodev"; // Updated GitHub link
  emailLink = "mailto:rodrigopozosanchez@gmail.com"; // Updated email link to mailto
}
