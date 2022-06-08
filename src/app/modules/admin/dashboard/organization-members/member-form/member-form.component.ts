import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';

@Component({
  selector: 'member-form',
  templateUrl: './member-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MemberFormComponent implements OnInit {
  memberForm: FormGroup;
  isInvitationPersonalize: boolean = false;

  constructor(
    public matDialogRef: MatDialogRef<MemberFormComponent>,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder,
    private _memberService: MemberService,
  ) {}

  ngOnInit(): void {
    this.memberForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public invite(): void {
    this._memberService.inviteUserToOrganization(1, this.memberForm.value.email).subscribe(({ body }) => {
      if (body.statusCode === 500) {
        this._toastrService.showError('Something went wrong!');
      }
    });
  }
}
