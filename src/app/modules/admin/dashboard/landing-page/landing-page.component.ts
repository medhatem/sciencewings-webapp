import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnInit {
  readonly componentName = 'LandingPageComponent';
  teamMembers: any;
  selectedOrganization: string = 'ACME Corp. Backend App';
  constructor(private route: ActivatedRoute, private _toastrService: ToastrService) {}

  async ngOnInit() {
    const { data } = this.route.snapshot.data;
    if (!data) {
      this._toastrService.showError(this.componentName);
    }
    this.teamMembers = data;
  }
}
