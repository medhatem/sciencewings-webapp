import { Injectable } from '@angular/core';
import { ToastrService as Toastr } from 'ngx-toastr';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastr: Toastr, private _translocoService: TranslocoService) {}

  showSuccess(title: string, message: string = '') {
    this.toastr.success(this._translocoService.translate(message), this._translocoService.translate(title));
  }

  showError(title: string, message: string = '') {
    this.toastr.error(this._translocoService.translate(message), this._translocoService.translate(title));
  }

  showInfo(title: string, message: string = '') {
    this.toastr.info(this._translocoService.translate(message), this._translocoService.translate(title));
  }

  showWarning(title: string, message: string = '') {
    this.toastr.warning(this._translocoService.translate(message), this._translocoService.translate(title));
  }
}
