import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, Github, ExternalLink, Mail, Download, Send, Sun, Moon } from 'lucide-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ Github, ExternalLink, Mail, Download, Send, Sun, Moon }))
  ]
}).catch(err => console.error(err));
