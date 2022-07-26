import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';

@Component({
  selector: 'app-resource-profile',
  templateUrl: './resource-profile.component.html',
  styleUrls: ['./resource-profile.component.scss'],
})
export class ResourceProfileComponent implements OnInit {
  params: any;
  resource: any;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private _resourceService: ResourceService,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.params = this.route.snapshot.paramMap.get('id');
    this._resourceService.getResource(this.params).subscribe(({ statusCode, body, errorMessage }) => {
      if (statusCode === 500) {
        this._toastrService.showError(errorMessage, 'Something went wrong!');
      }
      this.resource = body.data[0];
      //   this.form.setValue({
      //     name: data.name,
      //     description: data.description,
      //     timezone: data.timezone,
      //     resourceType: data.resourceType,
      //     resourceClass: data.resourceClass,
      //   });
      //   this.resource = data.resources;
      //   this.tags = data.tags.map((tag) => tag.title);
      //   this.filteredTags = this.tags;
      //   this.managers = data.managers;
    });
  }
}
