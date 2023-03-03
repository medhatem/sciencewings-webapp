import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { GetResource, Resource } from 'app/models/resources/resource';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { debounceTime, lastValueFrom, map, Subject, switchMap, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ReservationCreationComponent } from 'app/modules/admin/dashboard/resource/schedule/reservationCreation/reservation-creation.component';
import moment from 'moment';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketplace-list',
  templateUrl: './marketplace-list.component.html',
  styleUrls: ['./marketplace-list.component.scss'],
})
export class MarketplaceListComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isLoading: boolean = false;
  resources: GetResource[] = [];
  category: string = null;

  constructor(private _resourceService: ResourceService, private _matDialog: MatDialog, private _router: Router) {}

  async ngOnInit(): Promise<void> {
    this.resources = await lastValueFrom(this._resourceService.getLoanableResources().pipe(map((r) => r.body.data)));

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap(async (query) => {
          this.isLoading = true;
          this.resources = await lastValueFrom(this._resourceService.getLoanableResources(this.category, query).pipe(map((r) => r.body.data)));
        }),
        map(() => {
          this.isLoading = false;
        }),
      )
      .subscribe();
  }
  async filterCategories(category: string) {
    if (category === 'all') {
      this.category = null;
      this.resources = await lastValueFrom(this._resourceService.getLoanableResources().pipe(map((r) => r.body.data)));
    } else {
      this.category = category;
      this.resources = await lastValueFrom(this._resourceService.getLoanableResources(category).pipe(map((r) => r.body.data)));
    }
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
