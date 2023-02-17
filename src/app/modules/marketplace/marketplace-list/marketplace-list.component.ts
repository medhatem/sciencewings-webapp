import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { GetResource } from 'app/models/resources/resource';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { debounceTime, lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-marketplace-list',
  templateUrl: './marketplace-list.component.html',
  styleUrls: ['./marketplace-list.component.scss'],
})
export class MarketplaceListComponent implements OnInit {
  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isLoading: boolean = false;
  resources: GetResource[] = [];
  category: string = null;
  constructor(private _resourceService: ResourceService) {}

  async ngOnInit(): Promise<void> {
    this.resources = await lastValueFrom(this._resourceService.getLoanableResources().pipe(map((r) => r.body.data)));
  }
}
