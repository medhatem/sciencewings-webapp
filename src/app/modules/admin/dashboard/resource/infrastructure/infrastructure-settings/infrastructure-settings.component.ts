import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-infrastructure-settings',
  templateUrl: './infrastructure-settings.component.html',
})
export class InfrastructureSettingsComponent implements OnInit {
  selectedPanel: string = 'infrastructure-general';
  title = 'Infrastructures settings';
  settings = null;
  currentInfrastructures = null;
  panels: any[];
  id: number;
  infrastructure: any;

  constructor(private route: ActivatedRoute, private _infrastructureService: InfrastructureService, private _cdf: ChangeDetectorRef) {}

  async ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    await lastValueFrom(this._infrastructureService.getInfrastructure(this.id)).then(({ body }) => {
      this.infrastructure = body;
      this._cdf.markForCheck();
    });

    this.panels = [
      {
        id: 'infrastructure-general',
        icon: 'heroicons_outline:clipboard-check',
        title: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.PANEL_GENERAL',
        description: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.GENERAL_MESSAGE',
      },

      {
        id: 'infrastructure-sub-infrastructures',
        icon: 'heroicons_outline:clipboard-check',
        title: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.PANEL_SUBINFRASTRUCTURES',
        description: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.SUBINFRASTRUCTURES_MESSAGE',
      },
    ];
  }

  changeSelectedPanel(selectedPanel: string) {
    this.selectedPanel = selectedPanel;
  }
}
