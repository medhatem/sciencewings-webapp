import { Component, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Infrastructure } from 'app/models/infrastructures/infrastructure';
import { InfrastructureService } from 'app/modules/admin/resolvers/infrastructure/infrastructure.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resource } from 'app/models/resources/resource';
import { ResourceService } from 'app/modules/admin/resolvers/resource/resource.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';
import { lastValueFrom } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReservationDetailsComponent implements OnInit {
  resourceForm: FormGroup;
  submitted = false;
  start: string;
  end: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ReservationDetailsComponent>,
    private _resourceService: ResourceService,
    private _infrastructureService: InfrastructureService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.start = moment(this.data.event.start).format('DD-MM-YY hh:mm:ss').toString();
    this.end = moment(this.data.event.end).format('DD-MM-YY hh:mm:ss').toString();
  }
}
