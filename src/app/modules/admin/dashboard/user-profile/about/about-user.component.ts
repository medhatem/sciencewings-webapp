import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { UserProfileService } from '../../../resolvers/user-profile/user-profile.service';

@Component({
  selector: 'about-user',
  templateUrl: './about-user.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUserComponent implements OnInit, OnDestroy {
  data: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._prepareChartData();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  private _prepareChartData(): void {
    this.data = this._route.snapshot.data;
  }
}
