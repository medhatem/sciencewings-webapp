import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ResourceScheduleComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    plugins: [listPlugin],
    initialView: 'listWeek',
    events: [
      {
        title: 'Meeting',
        start: new Date(),
        extendedProps: {
          status: 'done',
        },
      },
      {
        title: 'Birthday Party',
        start: new Date(),
        backgroundColor: 'green',
        borderColor: 'green',
      },
      {
        title: 'Birthday Party II',
        start: new Date(),
        backgroundColor: 'red',
        borderColor: 'green',
      },
    ],
  };

  resources = [];

  constructor(
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._resourceService.getOrgResource().subscribe(({ statusCode, body, errorMessage }) => {
      if (statusCode === 500) {
        this._toastrService.showError(errorMessage, 'Something went wrong!');
      }
      this.resources = body.resources;
      const events = [];
      const backgroundColors = ['red', 'green', 'blue'];
      body.resources.map((resource, i: number) => {
        resource.calendar.events.map((event) => {
          events.push({
            start: event.dateFrom,
            end: event.dateTo,
            title: event.title,
          });
        });
      });
      console.log({ events });

      this.calendarComponent.getApi().addEvent(events);
      this.calendarOptions.events = events;
    });
  }
}
