import { Injectable, Inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme =
  | 'Tema Claro Minimalista'
  | 'Tema Oscuro Futurista'
  | 'Tema Profesional Corporativo'
  | 'Tema Natural (verde y tierra)'
  | 'Tema Creativo Vibrante'
  | 'Tema Nocturno Elegante'
  | 'Tema Azul'
  | 'Tema Arena Sofisticado';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: Theme = 'Tema Claro Minimalista';
  private isBrowser: boolean;
  private palettes: Record<Theme, {
    background: string;
    textPrimary: string;
    textSecondary: string;
    button: string;
    hover: string;
  }> = {
    'Tema Claro Minimalista': {
      // Color 3: Blanco para el fondo
      background: '#FFFFFF',
      // Color 5: Texto importante gris más oscuro
      textPrimary: '#3F3F46',
      // Color 4: Texto normal gris
      textSecondary: '#9CA3AF',
      // Color 1: Rosa para marcos y subrayados (usado como accent/button)
      button: '#F43F5E',
      // Hover del rosa
      hover: '#E11D48'
    },
    'Tema Oscuro Futurista': {
      background: '#0F172A',
      textPrimary: '#E2E8F0',
      textSecondary: '#94A3B8',
      button: '#6366F1',
      hover: '#4F46E5'
    },
    'Tema Profesional Corporativo': {
      background: '#FFFFFF',
      textPrimary: '#111827',
      textSecondary: '#6B7280',
      button: '#2563EB',
      hover: '#1E40AF'
    },
    'Tema Natural (verde y tierra)': {
      background: '#F3F4E9',
      textPrimary: '#1E3A34',
      textSecondary: '#4B5563',
      button: '#4ADE80',
      hover: '#22C55E'
    },
    'Tema Creativo Vibrante': {
      background: '#FDF2F8',
      textPrimary: '#831843',
      textSecondary: '#9D174D',
      button: '#EC4899',
      hover: '#DB2777'
    },
    'Tema Nocturno Elegante': {
      background: '#1A1A1A',
      textPrimary: '#F5F5F5',
      textSecondary: '#A3A3A3',
      button: '#9333EA',
      hover: '#7E22CE'
    },
    'Tema Azul': {
      background: '#E0F2FE',
      textPrimary: '#0C4A6E',
      textSecondary: '#0369A1',
      button: '#0284C7',
      hover: '#0369A1'
    },
    'Tema Arena Sofisticado': {
      background: '#FAF3E0',
      textPrimary: '#3E2723',
      textSecondary: '#6D4C41',
      button: '#D7CCC8',
      hover: '#BCAAA4'
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
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && (storedTheme in this.palettes)) {
      this.setTheme(storedTheme as Theme);
    } else {
      this.setTheme(this.currentTheme);
    }
  }

  setTheme(theme: Theme) {
    if (!this.isBrowser) return;
    // Validate theme exists; fallback to default if invalid
    if (!(theme in this.palettes)) {
      theme = this.currentTheme;
    }
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

    // Core roles (map nuevas claves)
    this.setVar(root, '--background', toHsl(palette.background));
    this.setVar(root, '--foreground', toHsl(palette.textPrimary));
    this.setVar(root, '--muted-foreground', toHsl(palette.textSecondary));
    // Botón principal como accent/primary
    this.setVar(root, '--accent', toHsl(palette.button));
    this.setVar(root, '--accent-foreground', toHsl(this.bestForeground(palette.button)));
    // Hover explícito
    this.setVar(root, '--accent-hover', toHsl(palette.hover));

    // Color de subrayado/link: en tema claro usa el verde (color 2), en el resto usa el accent
    const isLightTheme = this.currentTheme === 'Tema Claro Minimalista';
    const linkHex = isLightTheme ? '#2CB9A6' : palette.button; // Verde teal para claro
    this.setVar(root, '--link', toHsl(linkHex));

    // Cursores por tema (personalizables)
    this.setVar(root, '--cursor-default', 'auto');
    this.setVar(root, '--cursor-pointer', 'pointer');

    // Derivados para fondos secundarios y superficies
    const surfaceHex = this.mixHex(palette.background, palette.textPrimary, 0.08);
    const secondaryHex = this.mixHex(palette.background, palette.button, 0.15);
    this.setVar(root, '--secondary', toHsl(secondaryHex));
    this.setVar(root, '--secondary-foreground', toHsl(this.bestForeground(secondaryHex)));
    this.setVar(root, '--card', toHsl(surfaceHex));
    this.setVar(root, '--card-foreground', toHsl(palette.textPrimary));
    this.setVar(root, '--popover', toHsl(surfaceHex));
    this.setVar(root, '--popover-foreground', toHsl(palette.textPrimary));
    this.setVar(root, '--muted', toHsl(this.mixHex(surfaceHex, palette.textPrimary, 0.15)));
    this.setVar(root, '--destructive', toHsl('#ff3b30'));
    this.setVar(root, '--destructive-foreground', toHsl('#ffffff'));
    // En el tema claro, usamos el rosa (accent/button) para los marcos/bordes
    // Reutilizamos flag de tema claro para bordes
    this.setVar(root, '--border', toHsl(isLightTheme ? palette.button : this.mixHex(surfaceHex, palette.textPrimary, 0.3)));
    this.setVar(root, '--input', toHsl(this.mixHex(surfaceHex, palette.textPrimary, 0.25)));
    this.setVar(root, '--ring', toHsl(palette.button));
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

  // Expose palette for preview UI (adaptado a nuevas claves)
  getPalette(theme: Theme) {
    const p = this.palettes[theme];
    const surface = this.mixHex(p.background, p.textPrimary, 0.08);
    let secondary = this.mixHex(p.background, p.button, 0.15);
    // En tema claro, el segundo color del preview debe ser el verde (color 2)
    if (theme === 'Tema Claro Minimalista') {
      secondary = '#2CB9A6';
    }
    return {
      background: p.background,
      text: p.textPrimary,
      accent: p.button,
      secondary,
      surface
    };
  }
}
