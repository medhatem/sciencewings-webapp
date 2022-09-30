import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ProjectDropDone, ProjectListMember, UpdateProject } from 'app/models/projects/project';
import { constants } from 'app/shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { map } from 'rxjs';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { MemberProfileBodyDto } from 'generated/models';
import { OrganizationMembers } from 'app/models/members/member';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-project-general-settings',
  templateUrl: './project-general-settings.component.html',
  styleUrls: ['./project-general-settings.component.scss'],
})
export class ProjectGeneralSettingsComponent implements OnInit, AfterViewInit {
  @Input() projectResponsableId: any;
  id: any;
  orgId: any;
  projectList: any;
  managers: any[] = [];
  projectMember: any[] = [];
  currentProjectManager: any;
  projects: any[] = [];
  project: any;
  generalSettingstForm: FormGroup;
  list: any;
  constructor(
    private _projectService: ProjectService,
    private _memberService: MemberService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit(): Promise<void> {
    this.generalSettingstForm = this._formBuilder.group({
      title: [''],
      description: [''],
      key: [''],
      dateStart: [''],
      dateEnd: [''],
      newManager: [''],
    });

    this.id = localStorage.getItem(constants.CURRENT_PROJECT_ID);
    this.orgId = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    // this._projectService.getOrgProjectMembers().subscribe(({ body }) => {
    //   this.managers = body.data.map((m) => new ProjectListMember(m).member);
    // });
    // this.project = await lastValueFrom(this._projectService.getOrgProjectById(this.id).pipe(map(({ body }) => new ProjectDropDone(body))));
  }

  async ngAfterViewInit(): Promise<void> {
    this.project = await lastValueFrom(this._projectService.getOrgProjectById(this.id).pipe(map((r) => r.body)));
    this.projectMember = await lastValueFrom(this._projectService.getOrgProjectMembers(this.id).pipe(map((r) => r.body.data)));
    this.projectMember.map((m) => this.managers.push(m.member));

    this.currentProjectManager = this.projectMember.find((manager) => manager.member.user === this.projectResponsableId).member;
    this.generalSettingstForm.setValue({
      title: this?.project?.title || '',
      description: this?.project?.description || '',
      key: this?.project?.key || '',
      dateStart: this?.project?.dateStart || '',
      dateEnd: this?.project?.dateEnd || '',
      newManager: this.currentProjectManager.user || '',
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
