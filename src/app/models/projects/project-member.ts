import { ProjectMemberRo } from 'generated/models';

export class projectMember implements ProjectMemberRo {
  orgId: number;
  role: string;
  status: string;
  userId: number;
  constructor(participant?: any) {
    const { orgId, role, status, userId } = participant || {};

    Object.assign(this, {
      orgId,
      role,
      status,
      userId,
    });
  }
}
