import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'app-resource-setting-reservation-general',
  templateUrl: './resource-setting-reservation-general.component.html',
  styleUrls: ['./resource-setting-reservation-general.component.scss'],
})
export class ResourceSettingReservationGeneralComponent implements OnInit {
  @Input() settings: any;
  @Output() updateLocalSettings = new EventEmitter<string>();
  form: FormGroup;
  isOverdueNoticeDelayOptionhidden = true;
  constructor(
    private _formBuilder: FormBuilder,
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
  ) {}
  ngOnInit(): void {
    const {
      isEnabled,
      isLoanable,
      isReturnTheirOwnLoans,
      isReservingLoansAtFutureDates,
      fixedLoanDuration,
      overdueNoticeDelay,
      recurringReservations,
    } = this.settings;

    this.form = this._formBuilder.group({
      isEnabled: isEnabled || false,
      isLoanable: isLoanable || false,
      isReturnTheirOwnLoans: isReturnTheirOwnLoans || false,
      isReservingLoansAtFutureDates: isReservingLoansAtFutureDates || false,
      fixedLoanDuration: fixedLoanDuration || 'week',
      overdueNoticeDelay: overdueNoticeDelay || 'week',
      recurringReservations: recurringReservations || 'user',
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
        await lastValueFrom(this._resourceService.updateResourcesSettingsReservationGeneral(selectedResourceId, this.form.value));
        this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
      } catch (error) {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
      }
    }
  }
}
