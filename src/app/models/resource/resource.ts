export class Resource {
  active: boolean;
  description?: string;
  managers?: Array<any>;
  tags?: Array<any>;
  name?: string;
  organization: number;
  resourceClass: string;
  resourceType: string;
  timezone: string;
  user: number;
  constructor(project?: any) {
    const { description, name, managers, organization, resourceClass, resourceType, timezone, active, user, tags } = project || {};
    Object.assign(this, {
      description,
      name,
      managers,
      organization,
      resourceClass,
      resourceType,
      timezone,
      active,
      user,
      tags,
    });
  }
}
