import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ResourceProfileFormComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  form!: FormGroup;
  btnTitle: string = 'Add';
  params: any;
  calendarOptions: CalendarOptions = {
    selectable: true,
    initialView: 'dayGridMonth',
    // dateClick: this.handleDateClick.bind(this), // bind is important!
    select: this.handleDateClick.bind(this),
    events: [],
  };

  private resource;
  private _selectedStartDate;
  private _selectedEndDate;
  private _selectedTitleDate = 'calendar name';

  constructor(
    private route: ActivatedRoute,
    private _resourceService: ResourceService,
    private fb: FormBuilder,
    private _toastrService: ToastrService,
  ) {
    this.route.params.subscribe((params) => {
      this.params = params;
      this.btnTitle = params.id === 'create' ? 'Add' : 'Update';
    });
  }

  handleDateClick(arg) {
    const title = prompt('Event Title:');
    if (title) {
      this.calendarComponent.getApi().addEvent({
        title: title,
        start: arg.start,
        end: arg.end,
        allDay: arg.allDay,
      });
    }
    this.calendarComponent.getApi().unselect();
    // this._selectedStartDate = arg.startStr;
    // this._selectedEndDate = arg.endStr;
    // console.log({
    //   startStr: this._selectedStartDate,
    //   endStr: this._selectedEndDate,
    // });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: '',
      timeEfficiency: '',
      timezone: '',
    });
    if (this.params.id !== 'create') {
      this._resourceService.getResource(this.params.id).subscribe(({ statusCode, body, errorMessage }) => {
        if (statusCode === 500) {
          this._toastrService.showError(errorMessage, 'Something went wrong!');
        }
        this.form.setValue({
          name: body.name,
          timeEfficiency: body.timeEfficiency,
          timezone: body.timezone,
        });
        this.resource = body.resources;
      });
    }
  }

  onSubmit() {
    const _events = this.calendarComponent.getApi().getEvents();
    const events = _events.map((event) => ({ dateFrom: event.start, dateTo: event.end, title: event.title }));

    const timezone = new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];

    const _resource = {
      name: this.form.value.name,
      timeEfficiency: this.form.value.timeEfficiency,
      timezone: this.form.value.timezone,
      active: true,
      organization: 1,
      user: 1,
    };
    if (this.params.id === 'create') {
      console.log('Creating...');
      this._resourceService
        .createResource({
          ..._resource,
          resourceType: 'USER',
          calendar: { name: this._selectedTitleDate, timezone },
          events,
        })
        .subscribe((response) => {
          console.log({ response });
        });
    } else {
      console.log('Updating...');
      this._resourceService
        .updateResource(this.params.id, {
          ...this.resource,
          ..._resource,
        })
        .subscribe((response) => {
          console.log({ response });
        });
    }
  }
}
