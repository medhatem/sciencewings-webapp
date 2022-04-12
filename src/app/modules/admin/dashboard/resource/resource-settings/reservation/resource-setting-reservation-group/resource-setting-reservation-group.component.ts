import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resource-setting-reservation-group',
  templateUrl: './resource-setting-reservation-group.component.html',
  styleUrls: ['./resource-setting-reservation-group.component.scss']
})
export class ResourceSettingReservationGroupComponent implements OnInit {
    accountForm: FormGroup;
    constructor(private _formBuilder: FormBuilder) {}
    ngOnInit(): void {
      this.accountForm = this._formBuilder.group({
        visibility: [false],
        active0: [false],
        active1: [false],
        active2: [false],
        active3: [false],
        active4: [false],
      });
    }
}
