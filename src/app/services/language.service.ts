import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Language = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private isBrowser: boolean;
  private _language$ = new BehaviorSubject<Language>('es');
  language$ = this._language$.asObservable();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  loadLanguage() {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem('lang') as Language | null;
    const lang: Language = stored === 'en' ? 'en' : 'es';
    this.setLanguage(lang);
  }

  getLanguage(): Language {
    return this._language$.value;
  }

  setLanguage(lang: Language) {
    if (!this.isBrowser) return;
    this._language$.next(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }

  toggleLanguage() {
    const next: Language = this.getLanguage() === 'es' ? 'en' : 'es';
    this.setLanguage(next);
  }
}