import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { Country } from 'app/models/country.interface';
import { constants } from 'app/shared/constants';
import { lastValueFrom, Subject } from 'rxjs';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit, OnDestroy {
  data: any;
  countries: Country[] = [];
  editMode: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _route: ActivatedRoute, private _http: HttpClient, private _toastrService: ToastrService) {}

  async ngOnInit() {
    console.log('this._route.snapshot.data', this._route.snapshot.data);
    console.log('this._route.snapshot.data', this._route.snapshot.data);
    this._prepareUserData();
    await this._prepareCountries();
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
    console.log('this._route.snapshot.data', this._route.snapshot.data);
  }

  private async _prepareCountries() {
    try {
      this.countries = await lastValueFrom(this._http.get<Country[]>('api/apps/contacts/countries'));
    } catch (error) {
      this._toastrService.showInfo(constants.FAILED_LOAD_COUNTRIES);
    }
  }
}
