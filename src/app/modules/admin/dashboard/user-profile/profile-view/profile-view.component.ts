import { Component, Input } from '@angular/core';

@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
})
export class ProfileViewComponent {
  @Input() user: any;
  @Input() countries: any;

  getCountryByIso(isoImage: string) {
    // Default country Canada
    const countryCanada = { flagImagePos: '-1px -1803px' };
    return this.countries?.find(({ iso }) => iso === isoImage) || countryCanada;
  }
}
