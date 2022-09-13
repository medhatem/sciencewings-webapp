import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { lastValueFrom, map } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from 'app/models/reservation/Reservation';
import { ReservationCreationComponent } from './reservationCreation/reservation-creation.component';
import { ReservationDetailsComponent } from './reservationDetails/reservation-details.component';
import { ReservationService } from 'app/modules/admin/resolvers/reservation/reservation.service';
import { Resource } from 'app/models/resources/resource';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ResourceScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  eventDetailsDialogRef: any;
  createEventDialogRef: any;
  resource: Resource;
  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    handleWindowResize: true,
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

  constructor(
    private _reservationService: ReservationService,
    private route: ActivatedRoute,
    private _matDialog: MatDialog,
    private _resourceService: ResourceService,
  ) {}
  async ngAfterViewInit(): Promise<void> {
    await this.getSchedule();
  }

  async ngOnInit(): Promise<void> {
    this.calendarOptions.events = [];
    await this.getResource();
  }

  onCheckboxChange($event) {}

  /**
   * display next week's schedule
   */
  async handleNextClick() {
    const api = this.calendarComponent.getApi();
    api.next();
    await this.getSchedule();
  }

  /**
   * display previous week's schedule
   */
  async handlePreviousClick() {
    const api = this.calendarComponent.getApi();
    api.prev();
    await this.getSchedule();
  }

  /**
   * get a resource's schedule for the current displayed week
   */
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

  /**
   * display the reservation details
   *
   * @param event
   */
  displayReservationDetails(event: any) {
    this.eventDetailsDialogRef = this._matDialog.open(ReservationDetailsComponent, { data: { event } });
    this.eventDetailsDialogRef.afterClosed().subscribe(async (result) => {
      // const { body } = await lastValueFrom(this._resourceService.getOrgResource());
      // this.resources = body.data;
    });
  }

  /**
   * trigger the modal for a reservation creation
   */
  createReservation() {
    this.createEventDialogRef = this._matDialog.open(ReservationCreationComponent, { data: { resource: this.resource } });
    this.createEventDialogRef.afterClosed().subscribe(async (result) => {
      const event = {
        title: result.title,
        start: new Date(result.start).toISOString(),
        end: new Date(result.end).toISOString(),
      };

      console.log('received ---- ', event);
      this.calendarComponent.getApi().addEvent(event);
      // const { body } = await lastValueFrom(this._resourceService.getOrgResource());
      // this.resources = body.data;
    });
  }

  /**
   * get the resource data from db
   */
  async getResource() {
    this.resource = await lastValueFrom(
      this._resourceService.getResource(Number(this.route.snapshot.paramMap.get('id'))).pipe(map((resource) => resource.body?.data[0])),
    );
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
