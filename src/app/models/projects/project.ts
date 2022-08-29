import { CreateOrganizationRo, ProjectRo } from 'generated/models';
import { Member } from '../members/member';

export class Project implements ProjectRo {
  id?: string;
  active: boolean;
  dateEnd?: string;
  dateStart: string;
  description: string;
  key: string;
  managers: number[];
  organization: number;
  participants: number[];
  title: string;

  constructor(project: any) {
    const { id, active, dateEnd, dateStart, description, managers, organization, participants, title } = project || {};
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

    if (id) {
      this.id = id;
    }
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
