import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { constants } from 'app/shared/constants';

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
    const {
      visibility,
      isUnlistedOnOrganizationPage,
      isUnlistedToUsersWhoCannotReserve,
      isFullyHiddentoUsersWhoCannotReserve,
      isPromotedOnSitePageAsALargeButtonAboveOtherResources,
      isHideAvailabilityonSitePage,
    } = this.settings;

    this.form = this._formBuilder.group({
      visibility: visibility || false,
      isUnlistedOnOrganizationPage: isUnlistedOnOrganizationPage || false,
      isUnlistedToUsersWhoCannotReserve: isUnlistedToUsersWhoCannotReserve || false,
      isFullyHiddentoUsersWhoCannotReserve: isFullyHiddentoUsersWhoCannotReserve || false,
      isPromotedOnSitePageAsALargeButtonAboveOtherResources: isPromotedOnSitePageAsALargeButtonAboveOtherResources || false,
      isHideAvailabilityonSitePage: isHideAvailabilityonSitePage || false,
    });
  }

  async onSubmit() {
    try {
      const selectedResourceId = parseInt(this._coookies.get('resourceID'), 10);
      await lastValueFrom(this._resourceService.updateResourceSettingsGeneralVisibility(selectedResourceId, this.form.value));
      this.updateLocalSettings.emit(this.form.value);
      this._toastrService.showSuccess(constants.UPDATE_SUCCESSFULLY);
    } catch (error) {
      this._toastrService.showError(constants.SOMETHING_WENT_WRONG);
    }
  }
}
