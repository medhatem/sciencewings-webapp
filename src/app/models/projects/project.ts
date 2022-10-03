import {
  MemberDto,
  OrganizationInformationDto,
  ProjectDto,
  ProjectListDto,
  ProjectMemberDto,
  ProjectMemberRo,
  ProjectRo,
  ResponsableObjectDto,
  UpdateProjectRo,
} from 'generated/models';
import { Member } from '../members/member';

export class Project implements ProjectRo {
  active?: boolean;
  dateEnd?: string;
  dateStart?: string;
  description?: string;
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
  }
}

export class ProjectListItem implements ProjectListDto {
  creatingDate: string;
  id?: number;
  members: number;
  projectDto: ProjectDto;
  responsable: ProjectResponsableDto;
  statusCode: number;
  title: string;
  responsableInformations: ProjectResponsableDto;
  constructor(project?: any) {
    const { members, creatingDate, responsable, title, id, projectDto, responsableInformations } = project || {};
    Object.assign(this, {
      members,
      creatingDate,
      responsable,
      title,
      id,
      projectDto,
      responsableInformations,
    });
  }
}

export class ProjectResponsableDto implements ResponsableObjectDto {
  email: string;
  id?: number;
  member: MemberDto;
  name: string;
  statusCode: number;

  constructor(project?: any) {
    const { email, id, member, name } = project || {};
    Object.assign(this, {
      email,
      id,
      member,
      name,
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

export class ParticipantListItem {
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

export class ProjectDropDone implements ProjectDto {
  active?: boolean;
  dateEnd?: string;
  dateStart?: string;
  description?: string;
  id?: number;
  key?: string;
  members?: Array<MemberDto>;
  organization?: OrganizationInformationDto;
  statusCode: number;
  title?: string;

  constructor(project: any) {
    const { id, dateEnd, active, dateStart, description, key, members, organization, title } = project || {};

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

export class UpdateProject implements UpdateProjectRo {
  status?: 'To-do' | 'In-progress' | 'Review' | 'Done';
  dateEnd?: string;
  dateStart?: string;
  description?: string;
  key?: string;
  title?: string;
  newManager?: number;

  constructor(project: any) {
    const { status, dateEnd, dateStart, description, key, title, newManager } = project || {};

    Object.assign(this, {
      status,
      dateEnd,
      dateStart,
      description,
      key,
      title,
      newManager,
    });
  }
}
