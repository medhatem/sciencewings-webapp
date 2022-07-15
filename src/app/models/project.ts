import { ProjectRo } from 'generated/models';

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
