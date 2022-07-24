import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';

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
    this.form = this._formBuilder.group({
      unitName: '',
      unites: 0,
      unitLimit: 0,
    });

    this.form.setValue({
      unitName: this.settings?.unitName || '',
      unites: this.settings?.unites || 0,
      unitLimit: this.settings?.unitLimit || 0,
    });
  }

  onSubmit() {
    const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
    this._resourceService.updateResourceSettingsReservationUnit(selectedResourceId, this.form.value).subscribe((response) => {
      if (response.body.statusCode === 204) {
        this.updateLocalSettings.emit(this.form.value);
        this._toastrService.showSuccess('Updated Successfully');
      } else {
        this._toastrService.showError('Something went wrong!');
      }
    });
  }
}
