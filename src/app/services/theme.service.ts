import { Injectable, Inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: Theme = 'system';
  private isBrowser: boolean;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  loadTheme() {
    if (!this.isBrowser) return;

    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      this.setTheme(storedTheme);
    } else {
      this.setTheme('system');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applyTheme();
      }
    });
  }

  setTheme(theme: Theme) {
    if (!this.isBrowser) return;

    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  private applyTheme() {
    if (!this.isBrowser) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const applyDark = (this.currentTheme === 'dark') || (this.currentTheme === 'system' && prefersDark);

    if (applyDark) {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }
  }

  isDarkMode(): boolean {
     if (!this.isBrowser) return false;
     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
     return (this.currentTheme === 'dark') || (this.currentTheme === 'system' && prefersDark);
  }
}
