import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { MessagesService } from 'app/layout/common/messages/messages.service';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { AppModulesService } from 'app/layout/common/app-modules/app-modules.service';

@Injectable({
  providedIn: 'root',
})
export class InitialDataResolver implements Resolve<any> {
  constructor(
    private _messagesService: MessagesService,
    private _notificationsService: NotificationsService,
    private _quickChatService: QuickChatService,
    private _appModulesService: AppModulesService,
  ) {}

  /**
   * Use this resolver to resolve initial mock-api for the application
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
      this._messagesService.getAll(),
      this._notificationsService.getAll(),
      this._quickChatService.getChats(),
      this._appModulesService.getAll(),
    ]);
  }
}
