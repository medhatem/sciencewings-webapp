import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom, map } from 'rxjs';
import moment from 'moment';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/models';

@Component({
  selector: 'reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReservationDetailsComponent implements OnInit {
  resourceForm: FormGroup;
  submitted = false;
  start: string;
  end: string;
  user: User;
  userFullName: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ReservationDetailsComponent>,
    private _userService: UserService,
  ) {}

  async ngOnInit() {
    this.start = moment(this.data.event.start).format('DD-MM-YY hh:mm:ss').toString();
    this.end = moment(this.data.event.end).format('DD-MM-YY hh:mm:ss').toString();
    this.user = await this.fetchUser(this.data.event.extendedProps.data.userId || null);
    this.userFullName = this.user.firstname + ' ' + this.user.lastname;
  }

  async fetchUser(id: number): Promise<User> {
    return await lastValueFrom((this._userService.get(id) as any).pipe(map((user) => (user as any).body?.data[0])));
  }
  async deleteEvent() {
    await lastValueFrom(this._userService.delete(Number(this.data.event.id)) as any);
    this.matDialogRef.close(this.data.event.id);
  }
}
