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
  project;
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
    this._projectService.getOrgProjectById(this.id).subscribe(({ body }) => {
      if (body.statusCode !== 200) {
        this._toastrService.showError('Something went wrong!');
        return;
      }
      this.project = new ProjectDropDone(body);
    });

    this._projectService.getOrgProjectMembers().subscribe(({ body }) => {
      this.managers = body.data.map((m) => new ProjectListMember(m).member);
    });
    console.log('this.managers =', this.managers);
    this.generalSettingstForm = this._formBuilder.group({
      title: [''],
      description: [''],
      key: [''],
      responsable: [],
      dateStart: [''],
      dateEnd: [''],
      status: [''],
      newManager: [''],
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
      this._toastrService.showSuccess(constants.CREATE_ORGANIZATION_COMPLETED);
      this._router.navigate(['/', constants.MODULES_ROUTINGS_URLS.PROJECT]);
    } catch (error) {
      this._toastrService.showError(constants.CREATE_ORGANIZATION_FAILED);
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
      ...this.project,
      ...this.generalSettingstForm.value,
    });
  }
}
