import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resource } from 'app/models/resources/resource';
import { User } from 'app/models';
import { UserService } from 'app/core/user/user.service';
import { constants } from 'app/shared/constants';
import { lastValueFrom, map } from 'rxjs';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ReservationService } from 'app/modules/admin/resolvers/reservation/reservation.service';
import { Reservation } from 'app/models/reservation/Reservation';
import moment from 'moment';
@Component({
  selector: 'reservation-creation',
  templateUrl: './reservation-creation.component.html',
  styleUrls: ['./reservation-creation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReservationCreationComponent implements OnInit {
  public formGroup: FormGroup;
  resourceForm: FormGroup;
  submitted = false;
  duration: string = '';
  resource: Resource;
  currentUser: User;
  userCompleteName: string;
  errorMessage: string = '';
  datePickerOption = {
    minDate: new Date().toString(),
    disabled: false,
    hideTime: false,
    disableMinute: false,
    touchUi: false,
    color: 'red',
    enableMeridian: true,
    stepMinute: 1,
    stepSecond: 1,
    stepHour: 1,
    showSpinners: true,
    showSeconds: true,
  };
  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ReservationCreationComponent>,
    public _userService: UserService,
    private _toastrService: ToastrService,
    private _reservationService: ReservationService,
  ) {}

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      title: ['', [Validators.required]],
    });
    this.formGroup.valueChanges.subscribe((value) => {
      const { dateStart, dateEnd } = value;
      if (!dateStart || !dateEnd) {
        return;
      }
      this.duration = this.calculateDuration(dateStart, dateEnd);
    });
    this.resource = this.data.resource;
    this.fetchUser();
  }

  async fetchUser() {
    const userId = Number(localStorage.getItem(constants.CURRENT_USER_ID));
    this.currentUser = await lastValueFrom((this._userService.get(userId) as any).pipe(map((user) => (user as any).body?.data[0])));
    this.userCompleteName = this.currentUser.firstname + ' ' + this.currentUser.lastname;
  }

  async createEvent() {
    if (this.errorMessage) {
      this._toastrService.showError(this.errorMessage);
      return;
    }
    const { dateStart, dateEnd, title } = this.formGroup.value;
    const reservation = new Reservation({ title, end: dateEnd, start: dateStart, userId: this.currentUser.id });
    const event = await lastValueFrom(this._reservationService.create(this.resource.id, reservation).pipe(map((res) => res)));
    this.matDialogRef.close(event);
  }

  /**
   * calculate the duration between two dates
   * in days , hours and minutes
   *
   * Validate also if the end date comes after the start date
   *
   */
  calculateDuration(start: Date, end: Date) {
    const startDate = moment(start).tz('utc').toDate();
    const endDate = moment(end).tz('utc').toDate();

    if (endDate <= start) {
      this.errorMessage = constants.INVALID_RESERVATION;
      this._toastrService.showError(this.errorMessage);

      return;
    }

    if (start < new Date()) {
      this.errorMessage = constants.INVALID_RESERVATION_PAST;
      this._toastrService.showError(this.errorMessage);
      return;
    }
    let diffInMilliSeconds = Math.abs(startDate.valueOf() - endDate.valueOf()) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    if (hours <= 0) {
      this.errorMessage = constants.INVALID_RESERVATION_DURATION_LIMIT;
      this._toastrService.showError(this.errorMessage);
      return;
    }

    let difference = '';
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `;
    }

    difference += hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

    difference += minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`;
    if (this.errorMessage) {
      this.errorMessage = '';
    }
    return difference;
  }
}
