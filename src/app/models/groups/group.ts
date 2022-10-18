import { MemberDto, OrganizationDto } from 'generated/models';
import { GroupBodyDto } from 'generated/models/group-body-dto';
import { GroupRo } from 'generated/models/group-ro';

export class Group implements GroupRo {
  id?: number;
  active: boolean;
  description?: string;
  members?: number[];
  name: string;
  organization: number;
  parent: number;

  constructor(group: any) {
    const { active, description, members = [], name, organization, parent, id } = group || {};
    Object.assign(this, { active, description, members, name, organization, parent });
    if (id) {
      this.id = id;
    }
  }
}

export class GroupBody implements GroupBodyDto {
  active: boolean;
  description: string;
  id: number;
  members?: Array<MemberDto>;
  name: string;
  organization: OrganizationDto;
  statusCode: number;

  constructor(group: any) {
    const { active, description, members = [], name, organization, id } = group || {};
    Object.assign(this, { active, description, members, name, organization });
    if (id) {
      this.id = id;
    }
  }
}
