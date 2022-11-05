import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { debounceTime, lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectListItem } from 'app/models/projects/project';
import { Pagination } from 'app/models/pagination/IPagination';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: any[] = [];
  managers: any[] = [];
  options: ListOption = { columns: [], numberOfColumns: 5 };
  openedDialogRef: any;
  isLoading: boolean = false;
  pagination: Pagination;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  searchInputControl: FormControl = new FormControl();

  constructor(
    private _projectService: ProjectService,
    private _matDialog: MatDialog,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._projectService.projectsPaginated$.subscribe((projects) => {
      this.projects = projects;
      this._changeDetectorRef.markForCheck();
    });

    this._projectService.pagination$.subscribe((pagination) => {
      this.pagination = pagination;
      this._changeDetectorRef.markForCheck();
    });

    this.options = {
      columns: [
        { columnName: 'ORGANIZATION.PROJECTS.LIST.TITLE', columnPropertyToUse: 'title', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.LIST.MANAGER', columnPropertyToUse: 'responsable', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.LIST.MEMBERS', columnPropertyToUse: 'participents', customClass: '' },
        { columnName: 'ORGANIZATION.PROJECTS.LIST.CREATIONDATE', columnPropertyToUse: 'creatingDate', customClass: '' },
      ],
      numberOfColumns: 4,
      onElementClick: this.onElementSelected.bind(this),
    };

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._projectService.getAndParseOrganizationProjects(this.pagination.page, this.pagination.size, query);
        }),
        map(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
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
    this.openedDialogRef = this._matDialog
      .open(ProjectFormComponent, {
        data: { orgID },
      })
      .afterClosed()
      .subscribe(async () => {
        await lastValueFrom(this._projectService.getAndParseOrganizationProjects(this.pagination.page, this.pagination.size));
        this._changeDetectorRef.markForCheck();
      });
  }

  async pageEvent(event: PageEvent) {
    this.pagination = {
      ...this.pagination,
      length: event.length,
      size: event.pageSize,
      page: event.pageIndex,
      lastPage: event.previousPageIndex,
    };
    const orgId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    await lastValueFrom(this._projectService.getAndParseOrganizationProjects(this.pagination.page, this.pagination.size));
  }

  async onElementSelected(p: ProjectListItem) {
    localStorage.setItem(constants.CURRENT_PROJECT_ID, `${p.id}`);
    const id = p.id;
    const projectResponsableId = p.responsableInformations.member.user;
    this._router.navigate(['/project', 'project-settings', id, projectResponsableId]);
  }
}
