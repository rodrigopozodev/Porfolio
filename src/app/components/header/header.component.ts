import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ModeToggleComponent } from '../mode-toggle/mode-toggle.component';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IdiomaService } from '../../services/idioma.service';
import { TranslatePipe } from '@/components/Diseño-General/traductor/translate.pipe';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ModeToggleComponent, LanguageToggleComponent, RouterLink, RouterLinkActive, TranslatePipe], // Añadimos RouterLink y pipe de traducción
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  lang$ = this.languageService.language$;
  private platformId: object;
  homeActive = false;
  constructor(
    private languageService: IdiomaService,
    public router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.platformId = platformId;
    if (isPlatformBrowser(this.platformId)) {
      const path = window.location.pathname;
      this.homeActive = path === '/' || path === '/inicio';
    }
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const url = e.urlAfterRedirects.split('?')[0];
        this.homeActive = url === '/inicio' || url === '/';
      }
    });
  }

  isHomeActive(): boolean {
    return this.homeActive;
  }
}
