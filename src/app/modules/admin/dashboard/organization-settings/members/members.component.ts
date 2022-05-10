import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'organization-settings-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _toastrService: ToastrService, private _coookies: CookieService) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      x: true,
      y: 1,
      z: '',
    });
  }

  onSubmit() {}
}
