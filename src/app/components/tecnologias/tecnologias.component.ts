import { Component } from '@angular/core';
import { TranslatePipe } from '@/pipes/translate.pipe';

@Component({
  selector: 'app-tecnologias',
  standalone: true,
  templateUrl: './tecnologias.component.html',
  imports: [TranslatePipe],
})
export class TecnologiasComponent {}