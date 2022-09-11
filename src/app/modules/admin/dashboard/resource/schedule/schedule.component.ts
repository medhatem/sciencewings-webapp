import { ChangeDetectorRef, Component, Renderer2, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { EventMountArg } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';

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
      left: 'l,c,r',
      //   right: 'custom2 prevYear,prev,next,nextYear',
    },
    customButtons: {
      l: {
        text: 'Past',
        click: () => {
          this.calendarOptions.events = this.allEvents.filter((event) => this.diffDates(event.start) === -1);
        },
      },
      c: {
        text: 'Current',
        click: () => {
          this.calendarOptions.events = this.allEvents.filter((event) => this.diffDates(event.start) === 0);
        },
      },
      r: {
        text: 'Upcoming',
        click: () => {
          this.calendarOptions.events = this.allEvents.filter((event) => this.diffDates(event.start) === 1);
        },
      },
    },
    eventDidMount: (mountAg: EventMountArg) => {
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
      });
    },
    events: [],
  };

  resources = [];
  private selectedEvents = [];
  private allEvents = [
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
      start: new Date('2022-03-21T07:00:00.000+01:00'),
      end: new Date('2022-03-21T07:12:00.000+01:00'),
      backgroundColor: 'green',
      borderColor: 'green',
      id: '2',
    },
    {
      title: 'FUTURE',
      start: new Date('2022-03-23T07:00:00.000+01:00'),
      end: new Date('2022-03-23T11:00:00.000+01:00'),
      backgroundColor: 'red',
      borderColor: 'green',
      id: '3',
    },
  ];

  constructor(
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this._resourceService.getOrgResource().subscribe(({ statusCode, body, errorMessage }) => {
      if (statusCode === 500) {
        this._toastrService.showError(errorMessage, constants.SOMETHING_WENT_WRONG);
      }
      this.resources = body.resources;
      const events = [];
      body.resources.map((resource, i: number) => {
        resource.calendar.events.map((event) => {
          events.push({
            start: event.dateFrom,
            end: event.dateTo,
            title: event.title,
          });
        });
      });

      this.calendarComponent.getApi().addEvent(events);
      this.calendarOptions.events = this.allEvents;
    });
  }

  onCheckboxChange($event) {}

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
