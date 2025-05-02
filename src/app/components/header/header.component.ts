import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModeToggleComponent } from '../mode-toggle/mode-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ModeToggleComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // Add properties or methods if needed
}
