import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { ListOption } from '../../../reusable-components/list/list-component.component';
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

  constructor(private _infrastructureService: InfrastructureService, private _changeDetectorRef: ChangeDetectorRef) {}

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
