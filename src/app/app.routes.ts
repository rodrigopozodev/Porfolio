import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SobreMiComponent } from './components/sobre-mi/sobre-mi.component';
import { ContactameComponent } from './components/contactame/contactame.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'sobre-mi', component: SobreMiComponent },
      { path: 'contactame', component: ContactameComponent },
    ]
  },
];
