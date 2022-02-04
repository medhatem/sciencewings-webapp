import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { OrganizationProfileService } from '../../resolvers/profile/organization-profile.service';

@Component({
  selector: 'organization-profile',
  templateUrl: './organization-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationProfileComponent implements OnInit, OnDestroy {
  data: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _profileService: OrganizationProfileService,
    private _keycloackService: KeycloakService,
    private _router: Router,
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    // this._keycloackService.
    // this._profileService.data$.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
    //   this.data = data;
    //   this._prepareChartData();
    // });
    this._prepareChartData();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Prepare the chart data from the data
   *
   * @private
   */
  private _prepareChartData(): void {
    // Za3ma To Do
  }
}
