import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, EventClickArg, FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'calendar-profile',
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  events: any[] = [];
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.onDateClick.bind(this),
    // Example :
    events: [
      { title: 'event 1', date: '2022-02-24', textColor: 'black' },
      { title: 'event 2', date: '2022-02-20' },
      { title: 'event 3', date: '2022-02-20' },
      { title: 'event 4', date: '2022-02-22', allDay: true, editable: true },
    ],
    eventClick: this.eventClick,
  };
  constructor() {}

  onDateClick(res: any) {
    // To Do
    // On click open a modal with the date clicked on
    // in the modal we can set new event or modify or view or delete
    alert('Clicked on date : ' + res.dateStr);
  }

  // Example of fullCalendar options
  eventClick(event: EventClickArg) {
    alert('event : ' + event);
  }

  ngOnInit() {
    // To Do
    setTimeout(() => {
      // return get events .subscribe((res: any) => {
      //   this.Events.push(res);
      //   console.log(this.Events);
      // });
    }, 2200);
  }
}
