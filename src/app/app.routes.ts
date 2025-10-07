import { Routes } from '@angular/router';
import { HeroComponent } from '@/components/hero/hero.component';
import { SobreMiComponent } from '@/components/sobre-mi/sobre-mi.component';
import { TecnologiasComponent } from '@/components/tecnologias/tecnologias.component';
import { ProyectosComponent } from '@/components/proyectos/proyectos.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HeroComponent },
  { path: 'sobre-mi', component: SobreMiComponent },
  { path: 'tecnologias', component: TecnologiasComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: '**', redirectTo: 'inicio' }
];
