import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [], // Removed CommonModule as it's not strictly needed for this template
  templateUrl: './about.component.html',
})
export class AboutComponent {}
