import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { IdiomaService } from '@/services/idioma.service';
import { TranslatePipe } from '@/components/Diseño-General/traductor/translate.pipe';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  templateUrl: './language-toggle.component.html',
})
export class LanguageToggleComponent {
  constructor(private languageService: IdiomaService) {}

  get current() {
    return this.languageService.getLanguage();
  }

  toggle() {
    this.languageService.toggleLanguage();
  }
}