import { Component, OnInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';

// Componente raíz de la aplicación.
// Renderiza el encabezado y el outlet de enrutamiento para las páginas.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // Indica si el código corre en navegador (no SSR).
  isBrowser: boolean;

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Detecta entorno de ejecución para usar APIs del navegador con seguridad.
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Carga y aplica el tema guardado (colores, cursores).
      this.themeService.loadTheme();
      // Carga idioma preferido y actualiza textos/atributos del documento.
      this.languageService.loadLanguage();
    }
  }
}
