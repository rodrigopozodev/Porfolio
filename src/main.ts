import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, Github, Mail, Download, Sun, Moon, Linkedin, PaintRoller, Languages, ArrowRight } from 'lucide-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ Github, Mail, Download, Sun, Moon, Linkedin, PaintRoller, Languages, ArrowRight }))
  ]
}).catch(err => console.error(err));


