import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@/components/Diseño-General/traductor/translate.pipe';

@Component({
  selector: 'app-tecnologias',
  standalone: true,
  templateUrl: './tecnologias.component.html',
  imports: [CommonModule],
})
export class TecnologiasComponent {}