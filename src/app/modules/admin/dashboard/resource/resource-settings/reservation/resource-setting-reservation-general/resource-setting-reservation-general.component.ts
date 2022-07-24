import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-resource-setting-reservation-general',
  templateUrl: './resource-setting-reservation-general.component.html',
  styleUrls: ['./resource-setting-reservation-general.component.scss'],
})
export class ResourceSettingReservationGeneralComponent implements OnInit {
  @Input() settings: any;
  @Output() updateLocalSettings = new EventEmitter<string>();
  form: FormGroup;
  isFixedLoanDurationOptionhidden = true;
  isOverdueNoticeDelayOptionhidden = true;
  constructor(
    private _formBuilder: FormBuilder,
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
  ) {}
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      isEnabled: false,
      isLoanable: false,
      isReturnTheirOwnLoans: false,
      isReservingLoansAtFutureDates: false,
      fixedLoanDuration: 'week',
      overdueNoticeDelay: 'week',
      recurringReservations: 'user',
    });

    this.form.setValue({
      isEnabled: this.settings?.isEnabled || false,
      isLoanable: this.settings?.isLoanable || false,
      isReturnTheirOwnLoans: this.settings?.isReturnTheirOwnLoans || false,
      isReservingLoansAtFutureDates: this.settings?.isReservingLoansAtFutureDates || false,
      fixedLoanDuration: this.settings?.fixedLoanDuration || 'week',
      overdueNoticeDelay: this.settings?.overdueNoticeDelay || 'week',
      recurringReservations: this.settings?.recurringReservations || 'user',
    });
  }

  onSubmit() {
    const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
    this._resourceService.updateResourcesSettingsReservationGeneral(selectedResourceId, this.form.value).subscribe((response) => {
      if (response.body.statusCode === 204) {
        this.updateLocalSettings.emit(this.form.value);
        this._toastrService.showSuccess('Updated Successfully');
      } else {
        this._toastrService.showError('Something went wrong!');
      }
    });
  }
}
