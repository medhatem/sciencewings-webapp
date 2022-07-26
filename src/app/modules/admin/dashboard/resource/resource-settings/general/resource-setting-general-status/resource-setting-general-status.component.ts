import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';
import { Output, EventEmitter } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-resource-setting-general-status',
  templateUrl: './resource-setting-general-status.component.html',
  styleUrls: ['./resource-setting-general-status.component.scss'],
})
export class ResourceSettingGeneralStatusComponent implements OnInit {
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
      statusType: this.settings?.statusType || '',
      statusDescription: this.settings?.statusDescription || '',
    });
  }

  async onSubmit() {
    try {
      const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
      const response = await lastValueFrom(this._resourceService.updateResourceSettingsGeneralStatus(selectedResourceId, this.form.value));
      if (response.body.statusCode === 204) {
        this.updateLocalSettings.emit(this.form.value);
        this._toastrService.showSuccess('Updated Successfully');
      } else {
        this._toastrService.showError('Something went wrong!');
      }
    } catch (error) {
      this._toastrService.showError('Something went wrong!');
    }
  }
}
