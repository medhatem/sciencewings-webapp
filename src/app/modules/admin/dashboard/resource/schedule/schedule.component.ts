import { ChangeDetectorRef, Component, Renderer2, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { EventMountArg } from '@fullcalendar/core';
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
    themeSystem: 'litera',
    selectable: true,
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay custom1',
      right: 'custom2 prevYear,prev,next,nextYear',
    },
    eventDidMount: (mountAg: EventMountArg) => {
      console.log({ mountAg });

      const checkbox = this.renderer.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.setAttribute('id', mountAg.event._def.publicId);
      checkbox.setAttribute('style', 'margin-top: 14px;');
      mountAg.el.appendChild(checkbox);
      this.renderer.listen(checkbox, 'change', ({ target }) => {
        if (target.checked) {
          this.selectedEvents.push(target.id);
        } else {
          this.selectedEvents.splice(this.selectedEvents.indexOf(target.id), 1);
        }
        console.log(this.selectedEvents);
      });
    },
    events: [
      {
        title: 'PAST',
        start: new Date('2022-03-18T14:00:00.000+01:00'),
        end: new Date('2022-03-18T20:00:00.000+01:00'),
        id: '1',
        extendedProps: {
          status: 'done',
          eventID: 1,
        },
      },
      {
        title: 'TODAY - MORNING',
        start: new Date('2022-03-19T07:00:00.000+01:00'),
        end: new Date('2022-03-19T07:12:00.000+01:00'),
        backgroundColor: 'green',
        borderColor: 'green',
        id: '2',
      },
      {
        title: 'TODAY - NOW',
        start: new Date('2022-03-19T19:00:00.000+01:00'),
        end: new Date('2022-03-19T21:00:00.000+01:00'),
        backgroundColor: 'green',
        borderColor: 'green',
        id: '2',
      },
      {
        title: 'TODAY - LATE',
        start: new Date('2022-03-19T22:00:00.000+01:00'),
        end: new Date('2022-03-19T23:00:00.000+01:00'),
        backgroundColor: 'green',
        borderColor: 'green',
        id: '2',
      },
      {
        title: 'FUTURE',
        start: new Date('2022-03-20T07:00:00.000+01:00'),
        end: new Date('2022-03-20T11:00:00.000+01:00'),
        backgroundColor: 'red',
        borderColor: 'green',
        id: '3',
      },
    ],
  };

  resources = [];
  private selectedEvents = [];
  constructor(private _resourceService: ResourceService, private _toastrService: ToastrService, private _changeDetectorRef: ChangeDetectorRef, private renderer: Renderer2) {}

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

  onCheckboxChange($event) {
    console.log($event);
  }
}
