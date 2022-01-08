import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform(value: string): string {
    return this.translocoService.translate(value) || value;
  }
}
