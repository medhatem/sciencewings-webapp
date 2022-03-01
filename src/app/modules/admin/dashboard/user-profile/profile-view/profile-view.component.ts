import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
})
export class ProfileViewComponent implements OnInit {
  data: any;
  countries: any;

  constructor(private _route: ActivatedRoute, private _http: HttpClient) {}

  ngOnInit(): void {
    this._prepareUserData();
    this._prepareCountries();
  }

  private _prepareUserData() {
    this.data = this._route.snapshot.data;
  }

  private _prepareCountries() {
    this._http.get('api/apps/contacts/countries').subscribe((countries) => (this.countries = countries));
  }

  getCountryByIso(iso: string) {
    if (this.countries) {
      return this.countries.find((country) => country.iso === iso);
    }
  }
}
