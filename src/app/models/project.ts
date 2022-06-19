import { ProjectRo, ProjectTagRo, ProjectTaskRo } from 'generated/models';

export class Project implements ProjectRo {
  active: boolean;
  dateEnd?: string;
  dateStart: string;
  description: string;
  managers: Array<number>;
  organization: number;
  participants: Array<number>;
  tags: Array<ProjectTagRo>;
  tasks: Array<ProjectTaskRo>;
  title: string;

  constructor(project?: any) {
    const { active, dateEnd, dateStart, description, managers, organization, participants, tags, tasks, title } = project || {};
    Object.assign(this, {
      active,
      dateEnd,
      dateStart,
      description,
      managers,
      organization,
      participants,
      tags,
      tasks,
      title,
    });
  }
}
