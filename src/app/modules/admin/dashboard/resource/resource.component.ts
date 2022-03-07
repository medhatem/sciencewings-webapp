import { Component, OnInit } from '@angular/core';

import { ResourceService } from './../../resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';

export interface ResourceType {
    name: string;
    resourceType: number;
    timeEfficiency: number;
    timezone: string;
}
@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

    displayedColumns: string[] = ['name', 'resourceType', 'timeEfficiency', 'timezone'];
    dataSource = [];

    constructor(private _resourceService: ResourceService, private _toastrService: ToastrService,) { }

    ngOnInit(): void {
        this._resourceService.getOrgResource().subscribe(({ statusCode, body, errorMessage }) => {
            if (statusCode === 500) {
                this._toastrService.showError(errorMessage, 'Something went wrong!');
            }
            this.dataSource = body.resources;
        });
    }

}
