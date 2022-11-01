import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'app/core/toastr/toastr.service';
import { Group } from 'app/models/groups/group';
import { OrganizationMembers } from 'app/models/members/member';
import { GroupService } from 'app/modules/admin/resolvers/groups/groups.service';
import { MemberService } from 'app/modules/admin/resolvers/members/member.service';
import { constants } from 'app/shared/constants';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'group-form',
  templateUrl: './group-form.component.html',
})
export class GroupFormComponent implements OnInit {
  groupForm: FormGroup;
  isInvitationPersonalize: boolean = false;
  organizationMembers: OrganizationMembers[];
  organizationGroups: Group[];
  organizationId: number;

  constructor(
    public matDialogRef: MatDialogRef<GroupFormComponent>,
    private _formBuilder: FormBuilder,
    private _groupService: GroupService,
    private _toastrService: ToastrService,
    private _memberService: MemberService,
    private _cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.organizationId = Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
    this.groupForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      members: [],
      parent: [],
      description: ['', [Validators.required]],
    });
    await this.getMembers();
    await this.getGroups();
  }

  async submit() {
    if (!this.groupForm.valid) {
      this._toastrService.showError(constants.CREATE_GROUP_FAILED);
      return;
    }
    const group = this.getGroupFromFormBuilder();
    try {
      await this._groupService.createGroup(group);
      this._toastrService.showSuccess(constants.CREATE_GROUP_COMPLETED);
      this.matDialogRef.close();
    } catch (res) {
      this._toastrService.showError(res.error.error);
    }
  }

  private async getMembers(): Promise<void> {
    try {
      this.organizationMembers = await this._memberService.getMembersByOrgId(this.organizationId);
    } catch (error) {
      this._toastrService.showInfo('GET_MEMBERS_LOAD_FAILED');
    }
  }

  private getGroupFromFormBuilder(): Group {
    return new Group({
      ...this.groupForm.value,
      organization: this.getOrganizationIdFromLocalStorage(),
    });
  }

  private async getGroups(): Promise<void> {
    try {
      this.organizationGroups = await this._groupService.getGroupsByOrgId(this.organizationId);
    } catch (error) {
      this._toastrService.showInfo('GET_GROUPS_LOAD_FAILED');
    }
  }
  private getOrganizationIdFromLocalStorage(): number {
    return Number(localStorage.getItem(constants.CURRENT_ORGANIZATION_ID));
  }
}
