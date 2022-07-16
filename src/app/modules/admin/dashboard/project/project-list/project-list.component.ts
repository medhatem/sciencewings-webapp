import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectService } from 'app/modules/admin/resolvers/project/project.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { InventoryPagination } from '../../organization-profile/profile/organization-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ListOption } from '../../reusable-components/list/list-component.component';
import { Project } from 'app/models/project';
import { constants } from 'app/shared/constants';
import { ToastrService } from 'app/core/toastr/toastr.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;
  projects: any[] = [];

  projects$: any;
  isLoading: boolean = false;
  selectedProjects = null;
  projectsCount: number = 0;
  pagination: InventoryPagination;
  searchInputControl: FormControl = new FormControl();
  options: ListOption = { columns: [], numnberOfColumns: 4 };
  openedDialogRef: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _projectService: ProjectService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _toastrService: ToastrService,

    private _matDialog: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    console.log('========1');
    this.options = {
      columns: [
        { columnName: 'Title', columnPropertyToUse: 'title' },
        { columnName: 'Managers', columnPropertyToUse: 'managers' },
        { columnName: 'Participants', columnPropertyToUse: 'participants' },
        { columnName: 'Date start', columnPropertyToUse: 'dateStart' },
      ],
      numnberOfColumns: 4,
      onElementClick: this.onElementSelected.bind(this),
    };
    const { projects } = this._route.snapshot.data;
    this._projectService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination: InventoryPagination) => {
      this.pagination = pagination;
      this._changeDetectorRef.markForCheck();
    });

    this.projects$ = this._projectService.projects$;
    this.projectsCount = projects.length;

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.closeDetails();
          this.isLoading = true;
          return this._projectService.getProjects(0, 10, 'name', 'asc', query);
        }),
        map(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
    this._projectService.projects$.subscribe((projects: Project[]) => {
      this.projects = projects;
      this._changeDetectorRef.markForCheck();
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pagination.length = event.length;
    this.pagination.size = event.pageSize;
    this.pagination.page = event.pageIndex;
    lastValueFrom(this._projectService.getProjects(event.pageIndex, event.pageSize));
  }

  ngAfterViewInit(): void {
    if (this._sort && this._paginator) {
      this._sort.sort({
        id: 'projectProfil',
        start: 'asc',
        disableClear: true,
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  openProjectForm(): void {
    const dialogRef = this._matDialog.open(ProjectFormComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {});
  }
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
  closeDetails(): void {
    this.selectedProjects = null;
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
