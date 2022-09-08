import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'app/models/Member';
import { MemberProfileFormComponent } from './editMemberForm/MemberProfileForm.component';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { constants } from 'app/shared/constants';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-profil.component.html',
  styleUrls: ['./member-profil.component.scss'],
})
export class MemberProfileComponent implements OnInit {
  profile: Member = {};
  openedDialogRef: any;
  id: number;
  constructor(
    private _route: ActivatedRoute,
    private _memberService: MemberService,
    private _toastrService: ToastrService,
    private _cdr: ChangeDetectorRef,
    private _matDialog: MatDialog,
  ) {}
  async ngOnInit(): Promise<void> {
    await this.getMemberProfile();
  }

  async getMemberProfile() {
    const { idOrg, userId } = this._route.snapshot.params;
    this.id = userId;
    try {
      this.profile = await lastValueFrom(
        this._memberService.getMember(Number(idOrg), Number(userId)).pipe(map((profile) => new Member((profile.body as any) || {}))),
      );
      this._cdr.markForCheck();
    } catch (error) {
      this._toastrService.showWarning('ORGANIZATION.MEMBERS.PROFILE_LOADING_ERROR');
    }
  }

  /**
   * open the dialog to edit the member profile
   */
  async editMemberInformation() {
    const { idOrg, userId } = this._route.snapshot.params;
    this.openedDialogRef = this._matDialog.open(MemberProfileFormComponent, {
      data: { profile: this.profile, idOrg, userId },
    });

    this.openedDialogRef.afterClosed().subscribe(async (result) => {
      await this.getMemberProfile();
    });
    this._toastrService.showInfo(constants.COMPLETING_MEMBER_PROFILE_INFO);
  }
}
