import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-resource-setting-general-properties',
  templateUrl: './resource-setting-general-properties.component.html',
  styleUrls: ['./resource-setting-general-properties.component.scss'],
})
export class ResourceSettingGeneralPropertiesComponent implements OnInit {
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
      accessToResource: '',
    });

    this.form.setValue({ accessToResource: this.settings?.accessToResource || '' });
  }

  async onSubmit() {
    try {
      const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
      const response: any = await lastValueFrom(
        this._resourceService.updateResourceSettingsGeneralProperties(selectedResourceId, this.form.value),
      );
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
