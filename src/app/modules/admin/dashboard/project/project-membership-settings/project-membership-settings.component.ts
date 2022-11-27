import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectListMember, ProjectMember } from 'app/models/projects/project';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { constants } from 'app/shared/constants';
import { AddMemberToProjectComponent } from '../add-member-to-project/add-member-to-project.component';

@Component({
  selector: 'app-project-membership-settings',
  templateUrl: './project-membership-settings.component.html',
  styleUrls: ['./project-membership-settings.component.scss'],
})
export class ProjectMembershipSettingsComponent implements OnInit {
  @Input() id: number;

  participants: any[] = [];
  options: ListOption = { columns: [] };
  openedDialogRef: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _projectService: ProjectService,
    private _matDialog: MatDialog,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._projectService.getAndParseProjectParticipants().subscribe((participant: ProjectListMember[]) => {
      this.participants = participant;
      this._changeDetectorRef.markForCheck();
    });

    this.options = {
      columns: [
        { columnName: 'ORGANIZATION.PROFILE', columnPropertyToUse: 'member', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.LIST.ROLE', columnPropertyToUse: 'role', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.LIST.PROJECT_STATUS', columnPropertyToUse: 'status', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.SETTINGS.JOINED_DATE', columnPropertyToUse: 'createdAt', customClass: '' },
      ],

      onElementClick: this.onElementSelected.bind(this),
    };
  }
  openInviteProjectDialog(): void {
    const orgID = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    const projectId = this.id;
    this.openedDialogRef = this._matDialog.open(AddMemberToProjectComponent, {
      data: { orgID, projectId },
    });
    this.openedDialogRef.afterClosed().subscribe((result) => {
      lastValueFrom(this._projectService.getAndParseOrganizationProjects());
    });
  }

  async onElementSelected(item: ProjectMember) {
    this._router.navigate(['/project/project-settings']);
  }
}
