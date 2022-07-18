import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { lastValueFrom } from 'rxjs';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Project } from 'app/models/projects/project';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  options: ListOption = { columns: [], numnberOfColumns: 5 };
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
        { columnName: 'Title', columnPropertyToUse: 'title' },
        { columnName: 'Managers', columnPropertyToUse: 'managers', columnType: 'Array' },
        { columnName: 'Date start', columnPropertyToUse: 'dateStart' },
        { columnName: 'ACTIVE', columnPropertyToUse: 'active' },
      ],
      numnberOfColumns: 4,
      onElementClick: this.onElementSelected.bind(this),
    };

    this._projectService.projects$.subscribe((projects: Project[]) => {
      this.projects = projects;
      this._changeDetectorRef.markForCheck();
    });
  }

  openInviteProjectDialog(): void {
    const orgID = localStorage.getItem(constants.CURRENT_ORGANIZATION_ID);
    if (!orgID) {
      this._toastrService.showError('Something went wrong!');
    }
    this.openedDialogRef = this._matDialog.open(ProjectFormComponent, {
      data: { orgID },
    });
    this.openedDialogRef.afterClosed().subscribe((result) => {
      lastValueFrom(this._projectService.getAndParseOrganizationProject());
    });
  }

  async onElementSelected() {
    this._router.navigate(['/admin/project']);
  }
}
