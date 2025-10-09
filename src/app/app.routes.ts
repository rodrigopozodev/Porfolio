// Configuración de rutas de la aplicación (SPA) con Angular Router.
// Cada entrada mapea una URL a un componente de página.
import { Routes } from '@angular/router';
import { ScrollComponent } from '@/components/inicio/scroll/scroll.component';
import { SobreMiComponent } from '@/components/sobre-mi/sobre-mi.component';
import { TecnologiasComponent } from '@/components/tecnologias/tecnologias.component';
import { ProyectosComponent } from '@/components/proyectos/proyectos.component';

// Lista de rutas públicas de la web.
export const appRoutes: Routes = [
  // Redirige la raíz '' a la ruta 'inicio'.
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  // Página de inicio (hero/portada).
  { path: 'inicio', component: ScrollComponent },
  // Página de presentación personal.
  { path: 'sobre-mi', component: SobreMiComponent },
  // Página de tecnologías.
  { path: 'tecnologias', component: TecnologiasComponent },
  // Página de proyectos del portafolio.
  { path: 'proyectos', component: ProyectosComponent },
  // Cualquier ruta no reconocida redirige a 'inicio'.
  { path: '**', redirectTo: 'inicio' }
];
