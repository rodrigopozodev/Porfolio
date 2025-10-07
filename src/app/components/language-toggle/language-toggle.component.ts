import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { LanguageService } from '@/services/language.service';
import { TranslatePipe } from '@/pipes/translate.pipe';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  templateUrl: './language-toggle.component.html',
})
export class LanguageToggleComponent {
  constructor(private languageService: LanguageService) {}

  get current() {
    return this.languageService.getLanguage();
  }

  toggle() {
    this.languageService.toggleLanguage();
  }
}