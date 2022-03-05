import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: 'avatar.component.html',
})
export class AvatarComponent {
  @Input() avatar: any;
  @Input() name: string;
  @Input() secondName?: string;
}
