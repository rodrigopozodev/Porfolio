import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService, Language } from '@/services/language.service';

type Dict = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private isBrowser: boolean;
  private lang: Language = 'es';

  // Diccionarios ES/EN. Mantiene nombres propios y lenguajes de programación tal cual.
  private es: Dict = {
    // Navegación
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mi',
    'nav.tech': 'Tecnologías',
    'nav.projects': 'Proyectos',

    // Header
    'header.photoAlt': 'Foto de {{name}}',

    // Hero
    'hero.greeting': 'Hola, mi nombre es {{name}}',
    'hero.title': 'Construyo sitios web.',
    'hero.workWith': 'Soy desarrollador front‑end y back‑end.',
    'hero.downloadCV': 'Descargar CV',
    'hero.contactMe': 'Contactarme',

    // Contact modal
    'contact.title': 'Contactarme',
    'contact.desc': 'Envíame un mensaje por correo.',
    'contact.name': 'Nombre',
    'contact.namePlaceholder': 'Tu nombre',
    'contact.email': 'Email',
    'contact.subjectOptional': 'Asunto (opcional)',
    'contact.subjectPlaceholder': 'Motivo del contacto',
    'contact.message': 'Mensaje',
    'contact.messagePlaceholder': 'Escribe tu mensaje...',
    'contact.cancel': 'Cancelar',
    'contact.send': 'Enviar',
    'contact.sending': 'Enviando…',
    'contact.emailPlaceholder': 'tu@email.com',

    // Selector de temas
    'theme.selectAria': 'Elegir tema',
    'theme.panelTitle': 'Seleccionar tema',
    'theme.closeAria': 'Cerrar selector de temas',

    // Título del documento
    'document.title': 'Portafolio · {{name}}',

    // Nombres de temas (usamos las cadenas originales como claves para soportar la UI actual)
    'Tema Claro Minimalista': 'Tema Claro Minimalista',
    'Tema Oscuro Futurista': 'Tema Oscuro Futurista',
    'Tema Profesional Corporativo': 'Tema Profesional Corporativo',
    'Tema Natural (verde y tierra)': 'Tema Natural (verde y tierra)',
    'Tema Creativo Vibrante': 'Tema Creativo Vibrante',
    'Tema Nocturno Elegante': 'Tema Nocturno Elegante',
    'Tema Azul': 'Tema Azul',
    'Tema Arena Sofisticado': 'Tema Arena Sofisticado',

    // Language toggle
    'language.toggleAria': 'Cambiar idioma',
    'language.srLabel': 'Idioma: {{code}}',

    // Páginas internas
    'pages.about.title': 'Sobre mí',
    'pages.about.description': 'Esta es la página de presentación personal.',
    'pages.tech.title': 'Tecnologías',
    'pages.tech.description': 'Listado y experiencia con tecnologías.',
    'pages.projects.title': 'Proyectos',
    'pages.projects.description': 'Portafolio de proyectos y trabajos realizados.',

    // Home destacados
    'home.featuredTitle': 'Proyectos Recientes',
    'home.seeAllProjects': 'Ver todos los proyectos',
  };

  private en: Dict = {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About me',
    'nav.tech': 'Technologies',
    'nav.projects': 'Projects',

    // Header
    'header.photoAlt': 'Photo of {{name}}',

    // Hero
    'hero.greeting': 'Hello, my name is {{name}}',
    'hero.title': 'I build websites.',
    "hero.workWith": "I'm a front‑end and back‑end developer.",
    'hero.downloadCV': 'Download CV',
    'hero.contactMe': 'Contact me',

    // Contact modal
    'contact.title': 'Contact me',
    'contact.desc': 'Send me a message by email.',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your name',
    'contact.email': 'Email',
    'contact.subjectOptional': 'Subject (optional)',
    'contact.subjectPlaceholder': 'Reason for contact',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Write your message...',
    'contact.cancel': 'Cancel',
    'contact.send': 'Send',
    'contact.sending': 'Sending…',
    'contact.emailPlaceholder': 'your@email.com',

    // Theme selector
    'theme.selectAria': 'Choose theme',
    'theme.panelTitle': 'Select Theme',
    'theme.closeAria': 'Close theme selector',

    // Document title
    'document.title': 'Portfolio · {{name}}',

    // Theme names (map literal Spanish names to English display)
    'Tema Claro Minimalista': 'Minimalist Light Theme',
    'Tema Oscuro Futurista': 'Futuristic Dark Theme',
    'Tema Profesional Corporativo': 'Professional Corporate Theme',
    'Tema Natural (verde y tierra)': 'Natural Theme (green and earth)',
    'Tema Creativo Vibrante': 'Creative Vibrant Theme',
    'Tema Nocturno Elegante': 'Elegant Night Theme',
    'Tema Azul': 'Blue Theme',
    'Tema Arena Sofisticado': 'Sophisticated Sand Theme',

    // Mensajes dinámicos del contacto (mapeo literal)
    'Por favor, completa nombre, email y mensaje.': 'Please fill in name, email and message.',
    'Mensaje enviado correctamente. ¡Gracias!': 'Message sent successfully. Thank you!',
    'No se pudo enviar el mensaje.': 'Could not send the message.',
    'Error de red al enviar el mensaje.': 'Network error when sending the message.',

    // Language toggle
    'language.toggleAria': 'Change language',
    'language.srLabel': 'Language: {{code}}',

    // Internal pages
    'pages.about.title': 'About me',
    'pages.about.description': 'This is the personal introduction page.',
    'pages.tech.title': 'Technologies',
    'pages.tech.description': 'List of technologies and experience.',
    'pages.projects.title': 'Projects',
    'pages.projects.description': 'Portfolio of projects and work done.',

    // Home featured
    'home.featuredTitle': 'Featured Projects',
    'home.seeAllProjects': 'See all projects',
  };

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private languageService: LanguageService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.languageService.language$.subscribe((l) => {
      this.lang = l;
      this.updateDocumentTitle();
    });
  }

  t(key: string, params?: Record<string, string | number>): string {
    const dict = this.lang === 'en' ? this.en : this.es;
    let template = dict[key] ?? key; // Fallback: devuelve la clave literal si no existe traducción
    if (params) {
      for (const [p, v] of Object.entries(params)) {
        template = template.replace(new RegExp(`{{\\s*${p}\\s*}}`, 'g'), String(v));
      }
    }
    return template;
  }

  private updateDocumentTitle() {
    if (!this.isBrowser) return;
    const title = this.t('document.title', { name: 'Rodrigo Pozo Sánchez' });
    document.title = title;
  }
}