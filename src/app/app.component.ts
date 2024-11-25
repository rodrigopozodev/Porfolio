import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Solo importa RouterModule aquí
import { InicioComponent } from './components/inicio/inicio.component'; // Importa los componentes
import { SobreMiComponent } from './components/sobre-mi/sobre-mi.component';
import { ContactameComponent } from './components/contactame/contactame.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule] // Solo se importa RouterModule aquí
})
export class AppComponent {
  title = 'Portfolio';
}
