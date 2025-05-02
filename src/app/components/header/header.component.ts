import { Component } from '@angular/core';
import { ModeToggleComponent } from '../mode-toggle/mode-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModeToggleComponent], // Removed CommonModule
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
