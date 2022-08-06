import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { lastValueFrom } from 'rxjs';

export interface DialogData {
  orgID: number;
}

@Component({
  selector: 'member-form',
  templateUrl: './member-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MemberFormComponent implements OnInit {
  memberForm: FormGroup;
  isInvitationPersonalize: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public matDialogRef: MatDialogRef<MemberFormComponent>,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder,
    private _memberService: MemberService,
  ) {}

  ngOnInit(): void {
    this.memberForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      description: [''],
    });
  }

  async invite(): Promise<void> {
    try {
      const response = await lastValueFrom(this._memberService.inviteUserToOrganization(this.data.orgID, this.memberForm.value.email));
      if (response.statusCode === 500) {
        throw new Error('');
      }
      this.matDialogRef.close(response);
    } catch (error) {
      this._toastrService.showError('Something went wrong!');
      this.matDialogRef.close({});
    }
  }
}
