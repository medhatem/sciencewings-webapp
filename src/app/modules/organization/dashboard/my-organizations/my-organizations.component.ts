import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-organizations',
  templateUrl: './my-organizations.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyOrganizationsComponent {
  /**
   * Constructor
   */
  constructor() {}
}
