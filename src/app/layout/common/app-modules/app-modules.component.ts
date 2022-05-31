import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { AppModule } from './app-modules.types';
import { AppModulesService } from './app-modules.service';

@Component({
  selector: 'app-modules',
  templateUrl: './app-modules.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'app-modules',
})
export class AppModulesComponent implements OnInit, OnDestroy {
  @Output() messageEvent = new EventEmitter<string>();
  @ViewChild('appModulesOrigin') private _appModulesOrigin: MatButton;
  @ViewChild('appModulesPanel') private _appModulesPanel: TemplateRef<any>;

  appModules: AppModule[];
  private _overlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _appModulesService: AppModulesService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    // Get the app-modules
    const appModulesSubscription = this._appModulesService.appModules$.pipe(takeUntil(this._unsubscribeAll));
    lastValueFrom(appModulesSubscription).then((appModules: AppModule[]) => {
      this.appModules = appModules;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    // Dispose the overlay
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

  openPanel(): void {
    // Return if the app-modules panel or its origin is not defined
    if (!this._appModulesPanel || !this._appModulesOrigin) {
      return;
    }

    // Create the overlay if it doesn't exist
    if (!this._overlayRef) {
      this._createOverlay();
    }

    // Attach the portal to the overlay
    this._overlayRef.attach(new TemplatePortal(this._appModulesPanel, this._viewContainerRef));
  }

  closePanel(): void {
    this._overlayRef.detach();
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

  /**
   * Create the overlay
   */
  private _createOverlay(): void {
    // Create the overlay
    this._overlayRef = this._overlay.create({
      hasBackdrop: true,
      backdropClass: 'fuse-backdrop-on-mobile',
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._appModulesOrigin._elementRef.nativeElement)
        .withLockedPosition(true)
        .withPush(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
          },
        ]),
    });

    // Detach the overlay from the portal on backdrop click
    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef.detach();
    });
  }
}
