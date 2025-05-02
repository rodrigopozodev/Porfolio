import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, Github, ExternalLink, Mail, Download, Send, Sun, Moon, Info, Linkedin } from 'lucide-angular'; // Added Linkedin icon

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ Github, ExternalLink, Mail, Download, Send, Sun, Moon, Info, Linkedin })) // Added Linkedin icon
  ]
}).catch(err => console.error(err));

