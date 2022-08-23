import { Subject } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'app/core/toastr/toastr.service';

/**
 * Class that contains methods or logics reusable in more than one place
 *
 * All the callable methods should be static
 */
@Injectable({
  providedIn: 'root',
})
export class SharedHelpers {
  constructor(private cookiesService: CookieService, private keycloackService: KeycloakService, private _toastrService: ToastrService) {}

  /**
   * Unsubscribe from All Subjects, and clear all the data in the browser
   * and finally log out the user.
   *
   * @param subscriptions
   */
  terminateAllTasksAndLogout(subscriptions: Subject<any>[] = [], message: string = 'APP.FATAL.CONNECTON_LOST') {
    subscriptions.forEach((subscription) => {
      subscription.next(null);
      subscription.complete();
    });
    this.cookiesService?.deleteAll();
    localStorage.clear();
    this._toastrService.showError(message);
    setTimeout(() => {
      this.keycloackService.logout();
    }, 4000);
  }
}
