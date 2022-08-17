import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { Project } from 'app/models/projects/project';

@Component({
  selector: 'app-project-general-settings',
  templateUrl: './project-general-settings.component.html',
  styleUrls: ['./project-general-settings.component.scss'],
})
export class ProjectGeneralSettingsComponent implements OnInit {
  project;
  generalSettingstForm: FormGroup;
  @Input() deadline: any = {};

  constructor(private _projectService: ProjectService, private _formBuilder: FormBuilder, private _toastrService: ToastrService) {}

  ngOnInit(): void {
    this._projectService.getOrgProjectById().subscribe(({ body }) => {
      if (body.statusCode !== 200) {
        this._toastrService.showError('Something went wrong!');
        return;
      }
      this.project = new Project(body);
    });

    this.generalSettingstForm = this._formBuilder.group({
      name: [this.project.title],
      key: [''],
      responsable: ['manager'],
      dateStart: [this.deadline.dateStart, [Validators.required]],
      dateEnd: [this.deadline.dateEnd, [Validators.required]],
      status: ['to-do'],
      description: ['project descrition'],
    });
  }
}
