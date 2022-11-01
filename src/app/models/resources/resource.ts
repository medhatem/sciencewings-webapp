import {
  ResourceCalendarDto,
  ResourceCalendarRo,
  ResourceDto,
  ResourceManagerDto,
  ResourceRo,
  ResourceTagDto,
  ResourceTagRo,
  UpdateResourceRo,
} from 'generated/models';
import { Infrastructure } from '../infrastructures/infrastructure';

export class Resource implements ResourceRo {
  description?: string;
  infrastructure: number;
  managers?: Array<number>;
  name: string;
  organization: number;
  resourceClass: string;
  resourceType: string;
  constructor(resource: any) {
    const { id, name, managers, resourceClass, resourceType, infrastructure, description, organization } = resource || {};
    Object.assign(this, {
      id,
      name,
      managers,
      resourceClass,
      resourceType,
      infrastructure,
      organization,
      description,
    });
  }
}

export class GetResource implements ResourceDto {
  active: boolean;
  calendar: Array<ResourceCalendarDto>;
  description: string;
  id: number;
  managers: Array<ResourceManagerDto>;
  name: string;
  resourceClass: string;
  resourceType: string;
  tags: Array<ResourceTagDto>;
  timezone: string;
  user: number;
  constructor(resource: any) {
    const { active, calendar, description, id, managers, name, resourceClass, resourceType, tags, timezone, user } = resource || {};
    Object.assign(this, {
      active,
      calendar,
      description,
      id,
      managers,
      name,
      resourceClass,
      resourceType,
      tags,
      timezone,
      user,
    });
  }
}

export class UpdateResource implements UpdateResourceRo {
  active?: boolean;
  calendar?: Array<ResourceCalendarRo>;
  description?: string;
  infrastructure?: number;
  name?: string;
  organization: number;
  resourceClass?: string;
  resourceType?: string;
  tags?: Array<ResourceTagRo>;
  timezone?: string;
  user?: number;
  constructor(resource: any) {
    const { active, calendar, tags, timezone, user, name, managers, resourceClass, resourceType, infrastructure, description, organization } =
      resource || {};
    Object.assign(this, {
      active,
      calendar,
      tags,
      timezone,
      user,
      name,
      managers,
      resourceClass,
      resourceType,
      infrastructure,
      description,
      organization,
    });
  }
}

export class ResourceListItem implements ResourceDto {
  active: boolean;
  calendar: Array<ResourceCalendarDto>;
  description: string;
  id: number;
  managers: Array<ResourceManagerDto>;
  name: string;
  resourceClass: string;
  resourceType: string;
  tags: Array<ResourceTagDto>;
  timezone: string;
  user: number;
  dateStart: string;
  infrastructures: Array<Infrastructure>;

  constructor(resource?: any) {
    const { id, name, resourceClass, resourceType, active, infrastructures, managers, dateStart } = resource || {};
    Object.assign(this, {
      name,
      resourceClass,
      infrastructures,
      resourceType,
      active,
      dateStart,
      managers,
      id,
    });
  }
}
