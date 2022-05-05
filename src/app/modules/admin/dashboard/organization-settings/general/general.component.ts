import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'organization-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  form: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _toastrService: ToastrService, private _coookies: CookieService) {}

  ngOnInit(): void {}

  onSubmit() {}
}
