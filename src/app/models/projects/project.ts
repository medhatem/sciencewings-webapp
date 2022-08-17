import { ProjectRo } from 'generated/models';
import { Member } from '../members/member';

export class Project implements ProjectRo {
  id?: string;
  active?: boolean;
  dateEnd?: string;
  managers: number;
  participants: number;
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
