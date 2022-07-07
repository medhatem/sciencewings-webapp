import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LandingPageService } from './landing-page-service';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { UserOrganizations } from 'app/models/organizations/user-organizations';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit {
  readonly componentName = 'LandingPageComponent';
  organizations: UserOrganizations[] = [];
  isLoading: boolean = false;
  readonly organizationProfilePage = '/admin/organization-profile';
  constructor(private _toastrService: ToastrService, private _landingPageService: LandingPageService, private _router: Router) {}

  async ngOnInit() {
    this.fetchUserOrganization();
  }

  fetchUserOrganization = () => {
    try {
      const userId = localStorage.getItem(constants.CURRENT_USER_ID);
      this._landingPageService.getAllUserOrganizations(Number(userId)).then((organizations = []) => {
        this.organizations = organizations;
      });
    } catch (error) {
      this.organizations = [];
      this._toastrService.showError(constants.ERROR_LOADING_ORGANIZATIONS);
    }
  };
  navigateToOrganizationProfilePage(org: any) {
    this._router.navigate([this.organizationProfilePage, org.id]);
  }
}
