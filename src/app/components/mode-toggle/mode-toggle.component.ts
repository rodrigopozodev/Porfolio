import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService, Theme } from '@/services/theme.service';

@Component({
  selector: 'app-mode-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './mode-toggle.component.html',
})
export class ModeToggleComponent implements OnInit {
  showDropdown = false;
  currentTheme: Theme = 'system';
  isDarkMode: boolean = false;


  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.currentTheme = this.themeService.getTheme();
    this.isDarkMode = this.themeService.isDarkMode();
    // Consider subscribing to theme changes if needed for dynamic updates
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
    this.currentTheme = theme;
    this.isDarkMode = this.themeService.isDarkMode();
    this.showDropdown = false; // Close dropdown after selection
  }

  // Helper to close dropdown when clicking outside
  handleClickOutside(event: MouseEvent) {
    // Basic implementation, might need refinement based on specific dropdown structure
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) { // Adjust selector if needed
      this.showDropdown = false;
    }
  }
}
