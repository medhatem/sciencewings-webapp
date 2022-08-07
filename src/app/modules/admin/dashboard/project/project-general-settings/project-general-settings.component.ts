import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-general-settings',
  templateUrl: './project-general-settings.component.html',
  styleUrls: ['./project-general-settings.component.scss'],
})
export class ProjectGeneralSettingsComponent implements OnInit {
  generalSettingstForm: FormGroup;
  @Input() deadline: any = {};

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.generalSettingstForm = this._formBuilder.group({
      name: ['Brian Hughes'],
      key: ['Project identifier'],
      responsable: ['manager'],
      dateStart: [this.deadline.dateStart, [Validators.required]],
      dateEnd: [this.deadline.dateEnd, [Validators.required]],
      status: ['to-do'],
      description: ['project descrition'],
    });
  }
}
