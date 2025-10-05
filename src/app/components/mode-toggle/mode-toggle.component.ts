import { Component, OnInit, Inject, ElementRef, ViewChild, ViewChildren, QueryList, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService, Theme } from '@/services/theme.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-mode-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
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
    'Tema Azul Tecnológico',
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
