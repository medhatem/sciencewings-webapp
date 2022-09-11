import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { lastValueFrom, map } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from 'app/models/reservation/Reservation';
import { ReservationDetailsComponent } from './reservationDetails/reservation-details.component';
import { ReservationService } from 'app/modules/admin/resolvers/reservation/reservation.service';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ResourceScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  openedDialogRef: any;

  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    customButtons: {
      next: {
        click: () => {
          this.handleNextClick();
        },
      },
      prev: {
        click: () => {
          this.handlePreviousClick();
        },
      },
    },

    eventClick: (info) => {
      this.displayReservationDetails(info.event);
    },
    events: [],
  };

  resources = [];

  constructor(private _reservationService: ReservationService, private route: ActivatedRoute, private _matDialog: MatDialog) {}
  async ngAfterViewInit(): Promise<void> {
    await this.getSchedule();
  }

  async ngOnInit(): Promise<void> {
    this.calendarOptions.events = [];
  }

  onCheckboxChange($event) {}

  async handleNextClick() {
    const api = this.calendarComponent.getApi();
    api.next();
    await this.getSchedule();
  }
  async handlePreviousClick() {
    const api = this.calendarComponent.getApi();
    api.prev();
    await this.getSchedule();
  }

  async getSchedule() {
    const { activeStart, activeEnd } = this.calendarComponent.getApi().view;
    const reservations = await lastValueFrom(
      this._reservationService
        .getReservations(Number(this.route.snapshot.paramMap.get('id')), new Date(activeStart).toISOString(), new Date(activeEnd).toISOString())
        .pipe(
          map((reservations) =>
            reservations.body?.data.map((res) => {
              return new Reservation((res as any) || {});
            }),
          ),
        ),
    );
    this.calendarOptions.events = reservations.map((r) => {
      return {
        start: new Date(r.start).toISOString(),
        end: new Date(r.end).toISOString(),
        id: r.id,
        title: r.title,
      };
    });
  }

  displayReservationDetails(event: any) {
    this.openedDialogRef = this._matDialog.open(ReservationDetailsComponent, event);
    this.openedDialogRef.afterClosed().subscribe(async (result) => {
      // const { body } = await lastValueFrom(this._resourceService.getOrgResource());
      // this.resources = body.data;
    });
  }

  // -1: past, 0: today, 1: future
  // https://stackoverflow.com/questions/2698725/comparing-date-part-only-without-comparing-time-in-javascript#answer-55782480
  diffDates(date: Date) {
    if (new Date().toISOString().split('T')[0] === date.toISOString().split('T')[0]) {
      return 0;
    } else if (new Date().toISOString().split('T')[0] > date.toISOString().split('T')[0]) {
      return -1;
    } else {
      return 1;
    }
  }
}
