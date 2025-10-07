import { Component } from '@angular/core';
import { TranslatePipe } from '@/pipes/translate.pipe';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  templateUrl: './proyectos.component.html',
  imports: [TranslatePipe],
})
export class ProyectosComponent {}