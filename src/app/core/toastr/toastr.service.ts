import { Injectable } from '@angular/core';
import { TranslatePipe } from 'app/shared/pipes/transloco.pipe';
import { ToastrService as Toastr } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastr: Toastr, private translatePipe: TranslatePipe) {}

  showSuccess(message: string, title: string) {
    const errorMessage = this.translatePipe.transform(title);
    this.toastr.success(message, errorMessage);
  }

  showError(message: string, title: string) {
    const errorMessage = this.translatePipe.transform(title);
    this.toastr.error(message, errorMessage);
  }

  showInfo(message: string, title: string) {
    const errorMessage = this.translatePipe.transform(title);
    this.toastr.info(message, errorMessage);
  }

  showWarning(message: string, title: string) {
    const errorMessage = this.translatePipe.transform(title);
    this.toastr.warning(message, errorMessage);
  }
}
