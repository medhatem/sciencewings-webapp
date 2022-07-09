import { CreateOrganizationRo, ProjectRo } from 'generated/models';

export class Project implements ProjectRo {
  id?: string;
  active: boolean;
  dateEnd?: string;
  dateStart: string;
  description: string;
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
