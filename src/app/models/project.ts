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
  active: boolean;
  dateStart: string;
  managers: Array<Member>;
  title: string;

  constructor(project?: any) {
    const { active, dateStart, managers, title } = project || {};
    Object.assign(this, {
      active,
      dateStart,
      managers,
      title,
    });
  }
}
