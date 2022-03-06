import { Injectable } from '@angular/core';
import { ToastrService as Toastr } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastr: Toastr, private _translocoService: TranslocoService) {}

  showSuccess(message?: string, title?: string) {
    this.toastr.success(this._translocoService.translate(message), this._translocoService.translate(title));
  }

  showError(message?: string, title?: string) {
    this.toastr.error(this._translocoService.translate(message), this._translocoService.translate(title));
  }

  showInfo(message?: string, title?: string) {
    this.toastr.info(this._translocoService.translate(message), this._translocoService.translate(title));
  }

  showWarning(message?: string, title?: string) {
    this.toastr.warning(this._translocoService.translate(message), this._translocoService.translate(title));
  }
}
