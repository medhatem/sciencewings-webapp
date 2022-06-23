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
  orgs: any;
  isLoading: boolean = false;
  constructor(private route: ActivatedRoute, private _toastrService: ToastrService) {}

  async ngOnInit() {
    const { data } = this.route.snapshot.data;
    if (!data) {
      this._toastrService.showError(this.componentName);
    }
    this.orgs = data;
  }
}
