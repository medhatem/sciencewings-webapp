import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { UserProfileService } from '../../resolvers/profile/user-profile.service';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  data: any;
  selectedMenu: string = 'Select organization';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _profileService: UserProfileService,
    private _keycloackService: KeycloakService,
    private _router: Router,
    private _route: ActivatedRoute,
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
    this.data = this._route.snapshot.data;
    console.log('dtata:', this.data.data);
  }
}
