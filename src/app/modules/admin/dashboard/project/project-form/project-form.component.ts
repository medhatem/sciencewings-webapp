import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { OrganizationMembers } from 'app/models/members/member';
import { ProjectLabels, ProjectLabelsTranslation } from 'app/models/projects/project-lables.enum';
import { ProjectType, ProjectTypeTrasnlation } from 'app/models/projects/project-type';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { constants } from 'app/shared/constants';
import { MatNativeDateModule } from '@angular/material/core';
import { Project } from 'app/models/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  encapsulation: ViewEncapsulation.None,
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
    private _ProjectService: ProjectService,
    private _toastrService: ToastrService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.getMembers();
    const projectFormObj = {
      title: ['', [Validators.required]],
      description: [''],
      managers: [],
      participants: [],
      dateStart: this.deadline.dateStart,
      dateEnd: this.deadline.dateEnd,
      active: false,
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
      await this._ProjectService.createProject(project);
      this._toastrService.showSuccess(constants.CREATE_PROJECT_COMPLETED);
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.ADMIN, constants.MODULES_ROUTINGS_URLS.LANDING_PAGE]);
    } catch (error) {
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
  checkDates(group: FormGroup) {
    if (group.controls.endDate.value < group.controls.startDate.value) {
      return { notValid: true };
    }
    return null;
  }
  private getMembers() {
    const idOrg = this.getOrganization();
    return this._ProjectService
      .getMembers(idOrg)
      .then((resolve) => (this.organizationMembers = resolve))
      .catch(() => {
        this._toastrService.showInfo('SWITCH_ORGANIZATIONS_LOAD_FAILED');
      });
  }
  private getProjectFromFormBuilder(): Project {
    return new Project({ ...this.projectForm.value, organization: this.getOrganization() });
  }
  private getOrganization(): number {
    return Number(localStorage.getItem(constants.USER_ORGANIZATION_ID));
  }
}
