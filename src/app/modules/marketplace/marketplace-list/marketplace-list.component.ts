import { Component, OnInit } from '@angular/core';
import { GetResource } from 'app/models/resources/resource';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-marketplace-list',
  templateUrl: './marketplace-list.component.html',
  styleUrls: ['./marketplace-list.component.scss'],
})
export class MarketplaceListComponent implements OnInit {
  resources: GetResource[] = [];
  constructor(private _resourceService: ResourceService) {}

  async ngOnInit(): Promise<void> {
    this.resources = await lastValueFrom(this._resourceService.getOrgResource().pipe(map((r) => r.body.data)));
    console.log('this.resources= ', this.resources);
  }
}
