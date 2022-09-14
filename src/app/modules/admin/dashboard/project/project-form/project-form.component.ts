import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { OrganizationMembers } from 'app/models/members/member';
import { ProjectLabels, ProjectLabelsTranslation } from 'app/models/projects/project-lables.enum';
import { ProjectType, ProjectTypeTrasnlation } from 'app/models/projects/project-type';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { constants } from 'app/shared/constants';
import { Router } from '@angular/router';
import { Project } from 'app/models/projects/project';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  @Input() project: any;
  @Input() deadline: any = {};

  projectForm: FormGroup;
  isInvitationPersonalize: boolean = false;
  projectTypesKeys = Object.keys(ProjectType).map((key) => key);
  projectType = ProjectType;
  projectTypeTrasnlation = ProjectTypeTrasnlation;
  labelsKeys = Object.keys(ProjectLabels);
  labels = ProjectLabels;
  labelsTranslation = ProjectLabelsTranslation;
  organizationMembers: OrganizationMembers[];
  managers: [] = [];
  participants: [] = [];

  constructor(
    public matDialogRef: MatDialogRef<ProjectFormComponent>,
    private _formBuilder: FormBuilder,
    private _projectService: ProjectService,

    private _toastrService: ToastrService,
    private _router: Router,
  ) {}

  ngOnInit() {
    const projectFormObj = {
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      key: ['', [Validators.required]],
    };

    this.projectForm = this._formBuilder.group(projectFormObj);
  }

  async onSubmit() {
    if (!this.projectForm.valid) {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
      return;
    }

    const project = this.getProjectFromFormBuilder();
    try {
      await this._projectService.createProject(project);
      this._toastrService.showSuccess(constants.CREATE_PROJECT_COMPLETED);
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.PROJECT]);
    } catch (error) {
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.PROJECT]);
      this._toastrService.showError(constants.CREATE_PROJECT_FAILED);
    }
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

  private getProjectFromFormBuilder(): Project {
    return new Project({ ...this.projectForm.value, organization: this.getOrganizationIdFromLocalStorage() });
  }

  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
}
