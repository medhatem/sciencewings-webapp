import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  data: any;
  countries: any;
  editMode: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _route: ActivatedRoute, private _http: HttpClient) {}

  ngOnInit(): void {
    this._prepareUserData();
    this._prepareCountries();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  private _prepareUserData() {
    this.data = this._route.snapshot.data;
  }

  private _prepareCountries() {
    // TODO: retrieve countries from the backend instead of mock api
    this._http.get('api/apps/contacts/countries').subscribe((countries) => (this.countries = countries));
  }
}
