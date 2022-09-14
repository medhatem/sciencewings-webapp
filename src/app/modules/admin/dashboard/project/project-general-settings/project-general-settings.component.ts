import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ProjectDropDone, ProjectListMember, UpdateProject } from 'app/models/projects/project';
import { constants } from 'app/shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { OrganizationMembers } from 'app/models/members/member';
import { ProjectMemberDto } from 'generated/models';

@Component({
  selector: 'app-project-general-settings',
  templateUrl: './project-general-settings.component.html',
  styleUrls: ['./project-general-settings.component.scss'],
})
export class ProjectGeneralSettingsComponent implements OnInit {
  managers: any[] = [];
  projectList: ProjectListMember[] = [];
  project: ProjectDropDone;
  id;
  generalSettingstForm: FormGroup;
  @Input() deadline: any = {};

  constructor(
    private _projectService: ProjectService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _router: Router,
    private route: ActivatedRoute,
    private _memberService: MemberService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('this.id', this.id);
    this._projectService.getOrgProjectById(this.id).subscribe((c) => {
      console.log('body =========== ', c);
      this.project = new ProjectDropDone(c.body);
      console.log('this.project==', this.project);
    });

    this._projectService.getOrgProjectMembers().subscribe(({ body }) => {
      this.managers = body.data.map((m) => new ProjectListMember(m).member);
    });
    this.generalSettingstForm = this._formBuilder.group({
      title: [this?.project?.title || ''],
      description: [this?.project?.description || ''],
      key: [this?.project?.key || ''],
      dateStart: [this?.project?.dateStart || ''],
      dateEnd: [this?.project?.dateEnd || ''],
      newManager: [],
    });
  }
  async onSubmit() {
    if (!this.generalSettingstForm.valid) {
      this._toastrService.showWarning(constants.COMPLETING_FORM_REQUIRED);
      return;
    }
    const project = this.getProjectFromFormBuilder();
    try {
      await this._projectService.updateProject(project, this.id);
      await lastValueFrom(this._projectService.getAndParseOrganizationProjects());
      this._toastrService.showSuccess(constants.UPDATE_PROJECT_COMPLETED);
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.PROJECT]);
    } catch (error) {
      this._toastrService.showError(constants.UPDATE_PROJECT_FAILED);
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

  private getProjectFromFormBuilder(): UpdateProject {
    return new UpdateProject({
      title: this.generalSettingstForm.value?.title || this.project.title,
      description: this.generalSettingstForm.value?.description || this.project.description,
      key: this.generalSettingstForm.value?.key || this.project.key,
      dateStart: this.generalSettingstForm.value?.dateStart || this.project.dateStart,
      dateEnd: this.generalSettingstForm.value?.dateEnd || this.project.dateEnd,
      newManager: this.generalSettingstForm.value?.newManager,
    });
  }
}
