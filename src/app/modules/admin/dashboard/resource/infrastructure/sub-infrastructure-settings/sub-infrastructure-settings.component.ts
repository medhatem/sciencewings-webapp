import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ListOption } from '../../../reusable-components/list/list-component.component';
import { MatDialog } from '@angular/material/dialog';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { constants } from 'app/shared/constants';
import { SubInfrastructureList } from 'app/models/infrastructures/infrastructure';

@Component({
  selector: 'app-sub-infrastructure-settings',
  templateUrl: './sub-infrastructure-settings.component.html',
})
export class SubInfrastructureSettingsComponent implements OnInit {
  subInfrastructures: any[] = [];
  options: ListOption = { columns: [], numnberOfColumns: 3 };

  constructor(
    private _infrastructureService: InfrastructureService,
    private _toastrService: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._infrastructureService.getAndParseInfrastructureSubInfrastructures().subscribe((subInfrastructures: SubInfrastructureList[]) => {
      this.subInfrastructures = subInfrastructures;
      this._changeDetectorRef.markForCheck();
    });
    this.options = {
      columns: [
        { columnName: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.SUBINFRASTRUCTURES.TITLE', columnPropertyToUse: 'name', customClass: '' },
        { columnName: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.SUBINFRASTRUCTURES.STATUS', columnPropertyToUse: 'resourcesNb', customClass: 'hidden' },
        { columnName: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.SUBINFRASTRUCTURES.DATE', columnPropertyToUse: 'createdAt', customClass: 'hidden' },
      ],
      numnberOfColumns: 3,
  }

}

}
