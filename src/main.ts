import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Bootstrap de la aplicación con configuración
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
