import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Solo importa RouterModule aquí


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
