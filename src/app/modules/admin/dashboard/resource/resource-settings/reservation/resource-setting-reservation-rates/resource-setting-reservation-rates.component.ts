import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-resource-setting-reservation-rates',
  templateUrl: './resource-setting-reservation-rates.component.html',
  styleUrls: ['./resource-setting-reservation-rates.component.scss'],
})
export class ResourceSettingReservationRatesComponent implements OnInit {
  @Input() settings: any;
  @Output() updateLocalSettings = new EventEmitter<string>();
  form: FormGroup;
  rates = [];
  selectedRateId: number = null;
  isCardHidden: boolean = true;
  private selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
  constructor(private _formBuilder: FormBuilder, private _resourceService: ResourceService, private _toastrService: ToastrService, private _coookies: CookieService) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      description: '',
      rate: '',
      category: '',
      isPublic: false,
      isRequiredAccountNumber: false,
      duration: 0,
    });
    this._resourceService.getResourceSettingsReservationRate(this.selectedResourceId).subscribe(({ statusCode, body, errorMessage }) => {
      if (statusCode === 500) {
        this._toastrService.showError(errorMessage, 'Something went wrong!');
      }
      this.rates = body.data;
    });
  }

  onSubmit() {
    const { description, rate, category, isPublic, isRequiredAccountNumber, duration } = this.form.value;
    const rateData = { description, rate, category, isPublic, isRequiredAccountNumber, duration };
    if (this.selectedRateId) {
      this._resourceService.updateResourceSettingsReservationRate(this.selectedRateId, rateData).subscribe((response) => {
        if (response.body.statusCode === 204) {
          for (const elRate of this.rates) {
            if (elRate.id === this.selectedRateId) {
              Object.assign(elRate, { id: elRate.id, ...rateData });
              break;
            }
          }
          this.rates = [...this.rates];
          this._toastrService.showSuccess('Updated Successfully');
        } else {
          this._toastrService.showError('Something went wrong!');
        }
      });
    } else {
      this._resourceService.createResourceSettingsReservationRate(this.selectedResourceId, rateData).subscribe((response) => {
        rateData['id'] = response.body.id;
        this.rates.push(rateData);
        if (response.body.statusCode === 201) {
           this.updateLocalSettings.emit(this.form.value);
          this._toastrService.showSuccess('Updated Successfully');
        } else {
          this._toastrService.showError('Something went wrong!');
        }
      });
    }
  }

  onRateSelect(rate) {
    this.isCardHidden = false;
    this.selectedRateId = rate.id;
    this.form.setValue({
      description: rate.description,
      rate: rate.rate,
      category: rate.category,
      isPublic: rate.isPublic,
      isRequiredAccountNumber: rate.isRequiredAccountNumber,
      duration: rate.duration,
    });
  }

  onCancel() {
    this.selectedRateId = null;
    this.form.setValue({
      description: '',
      rate: '',
      category: '',
      isPublic: false,
      isRequiredAccountNumber: false,
      duration: 0,
    });
  }

  toggleRateCard() {
    this.isCardHidden = !this.isCardHidden;
  }

  test() {
    this.rates = [];
  }
}
