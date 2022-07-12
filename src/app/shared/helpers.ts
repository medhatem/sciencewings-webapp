import { Subject } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { CookieService } from 'ngx-cookie-service';

/**
 * Class that contains methods or logics reusable in more than one place
 *
 * All the callable methods should be static
 */
export class SharedHelpers {
  /**
   * Unsubscribe from All Subjects, and clear all the data in the browser
   * and finally log out the user.
   *
   * @param cookiesService
   * @param subscriptions
   */
  static terminateAllTasksAndLogout(cookiesService: CookieService | undefined, subscriptions: Subject<any>[] = []) {
    const keycloackService = new KeycloakService();
    subscriptions.forEach((subscription) => {
      subscription.next(null);
      subscription.complete();
    });
    cookiesService?.deleteAll();
    localStorage.clear();
    setTimeout(() => {
      keycloackService.logout();
    }, 5000);
  }
}
