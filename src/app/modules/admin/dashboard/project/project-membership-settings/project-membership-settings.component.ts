import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectListMember, ProjectMember } from 'app/models/projects/project';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { ListOption } from '../../reusable-components/list/list-component.component';

@Component({
  selector: 'app-project-membership-settings',
  templateUrl: './project-membership-settings.component.html',
  styleUrls: ['./project-membership-settings.component.scss'],
})
export class ProjectMembershipSettingsComponent implements OnInit {
  members: any[] = [];
  options: ListOption = { columns: [], numnberOfColumns: 4 };
  openedDialogRef: any;

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
        { columnName: 'Profile', columnPropertyToUse: 'member', customClass: '' },
        { columnName: 'Role', columnPropertyToUse: 'role', customClass: '' },
        { columnName: 'Status', columnPropertyToUse: 'status', customClass: '' },
      ],
      numnberOfColumns: 3,
      onElementClick: this.onElementSelected.bind(this),
    };
    this._projectService.projectParticipent$.subscribe((members: ProjectListMember[]) => {
      this.members = members;
      this._changeDetectorRef.markForCheck();
    });
  }
  async onElementSelected(item: ProjectMember) {
    this._router.navigate(['/admin/organization-members/memberProfile']);
  }
}
