import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectType, ProjectTypeTrasnlation } from 'app/models/projects/project-type';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isInvitationPersonalize: boolean = false;
  projectTypesKeys = Object.keys(ProjectType).map((key) => key);
  projectType = ProjectType;
  projectTypeTrasnlation = ProjectTypeTrasnlation;

  constructor(public matDialogRef: MatDialogRef<ProjectFormComponent>, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.projectForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.name]],
      member: [''],
      number: [''],
      location: [''],
      description: [''],
      type: [''],
    });
  }
  /**
   *
   * Used to track for loops elements by either their id or index
   *
   * @param index index of the element to track
   * @param item to track
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
