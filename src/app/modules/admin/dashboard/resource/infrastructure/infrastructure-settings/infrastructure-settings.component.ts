import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  infrastructure;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.infrastructure = Number(this.route.snapshot.paramMap.get('infrastructure'));
    // Setup available panels
    this.panels = [
      {
        id: 'infrastructure-general',
        icon: 'heroicons_outline:clipboard-check',
        title: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.PANEL_GENERAL',
        description: 'ORGANIZATION.INFRASTRUCTURES.SETTINGS.GENERAL_MESSAGE',
      },
    ];
  }

  changeSelectedPanel(selectedPanel: string) {
    this.selectedPanel = selectedPanel;
  }
}
