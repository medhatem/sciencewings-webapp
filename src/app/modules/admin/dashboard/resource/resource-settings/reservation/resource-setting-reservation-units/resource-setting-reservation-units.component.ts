import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'app-resource-setting-reservation-units',
  templateUrl: './resource-setting-reservation-units.component.html',
  styleUrls: ['./resource-setting-reservation-units.component.scss'],
})
export class ResourceSettingReservationUnitsComponent implements OnInit {
  @Input() settings: any;
  @Output() updateLocalSettings = new EventEmitter<string>();
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
    private _coookies: CookieService,
  ) {}
  ngOnInit(): void {
    const { unitName, unites, unitLimit } = this.settings;
    this.form = this._formBuilder.group({
      unitName: unitName || '',
      unites: unites || 0,
      unitLimit: unitLimit || 0,
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
        await lastValueFrom(this._resourceService.updateResourceSettingsReservationUnit(selectedResourceId, this.form.value));
        this.updateLocalSettings.emit(this.form.value);
        this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
      } catch (error) {
        this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
      }
    }
  }
}
