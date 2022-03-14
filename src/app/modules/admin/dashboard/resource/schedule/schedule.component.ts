import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ResourceScheduleComponent implements OnInit {

    calendarOptions: CalendarOptions = {
        plugins: [listPlugin],
        initialView: 'listWeek',
        events: [
            {
                title: 'Meeting',
                start: new Date(),
                extendedProps: {
                    status: 'done'
                }
            },
            {
                title: 'Birthday Party',
                start: new Date(),
                backgroundColor: 'green',
                borderColor: 'green'
            }
        ],
    };

    constructor() { }

    ngOnInit(): void {
    }

}
