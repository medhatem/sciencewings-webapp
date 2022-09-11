import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Infrastructure } from 'app/models/infrastructures/infrastructure';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Resource } from 'app/models/resources/resource';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReservationDetailsComponent implements OnInit {
  @Input() event: any;
  resourceForm: FormGroup;
  submitted = false;

  constructor(
    public matDialogRef: MatDialogRef<ReservationDetailsComponent>,
    private _resourceService: ResourceService,
    private _infrastructureService: InfrastructureService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit() {}
}
