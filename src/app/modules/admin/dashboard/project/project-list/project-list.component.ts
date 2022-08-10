import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Project, ProjectMember } from 'app/models/projects/project';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: any[] = [];
  managers: any[] = [];
  options: ListOption = { columns: [], numnberOfColumns: 5 };
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
        { columnName: 'ORGANIZATION.PROJECTS.LIST.TITLE', columnPropertyToUse: 'title', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.LIST.MANAGER', columnPropertyToUse: 'managers', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.LIST.MEMBERS', columnPropertyToUse: 'participents', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.LIST.CREATIONDATE', columnPropertyToUse: 'creatingDate', customClass: '' },
      ],
      numnberOfColumns: 4,
      onElementClick: this.onElementSelected.bind(this),
    };

    this._projectService.projects$.pipe(takeUntil(this._unsubscribeAll)).subscribe((projects: Project[]) => {
      this.projects = projects;
      this._changeDetectorRef.markForCheck();
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
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
    this._router.navigate(['/project']);
  }
}
