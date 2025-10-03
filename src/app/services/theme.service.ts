import { Injectable, Inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme =
  | 'rainbow-road'
  | 'cotton-candy'
  | 'choco-mountain'
  | 'bubblegum-pop'
  | 'lobster-life'
  | 'yoshi-valley'
  | 'pixel-retro'
  | 'arcade-glow';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: Theme = 'rainbow-road';
  private isBrowser: boolean;
  private palettes: Record<Theme, {
    background: string;
    surface: string;
    text: string;
    accent: string;
    secondary: string;
  }> = {
    'rainbow-road': {
      background: '#0f1226',
      surface: '#1a1f3b',
      text: '#ffffff',
      accent: '#ff6b6b',
      secondary: '#4dd2ff'
    },
    'cotton-candy': {
      background: '#FFF0F6',
      surface: '#FFE4EC',
      text: '#333333',
      accent: '#FF80B5',
      secondary: '#A7D8FF'
    },
    'choco-mountain': {
      background: '#221714',
      surface: '#3a2721',
      text: '#f3e9e5',
      accent: '#7b3f00',
      secondary: '#c58940'
    },
    'bubblegum-pop': {
      background: '#0b0f1a',
      surface: '#121826',
      text: '#eaf0ff',
      accent: '#ff5ea2',
      secondary: '#7c4dff'
    },
    'lobster-life': {
      background: '#0f1416',
      surface: '#1a2224',
      text: '#f7f9fa',
      accent: '#e63946',
      secondary: '#457b9d'
    },
    'yoshi-valley': {
      background: '#0d1f17',
      surface: '#153327',
      text: '#e8fff4',
      accent: '#2ecc71',
      secondary: '#f1c40f'
    },
    'pixel-retro': {
      background: '#101010',
      surface: '#1f1f1f',
      text: '#f5f5f5',
      accent: '#ffcc00',
      secondary: '#00e5ff'
    },
    'arcade-glow': {
      background: '#0a0f1f',
      surface: '#121a2e',
      text: '#e6f7ff',
      accent: '#00ffa3',
      secondary: '#7df9ff'
    }
  };

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
    this.setTheme(storedTheme ?? this.currentTheme);
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
    const palette = this.palettes[this.currentTheme];
    const root = document.documentElement;

    const toHsl = (hex: string) => this.hexToHslString(hex);

    // Core roles
    this.setVar(root, '--background', toHsl(palette.background));
    this.setVar(root, '--foreground', toHsl(palette.text));
    this.setVar(root, '--accent', toHsl(palette.accent));
    this.setVar(root, '--accent-foreground', toHsl(this.bestForeground(palette.accent)));
    this.setVar(root, '--secondary', toHsl(palette.secondary));
    this.setVar(root, '--secondary-foreground', toHsl(this.bestForeground(palette.secondary)));

    // Derived roles
    this.setVar(root, '--card', toHsl(palette.surface));
    this.setVar(root, '--card-foreground', toHsl(palette.text));
    this.setVar(root, '--popover', toHsl(palette.surface));
    this.setVar(root, '--popover-foreground', toHsl(palette.text));
    this.setVar(root, '--muted', toHsl(this.mixHex(palette.surface, palette.text, 0.15)));
    this.setVar(root, '--muted-foreground', toHsl(this.mixHex(palette.text, palette.surface, 0.2)));
    this.setVar(root, '--destructive', toHsl('#ff3b30'));
    this.setVar(root, '--destructive-foreground', toHsl('#ffffff'));
    this.setVar(root, '--border', toHsl(this.mixHex(palette.surface, palette.text, 0.3)));
    this.setVar(root, '--input', toHsl(this.mixHex(palette.surface, palette.text, 0.25)));
    this.setVar(root, '--ring', toHsl(palette.accent));
    this.setVar(root, '--radius', '0.5rem');
  }

  private setVar(root: HTMLElement, name: string, value: string) {
    // Use direct CSS custom property API to ensure variables update reliably
    root.style.setProperty(name, value);
  }

  private hexToHslString(hex: string): string {
    // Normalize and parse
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 1); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    const hs = Math.round(h * 360);
    const ss = Math.round(s * 100);
    const ls = Math.round(l * 100);
    return `${hs} ${ss}% ${ls}%`;
  }

  private bestForeground(bgHex: string): string {
    // YIQ heuristic for contrast
    const c = bgHex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffff';
  }

  private mixHex(hex1: string, hex2: string, amount: number): string {
    const h1 = hex1.replace('#', '');
    const h2 = hex2.replace('#', '');
    const r = Math.round(parseInt(h1.substring(0, 2), 16) * (1 - amount) + parseInt(h2.substring(0, 2), 16) * amount);
    const g = Math.round(parseInt(h1.substring(2, 4), 16) * (1 - amount) + parseInt(h2.substring(2, 4), 16) * amount);
    const b = Math.round(parseInt(h1.substring(4, 6), 16) * (1 - amount) + parseInt(h2.substring(4, 6), 16) * amount);
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  // Expose palette for preview UI
  getPalette(theme: Theme) {
    return this.palettes[theme];
  }
}
