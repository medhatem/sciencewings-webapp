import { ProjectRo } from 'generated/models';
import { Member } from './members/member';

export class Project implements ProjectRo {
  active: boolean;
  dateEnd?: string;
  dateStart: string;
  description: string;
  managers: Array<number>;
  organization: number;
  participants: Array<number>;
  title: string;

  constructor(project?: any) {
    const { active, dateEnd, dateStart, description, managers, organization, participants, title } = project || {};
    Object.assign(this, {
      active,
      dateEnd,
      dateStart,
      description,
      managers,
      organization,
      participants,
      title,
    });
  }
}
export class ProjectListItem {
  dateStart: string;
  managers: Array<Member>;
  participants: Array<Member>;
  title: string;

  constructor(project?: any) {
    const { participants, dateStart, managers, title } = project || {};
    Object.assign(this, {
      participants,
      dateStart,
      managers,
      title,
    });
  }
}
