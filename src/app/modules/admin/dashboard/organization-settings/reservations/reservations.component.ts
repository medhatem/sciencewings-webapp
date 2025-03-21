import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { UpdateOrganizationReservationSettingsRo } from 'app/models/organizations/organization';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';
import { constants } from 'app/shared/constants';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'organization-settings-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit, AfterViewInit {
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
      approversCanEditReservations: [],
      attachedIcsCalendarFeeds: [],
      confirmationEmailWhenMakingReservation: [],
      emailAddressToReceiveReservationReplyMessages: [],
      hideAccountNumberWhenMakingReservation: [],
      hideOrganizationCalendar: [],
      requireReasonWhenEditingReservation: [],
      showResourceImagesInReservation: [],
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.form.setValue({
      approversCanEditReservations: this.settings.approversCanEditReservations,
      requireReasonWhenEditingReservation: this.settings.requireReasonWhenEditingReservation,
      hideOrganizationCalendar: this.settings.hideOrganizationCalendar,
      hideAccountNumberWhenMakingReservation: this.settings.hideAccountNumberWhenMakingReservation,
      showResourceImagesInReservation: this.settings.showResourceImagesInReservation,
      confirmationEmailWhenMakingReservation: this.settings.confirmationEmailWhenMakingReservation,
      attachedIcsCalendarFeeds: this.settings.attachedIcsCalendarFeeds,
      emailAddressToReceiveReservationReplyMessages: this.settings.emailAddressToReceiveReservationReplyMessages,
    });
  }

  async onSubmit() {
    const orgId = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    const data = { ...this.form.value };
    const updatedReservationSettings = this.getUpdatedSettingsFromFormBuilder();

    try {
      await lastValueFrom(this.organizationService.updateOrganizationsSettingsProperties(Number(orgId), data));
      await this.organizationService.updateOrganizationReservationProperties(Number(orgId), updatedReservationSettings);
      this.updateLocalSettings.emit(this.form.value);
      this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
    } catch (error) {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
  }

  private getUpdatedSettingsFromFormBuilder(): UpdateOrganizationReservationSettingsRo {
    return new UpdateOrganizationReservationSettingsRo({ ...this.form.value });
  }
}
