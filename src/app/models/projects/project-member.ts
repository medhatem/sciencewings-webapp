import { ProjectMemberRo } from 'generated/models';

export class ProjectMember implements ProjectMemberRo {
  orgId: number;
  role: string;
  userId: number;
  constructor(participant?: any) {
    const { orgId, role, userId } = participant || {};

    Object.assign(this, {
      orgId,
      role,
      userId,
    });
  }
}
