import { Component, OnInit, Inject, ElementRef, ViewChild, ViewChildren, QueryList, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService, Theme } from '@/services/theme.service';
import { DOCUMENT } from '@angular/common';
import { TranslatePipe } from '@/components/Diseño-General/traductor/translate.pipe';

@Component({
  selector: 'app-mode-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  templateUrl: './mode-toggle.component.html',
})
export class ModeToggleComponent implements OnInit {
  showPanel = false;
  currentTheme: Theme = 'Tema Claro Minimalista';
  arrowLeft = 0;
  @ViewChild('panelRef') panelRef?: ElementRef<HTMLDivElement>;
  @ViewChildren('themeBtn') themeBtns?: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChild('toggleBtn') toggleBtn?: ElementRef<HTMLButtonElement>;
  // Lista de temas disponibles
  themes: Theme[] = [
    'Tema Claro Minimalista',
    'Tema Oscuro Futurista',
    'Tema Profesional Corporativo',
    'Tema Natural (verde y tierra)',
    'Tema Creativo Vibrante',
    'Tema Nocturno Elegante',
    'Tema Azul',
    'Tema Arena Sofisticado'
  ];


  constructor(private themeService: ThemeService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.currentTheme = this.themeService.getTheme();
  }

  togglePanel() {
    this.showPanel = !this.showPanel;
    if (this.showPanel) {
      // Defer to next tick to measure panel height
      setTimeout(() => {
        const root = this.document.documentElement;
        const h = this.panelRef?.nativeElement?.offsetHeight ?? 72; // altura de fallback
        root.style.setProperty('--theme-panel-offset', `${h}px`);

        // Position arrow under the current theme button
        let btnEl = this.themeBtns?.find(ref => (ref.nativeElement.dataset['theme'] === this.currentTheme))?.nativeElement;
        if (!btnEl) btnEl = this.themeBtns?.first?.nativeElement; // fallback a la primera tarjeta visible
        if (btnEl && this.panelRef) {
          const btnRect = btnEl.getBoundingClientRect();
          const panelRect = this.panelRef.nativeElement.getBoundingClientRect();
          this.arrowLeft = btnRect.left - panelRect.left + btnRect.width / 2;
        }
      });
    } else {
      const root = this.document.documentElement;
      root.style.setProperty('--theme-panel-offset', '0px');
    }
  }

  closePanel() {
    this.showPanel = false;
    const root = this.document.documentElement;
    root.style.setProperty('--theme-panel-offset', '0px');
  }

  setTheme(theme: Theme, ev?: MouseEvent) {
    this.themeService.setTheme(theme);
    this.currentTheme = theme;
    // Reposition arrow to selected theme
    if (ev && this.panelRef) {
      const target = ev.currentTarget as HTMLElement;
      const btnRect = target.getBoundingClientRect();
      const panelRect = this.panelRef.nativeElement.getBoundingClientRect();
      this.arrowLeft = btnRect.left - panelRect.left + btnRect.width / 2;
    }
  }

  getPalette(theme: Theme) {
    return this.themeService.getPalette(theme);
  }

  // Etiquetas cortas para los nombres de los temas en la UI
  shortName(theme: Theme): string {
    switch (theme) {
      case 'Tema Claro Minimalista':
        return 'Claro';
      case 'Tema Oscuro Futurista':
        return 'Oscuro';
      case 'Tema Profesional Corporativo':
        return 'Profesional';
      case 'Tema Natural (verde y tierra)':
        return 'Natural';
      case 'Tema Creativo Vibrante':
        return 'Creativo';
      case 'Tema Nocturno Elegante':
        return 'Nocturno';
      case 'Tema Azul':
        return 'Azul';
      case 'Tema Arena Sofisticado':
        return 'Arena';
      default:
        return theme;
    }
  }

  // Cerrar al hacer clic fuera del panel o fuera del botón
  @HostListener('document:click', ['$event'])
  onDocumentClick(ev: MouseEvent) {
    if (!this.showPanel) return;
    const target = ev.target as Node;
    const panelEl = this.panelRef?.nativeElement;
    const toggleEl = this.toggleBtn?.nativeElement;
    if (panelEl && panelEl.contains(target)) return;
    if (toggleEl && toggleEl.contains(target)) return;
    this.closePanel();
  }
}
