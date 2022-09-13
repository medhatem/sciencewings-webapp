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
import { Member } from '../members/member';

export class Project implements ProjectRo {
  id?: string;
  active?: boolean;
  dateEnd?: string;
  dateStart?: string;
  description: string;
  key: string;
  organization: number;
  title: string;
  constructor(project: any) {
    const { id, active, dateEnd, dateStart, description, key, organization, participants, title } = project || {};
    Object.assign(this, {
      active,
      dateEnd,
      dateStart,
      description,
      organization,
      key,
      participants,
      title,
    });

    if (id) {
      this.id = id;
    }
  }
}
export class ProjectListItem {
  id?: number;

  members: number;

  responsable: ResponsableObjectDto;

  creatingDate: string;

  statusCode: number;

  title: string;

  constructor(project?: any) {
    const { members, creatingDate, responsable, title, id } = project || {};
    Object.assign(this, {
      members,
      creatingDate,
      responsable,
      title,
      id,
    });
  }
}
export class ProjectListMember implements ProjectMemberDto {
  member: MemberDto;

  project: ProjectDto;

  role: string;

  status: string;

  statusCode: number;

  createdAt: string;

  constructor(project?: any) {
    const { member, role, status, createdAt, statusCode } = project || {};

    Object.assign(this, {
      member,

      role,

      status,

      createdAt,

      statusCode,
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
