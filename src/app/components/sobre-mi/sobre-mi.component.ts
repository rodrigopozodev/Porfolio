import { Component } from '@angular/core';
import { TranslatePipe } from '@/pipes/translate.pipe';

@Component({
  selector: 'app-sobre-mi',
  standalone: true,
  templateUrl: './sobre-mi.component.html',
  imports: [TranslatePipe],
})
export class SobreMiComponent {}