import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'organization-settings-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  @Input() settings: any;
  @Output() updateLocalSettings = new EventEmitter<string>();
  form: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private organizationService: AdminOrganizationsService,
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      approversCanEditReservations: false,
      requireReasonWhenEditingReservation: false,
      hideOrganizationCalendar: false,
      hideAccountNumberWhenMakingReservation: false,
      showResourceImagesInReservation: false,
      confirmationEmailWhenMakingReservation: '',
      attachedIcsCalendarFeeds: false,
      emailAddressToReceiveReservationReplyMessages: '',
    });
    this.form.setValue({
      approversCanEditReservations: this.form.value.approversCanEditReservations,
      requireReasonWhenEditingReservation: this.form.value.requireReasonWhenEditingReservation,
      hideOrganizationCalendar: this.form.value.hideOrganizationCalendar,
      hideAccountNumberWhenMakingReservation: this.form.value.hideAccountNumberWhenMakingReservation,
      showResourceImagesInReservation: this.form.value.showResourceImagesInReservation,
      confirmationEmailWhenMakingReservation: this.form.value.confirmationEmailWhenMakingReservation,
      attachedIcsCalendarFeeds: this.form.value.attachedIcsCalendarFeeds,
      emailAddressToReceiveReservationReplyMessages: this.form.value.emailAddressToReceiveReservationReplyMessages,
    });
  }

  onSubmit() {
    const data = { ...this.form.value };

    this.organizationService.updateOrganizationsSettingsProperties(1, data).subscribe((response) => {
      if (response.body.statusCode === 204) {
        this.updateLocalSettings.emit(this.form.value);
        this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
      } else {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
      }
    });
  }
}
