import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-resource-setting-reservation-time-restriction',
  templateUrl: './resource-setting-reservation-time-restriction.component.html',
  styleUrls: ['./resource-setting-reservation-time-restriction.component.scss'],
})
export class ResourceSettingReservationTimeRestrictionComponent implements OnInit {
  @Input() settings: any;
  @Output() updateLocalSettings = new EventEmitter<string>();
  form: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
  ) {}
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      isEditingWindowForUsers: false,
      isRestrictCreatingNewReservationBeforeTime: false,
      isRestrictCreatingNewReservationAfterTime: false,
      reservationTimeGranularity: '',
      isAllowUsersToEndReservationEarly: false,
      defaultReservationDuration: '',
      reservationDurationMinimum: '',
      reservationDurationMaximum: '',
      bufferTimeBeforeReservation: '',
    });

    this.form.setValue({
      isEditingWindowForUsers: this.settings?.isEditingWindowForUsers || false,
      isRestrictCreatingNewReservationBeforeTime: this.settings?.isRestrictCreatingNewReservationBeforeTime || false,
      isRestrictCreatingNewReservationAfterTime: this.settings?.isRestrictCreatingNewReservationAfterTime || false,
      reservationTimeGranularity: this.settings?.reservationTimeGranularity || '',
      isAllowUsersToEndReservationEarly: this.settings?.isAllowUsersToEndReservationEarly || false,
      defaultReservationDuration: this.settings?.defaultReservationDuration || '',
      reservationDurationMinimum: this.settings?.reservationDurationMinimum || '',
      reservationDurationMaximum: this.settings?.reservationDurationMaximum || '',
      bufferTimeBeforeReservation: this.settings?.bufferTimeBeforeReservation || '',
    });
  }

  onSubmit() {
    const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
    this._resourceService.updateResourceSettingsReservationTimeRestriction(selectedResourceId, this.form.value).subscribe((result) => {
      if (result.body.statusCode === 204) {
        this.updateLocalSettings.emit(this.form.value);
        this._toastrService.showSuccess('Updated Successfully');
      } else {
        this._toastrService.showError('Something went wrong!');
      }
    });
  }
}
