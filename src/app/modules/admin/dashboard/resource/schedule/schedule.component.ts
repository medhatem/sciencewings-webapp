import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { lastValueFrom, map } from 'rxjs';

import { Reservation } from 'app/models/reservation/Reservation';
import { ReservationService } from 'app/modules/admin/resolvers/reservation/reservation.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ResourceScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    // themeSystem: 'litera',
    // selectable: true,
    // headerToolbar: {
    //   left: 'l,c,r',
    //   //   right: 'custom2 prevYear,prev,next,nextYear',
    // },
    // customButtons: {
    //   l: {
    //     text: 'Past',
    //     click: () => {
    //       this.calendarOptions.events = this.allEvents.filter((event) => this.diffDates(event.start) === -1);
    //     },
    //   },
    //   c: {
    //     text: 'Current',
    //     click: () => {
    //       this.calendarOptions.events = this.allEvents.filter((event) => this.diffDates(event.start) === 0);
    //     },
    //   },
    //   r: {
    //     text: 'Upcoming',
    //     click: () => {
    //       this.calendarOptions.events = this.allEvents.filter((event) => this.diffDates(event.start) === 1);
    //     },
    //   },
    // },
    // eventDidMount: (mountAg: EventMountArg) => {
    //   const checkbox = this.renderer.createElement('input');
    //   checkbox.type = 'checkbox';
    //   checkbox.setAttribute('id', mountAg.event._def.publicId);
    //   checkbox.setAttribute('style', 'margin-top: 14px;');
    //   mountAg.el.appendChild(checkbox);
    //   this.renderer.listen(checkbox, 'change', ({ target }) => {
    //     if (target.checked) {
    //       this.selectedEvents.push(target.id);
    //     } else {
    //       this.selectedEvents.splice(this.selectedEvents.indexOf(target.id), 1);
    //     }
    //   });
    // },
    eventClick: function (info) {
      alert('Event: ' + info.event.title);
      alert('Event: ' + info.event.id);

      // change the border color just for fun
      info.el.style.borderColor = 'red';
    },
    events: [],
  };

  resources = [];

  constructor(
    private _reservationService: ReservationService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}
  async ngAfterViewInit(): Promise<void> {
    await this.getSchedule();
  }

  async ngOnInit(): Promise<void> {}

  onCheckboxChange($event) {}

  async getSchedule() {
    const { activeStart, activeEnd } = this.calendarComponent.getApi().view;
    const reservations = await lastValueFrom(
      this._reservationService.getReservations(7, new Date(activeStart).toISOString(), new Date(activeEnd).toISOString()).pipe(
        map((reservations) =>
          reservations.body?.data.map((res) => {
            return new Reservation((res as any) || {});
          }),
        ),
      ),
    );

    reservations.map((r) => {
      this.calendarComponent.getApi().addEvent({
        start: new Date(r.start).toISOString(),
        end: new Date(r.end).toISOString(),
      });
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
