import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectListMember, ProjectMember } from 'app/models/projects/project';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project-membership-settings',
  templateUrl: './project-membership-settings.component.html',
  styleUrls: ['./project-membership-settings.component.scss'],
})
export class ProjectMembershipSettingsComponent implements OnInit {
  participants: any[] = [];
  options: ListOption = { columns: [], numnberOfColumns: 4 };
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
    this.options = {
      columns: [
        { columnName: 'ORGANIZATION.PROFILE', columnPropertyToUse: 'member', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.LIST.ROLE', columnPropertyToUse: 'role', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.LIST.PROJECT_STATUS', columnPropertyToUse: 'status', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.SETTINGS.JOINED_DATE', columnPropertyToUse: 'createdAt', customClass: '' },
      ],
      numnberOfColumns: 4,
      onElementClick: this.onElementSelected.bind(this),
    };
    this._projectService.projectParticipent$.pipe(takeUntil(this._unsubscribeAll)).subscribe((participants: ProjectListMember[]) => {
      this.participants = participants;
      this._changeDetectorRef.markForCheck();
    });
  }
  async onElementSelected(item: ProjectMember) {
    this._router.navigate(['/admin/organization-members/memberProfile']);
  }
  async printParticipants() {
    await console.log('members == ', this.participants);
  }
}
