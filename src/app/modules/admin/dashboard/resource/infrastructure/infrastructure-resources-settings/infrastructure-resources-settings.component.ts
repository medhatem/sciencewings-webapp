import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { constants } from 'app/shared/constants';
import { lastValueFrom, Subject } from 'rxjs';
import { ListOption } from '../../../reusable-components/list/list-component.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ResourcesList } from 'app/models/infrastructures/infrastructure';

@Component({
  selector: 'app-infrastructure-resources-settings',
  templateUrl: './infrastructure-resources-settings.component.html',
})
export class InfrastructureResourcesSettingsComponent implements OnInit {
  @Input() id: number;
  resources: any[] = [];
  options: ListOption = { columns: [], numnberOfColumns: 3 };
  openedDialogRef: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _infrastructureService: InfrastructureService,
    private _matDialog: MatDialog,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) { }

  ngOnInit(): void {

    this._infrastructureService.getAndParseInfrastructureResources().subscribe((resources: ResourcesList[]) => {
      this.resources = resources;
      this._changeDetectorRef.markForCheck();
    });

    this.options = {
      columns: [
        { columnName: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.RESOURCES.TITLE', columnPropertyToUse: 'name', customClass: '' },
        { columnName: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.RESOURCES.STATUS', columnPropertyToUse: 'status', customClass: '' },
        { columnName: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.RESOURCES.DATE', columnPropertyToUse: 'createdAt', customClass: '' },
      ],
      numnberOfColumns: 3,
    
    };
  }
}
