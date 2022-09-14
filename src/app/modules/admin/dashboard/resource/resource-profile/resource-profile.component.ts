import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';

@Component({
  selector: 'app-resource-profile',
  templateUrl: './resource-profile.component.html',
  styleUrls: ['./resource-profile.component.scss'],
})
export class ResourceProfileComponent implements OnInit {
  params: any;
  resource: any = {};
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.paramMap.get('id');
    this._resourceService.getResource(this.params).subscribe(({ statusCode, body, errorMessage }) => {
      this.resource = body.data[0];
    });
  }
}
