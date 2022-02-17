import { Injectable } from '@angular/core';
import { ToastrService as Toastr } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastr: Toastr) {}

  showSuccess(message: string, title: string) {
    const errorMessage = title; // TODO: Check for translation issues
    this.toastr.success(message, errorMessage);
  }

  showError(message: string, title: string) {
    const errorMessage = title; // TODO: Check for translation issues
    this.toastr.error(message, errorMessage);
  }

  showInfo(message: string, title: string) {
    const errorMessage = title; // TODO: Check for translation issues
    this.toastr.info(message, errorMessage);
  }

  showWarning(message: string, title: string) {
    const errorMessage = title; // TODO: Check for translation issues
    this.toastr.warning(message, errorMessage);
  }
}
