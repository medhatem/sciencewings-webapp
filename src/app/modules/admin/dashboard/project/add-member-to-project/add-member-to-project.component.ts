import { Component, Input, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { OrganizationMembers } from 'app/models/members/member';
import { ProjectLabels, ProjectLabelsTranslation } from 'app/models/projects/project-lables.enum';
import { ProjectType, ProjectTypeTrasnlation } from 'app/models/projects/project-type';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { constants } from 'app/shared/constants';
import { Router } from '@angular/router';
import { Project, ProjectListMember } from 'app/models/projects/project';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { projectMember } from 'app/models/projects/project-member';

@Component({
  selector: 'app-add-member-to-project',
  templateUrl: './add-member-to-project.component.html',
  styleUrls: ['./add-member-to-project.component.scss'],
})
export class AddMemberToProjectComponent implements OnInit {
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
  members: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { orgID: number; projectId: number },
    public matDialogRef: MatDialogRef<AddMemberToProjectComponent>,
    private _formBuilder: FormBuilder,
    private _projectService: ProjectService,
    private _memberService: MemberService,
    private _toastrService: ToastrService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this._memberService.getOrgMembers().subscribe(({ body }) => {
      this.members = body.data.map((member) => new OrganizationMembers(member));
    });

    const projectFormObj = {
      member: ['', [Validators.required]],
      role: ['', [Validators.required]],
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
      await this._projectService.addMemberToProject(this.data.projectId, project as projectMember);
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

  private getProjectFromFormBuilder(): projectMember {
    return new projectMember({
      orgId: Number(this.data.orgID),
      role: this.projectForm.value.role,
      userId: Number(this.projectForm.value.member),
    });
  }
}
