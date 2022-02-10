import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { take } from 'rxjs';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { SwitchOrganizationsService } from './switch-organization.service';
import { NewUserInfosResolver } from 'app/layout/new-user-infos/new-user-infos.resolver';

@Component({
  selector: 'switch-organization',
  templateUrl: './switch-organization.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'switch-organization',
})
export class SwitchOrganizationComponent implements OnInit, OnDestroy {
  @Input() user: any;
  @Output() onActiveOrganizationChange = new EventEmitter<any>();
  availableOrganizations: Array<any>;
  activeOrganization: any = {
    id: '0',
    name: 'Organization 00',
    avatar: '',
  };

  constructor(
    private _fuseNavigationService: FuseNavigationService,
    private _switchOrganizationsService: SwitchOrganizationsService,
    private _newUserInfosResolver: NewUserInfosResolver,
  ) {}

  ngOnDestroy(): void {}

  async ngOnInit() {
    // fetch current user
    this.user = this.user || (await this._newUserInfosResolver.getloadUserProfileKeycloak());
    // Get the available organizations for user
    this._switchOrganizationsService
      .getAllAvailableOrganizationsForUser(this.user.id)
      .subscribe((organizations) => (this.availableOrganizations = organizations));
    this.availableOrganizations = [
      {
        id: '1',
        name: 'Organization 01',
        avatar: '',
      },
      {
        id: '2',
        name: 'Organization 02',
        avatar: '',
      },
      {
        id: '3',
        name: 'Organization 03',
        avatar: '',
      },
      {
        id: '4',
        name: 'Organization 04',
        avatar: '',
      },
    ];
  }

  /**
   * Set the active lang
   *
   * @param lang
   */
  setActiveOrganization(organization: any): void {
    // Set the active lang
    this.activeOrganization = organization;
    this.onActiveOrganizationChange.emit(this.activeOrganization);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the navigation
   *
   * @param lang
   * @private
   */
  private _updateNavigation(lang: string): void {
    // Get the component -> navigation data -> item
    const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

    // Return if the navigation component does not exist
    if (!navComponent) {
      return null;
    }

    // Get the flat navigation data
    const navigation = navComponent.navigation;

    // Get the Profile dashboard item and update its title
    const profileDashboardItem = this._fuseNavigationService.getItem('dashboards.profile', navigation);
  }
}
