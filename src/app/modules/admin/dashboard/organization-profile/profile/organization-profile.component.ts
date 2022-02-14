import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { AdminOrganizationsService } from 'app/modules/admin/resolvers/admin-organization/admin-organization.service';

export interface InventoryPagination {
  length: number;
  size: number;
  page: number;
  lastPage?: number;
  startIndex?: number;
  endIndex?: number;
}

@Component({
  selector: 'organization-profile',
  templateUrl: './organization-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationProfileComponent implements OnInit, OnDestroy {
  pagination: InventoryPagination = {
    length: 5,
    size: 5,
    page: 2,
  };
  organization = {
    name: 'Science Wings',
    email: 'Administration@sciencewings.com',
    phoneNumbers: [
      { label: 'Bureau-informations', phoneNumber: '+1 (514)-701-7014' },
      { label: 'Bureau-RH', phoneNumber: '+1 (418)-701-7014' },
      { label: 'Support', phoneNumber: '+1 (514)-801-8414' },
    ],
    description: `
      Software consulting and development for your digital success.
      Want to take your software and enterprise to another level?
      you’ve come to the proper location. We will help you create a remarkable
      presence online while guiding you through the whole process.
      `,
    address: {
      apartment: '12',
      street: '487 Yardley Cres',
      country: 'Canada',
      province: 'Ontario',
      city: 'Ontario',
      postalCode: '5L8 G9S',
    },
  };
  organizationUsersList = [
    {
      id: '3j2brj2-23jrb2j',
      firstname: 'Slimane',
      lastname: 'Salhoub',
      location: 'Bureau 001',
      avatar: '',
      title: 'Chef des chefs',
    },
    {
      id: '3j2brj2-23jrb2j',
      firstname: 'Hamid',
      lastname: 'Zwaylou',
      location: 'Departement IT',
      avatar: '',
      title: 'Chef des chefs',
    },
    {
      id: '3j2brj2-23jrb2j',
      firstname: 'T9acher',
      lastname: 'Benhamdane',
      location: '',
      avatar: '',
      title: 'Chef des chefs',
    },
    {
      id: '3j2brj2-23jrb2j',
      firstname: 'Jbaili',
      lastname: 'Ti9ar9awine',
      location: 'Bureau des recherches',
      avatar: '',
      title: 'Chef des chefs',
    },
  ];
  organizationResourcesList = [
    {
      id: '3j2brj2-23jrb2j',
      name: 'Imprimante',
      type: 'Equipement',
      qty: 12,
      avatar: '',
      privacy: 'Publique',
    },
    {
      id: '3j2brj2-23jrb2j',
      name: 'Télescope',
      type: 'Equipement',
      qty: 2,
      avatar: '',
      privacy: 'Members',
    },
    {
      id: '3j2brj2-23jrb2j',
      name: 'Dr. Philippe',
      type: 'Personne',
      qty: 1,
      avatar: '',
      privacy: 'Non-members',
    },
  ];
  organizationSubOrganizationsList = [
    {
      name: 'Science Wings',
      email: 'Administration@sciencewings.com',
      department: 'Recherche',
      sector: 'Software consulting and development',
    },
    {
      name: 'Science Wings',
      email: 'Administration@sciencewings.com',
      department: 'Recherche',
      sector: 'Software consulting and development',
    },
    {
      name: 'Science Wings',
      email: 'Administration@sciencewings.com',
      department: 'Recherche',
      sector: 'Software consulting and development',
    },
  ];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _profileService: AdminOrganizationsService,
    private _keycloackService: KeycloakService,
    private _router: Router,
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    // this._keycloackService.
    // this._profileService.data$.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
    //   this.data = data;
    //   this._prepareChartData();
    // });
    this._prepareChartData();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getFormattedAddress(address: any) {
    // To do : create a pipe out of this function
    const { apart = '', streetNumber = '', street = '', country = '', province = '', postalCode = '' } = address || {};
    return `${apart}-${streetNumber}, ${street}, ${province}, ${country}, ${postalCode}`;
  }

  /**
   * Prepare the chart data from the data
   *
   * @private
   */
  private _prepareChartData(): void {
    // Za3ma To Do
  }
}
