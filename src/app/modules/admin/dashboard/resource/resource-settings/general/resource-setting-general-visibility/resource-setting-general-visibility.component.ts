import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-resource-setting-general-visibility',
  templateUrl: './resource-setting-general-visibility.component.html',
  styleUrls: ['./resource-setting-general-visibility.component.scss'],
})
export class ResourceSettingGeneralVisibilityComponent implements OnInit {
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
      visibility: false,
      isUnlistedOnOrganizationPage: false,
      isUnlistedToUsersWhoCannotReserve: false,
      isFullyHiddentoUsersWhoCannotReserve: false,
      isPromotedOnSitePageAsALargeButtonAboveOtherResources: false,
      isHideAvailabilityonSitePage: false,
    });

    this.form.setValue({
      visibility: this.settings.visibility,
      isUnlistedOnOrganizationPage: this.settings.isUnlistedOnOrganizationPage,
      isUnlistedToUsersWhoCannotReserve: this.settings.isUnlistedToUsersWhoCannotReserve,
      isFullyHiddentoUsersWhoCannotReserve: this.settings.isFullyHiddentoUsersWhoCannotReserve,
      isPromotedOnSitePageAsALargeButtonAboveOtherResources: this.settings.isPromotedOnSitePageAsALargeButtonAboveOtherResources,
      isHideAvailabilityonSitePage: this.settings.isHideAvailabilityonSitePage,
    });
  }

  async onSubmit() {
    try {
      const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
      const response = await lastValueFrom(this._resourceService.updateResourceSettingsGeneralVisibility(selectedResourceId, this.form.value));
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
