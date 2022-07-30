import { CreateOrganizationRo, ProjectDto, ProjectListDto, ProjectMemberRo, ProjectRo } from 'generated/models';
import { Member, OrganizationMembers } from '../members/member';

export class Project implements ProjectRo {
  id?: string;
  active: boolean;
  dateEnd?: string;
  dateStart: string;
  description: string;
  key: string;
  members: number[];
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
export class ProjectListItem implements ProjectListDto {
  members: number;
  responsable: string;
  startDate: string;
  statusCode: number;
  title: string;

  constructor(project?: any) {
    const { startDate, members, responsable, title } = project || {};
    Object.assign(this, {
      responsable,
      startDate,
      members,
      title,
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
