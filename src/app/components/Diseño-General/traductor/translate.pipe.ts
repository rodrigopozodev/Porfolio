import { Pipe, PipeTransform } from '@angular/core';
import { TraduccionService } from '@/services/traduccion.service';

@Pipe({
  name: 't',
  standalone: true,
  pure: false, // Impuro para reaccionar a cambios de idioma
})
export class TranslatePipe implements PipeTransform {
  constructor(private i18n: TraduccionService) {}

  transform(key: string, params?: Record<string, string | number>): string {
    return this.i18n.t(key, params);
  }
}