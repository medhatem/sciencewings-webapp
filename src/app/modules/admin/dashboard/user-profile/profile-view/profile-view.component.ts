import { Component, Input } from '@angular/core';

@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
})
export class ProfileViewComponent {
  @Input() user: any;
  @Input() countries: any;

  getCountryByIso(iso: string) {
    if (this.countries) {
      return this.countries.find((country) => country.iso === iso);
    }
  }
}
