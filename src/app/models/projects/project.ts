import {
  CreateOrganizationRo,
  MemberDto,
  ProjectDto,
  ProjectListDto,
  ProjectMemberDto,
  ProjectMemberRo,
  ProjectRo,
  ResponsableObjectDto,
} from 'generated/models';
import { Member, OrganizationMembers } from '../members/member';

export class Project implements ProjectRo {
  id?: string;
  active?: boolean;
  dateEnd?: string;
  dateStart?: string;
  description: string;
  key: string;
  members?: number[];
  organization: number;
  title: string;

  constructor(project: any) {
    const { id, active, dateEnd, dateStart, description, key, members, organization, title } = project || {};
    Object.assign(this, {
      active,
      dateEnd,
      dateStart,
      description,
      key,
      members,
      organization,
      title,
    });

    if (id) {
      this.id = id;
    }
  }
}
export class ResponsableDto implements ResponsableObjectDto {
  email: string;
  member: MemberDto;
  name: string;
  statusCode: number;

  constructor(responsable?: any) {
    const { email, member, name } = responsable || {};
    Object.assign(this, {
      email,
      member,
      name,
    });
  }
}

export class ProjectListItem implements ProjectListDto {
  members: number;
  responsable: ResponsableDto;
  creatingDate: string;
  statusCode: number;
  title: string;

  constructor(project?: any) {
    const { creatingDate, members, responsable, title } = project || {};
    Object.assign(this, {
      responsable,
      creatingDate,
      members,
      title,
    });
  }
}
export class ProjectListMember implements ProjectMemberDto {
  member: MemberDto;
  project: ProjectDto;
  role: string;
  status: string;
  statusCode: number;

  constructor(project?: any) {
    const { member, role, status } = project || {};
    Object.assign(this, {
      role,
      member,
      status,
    });
  }
}

export class ProjectMember implements ProjectMemberRo {
  userId: number;
  orgId: number;
  role: string;
  status: string;

  constructor(participant?: any) {
    const { userId, orgId, role, status } = participant || {};
    Object.assign(this, {
      userId,
      orgId,
      role,
      status,
    });
  }
}

export class participantListItem {
  member: Member;
  role: string;
  status: string;

  constructor(participant?: any) {
    const { member, role, status } = participant || {};
    Object.assign(this, {
      member,
      role,
      status,
    });
  }
}
