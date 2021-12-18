import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';

@Component({
  selector: 'languages',
  templateUrl: './languages.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'languages',
})
export class LanguagesComponent implements OnInit, OnDestroy {
  availableLangs: AvailableLangs;
  activeLang: string;
  flagCodes: any;

  constructor(private _fuseNavigationService: FuseNavigationService, private _translocoService: TranslocoService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    // Get the available languages from transloco
    this.availableLangs = this._translocoService.getAvailableLangs();

    // Subscribe to language changes
    this._translocoService.langChanges$.subscribe((activeLang) => {
      this.activeLang = activeLang;
      this._updateNavigation(activeLang);
    });

    // Set the country iso codes for languages for flags
    this.flagCodes = {
      en: 'us',
      fr: 'fr',
    };
  }

  /**
   * Set the active lang
   *
   * @param lang
   */
  setActiveLang(lang: string): void {
    // Set the active lang
    this._translocoService.setActiveLang(lang);
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
    if (profileDashboardItem) {
      this._translocoService
        .selectTranslate('PROFILE')
        .pipe(take(1))
        .subscribe((translation) => {
          profileDashboardItem.title = translation;
          navComponent.refresh();
        });
    }
  }
}
