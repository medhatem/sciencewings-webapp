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
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
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
  calendarOptions: CalendarOptions = {};

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
    this.calendarOptions = {
      plugins: [timeGridPlugin, dayGridPlugin],
      initialView: 'timeGridWeek',
      handleWindowResize: true,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek,monthView',
      },
      views: {
        monthView: {
          type: 'dayGridMonth',
        },
      },
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
    };
    await this.getResource();
  }

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
        .pipe(map((r) => r.body?.data.map((res) => new Reservation((res as any) || {})))),
    );
    this.calendarComponent.getApi().removeAllEvents();
    this.calendarOptions.events =
      reservations.map((r) => ({
        start: moment(r.start).tz('utc').toISOString(),
        end: moment(r.end).tz('utc').toISOString(),
        id: r.id,
        title: r.title,
        data: {
          userId: r.userId,
        },
      })) || [];
  }

  /**
   * display the reservation details
   *
   * @param event
   */
  displayReservationDetails(event: any) {
    this.eventDetailsDialogRef = this._matDialog.open(ReservationDetailsComponent, { data: { event } });
    this.eventDetailsDialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.getSchedule();
      }
    });
  }

  /**
   * trigger the modal for a reservation creation
   */
  createReservation() {
    this.createEventDialogRef = this._matDialog.open(ReservationCreationComponent, { data: { resource: this.resource } });
    this.createEventDialogRef.afterClosed().subscribe(async (result) => {
      const event = {
        id: result.body.id,
        title: result.body.title,
        start: moment(result.body.start).tz('utc').toISOString(),
        end: moment(result.body.end).tz('utc').toISOString(),
        data: {
          userId: result.body.userId,
        },
      };
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
      this._resourceService.getResource(Number(this.route.snapshot.paramMap.get('id'))).pipe(map((resource) => resource.body)),
    );
  }
}
