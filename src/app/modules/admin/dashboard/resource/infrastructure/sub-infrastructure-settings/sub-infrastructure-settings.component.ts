import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ListOption } from '../../../reusable-components/list/list-component.component';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { SubInfrastructureList } from 'app/models/infrastructures/infrastructure';

@Component({
  selector: 'app-sub-infrastructure-settings',
  templateUrl: './sub-infrastructure-settings.component.html',
})
export class SubInfrastructureSettingsComponent implements OnInit {
  subInfrastructures: any[] = [];
  options: ListOption = { columns: [] };

  constructor(private _infrastructureService: InfrastructureService, private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._infrastructureService.getAndParseInfrastructureSubInfrastructures().subscribe((subInfrastructures: SubInfrastructureList[]) => {
      this.subInfrastructures = subInfrastructures;
      this._changeDetectorRef.markForCheck();
    });
    this.options = {
      columns: [
        {
          columnName: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.SUBINFRASTRUCTURES.TITLE',
          columnPropertyToUse: 'subInfrastructure',
          customClass: '',
        },
        {
          columnName: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.SUBINFRASTRUCTURES.RESOURCES',
          columnPropertyToUse: 'resourcesNb',
          customClass: 'hidden',
        },
        {
          columnName: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.SUBINFRASTRUCTURES.DATE',
          columnPropertyToUse: 'createdAt',
          customClass: 'hidden',
        },
      ],
    };
  }
}
