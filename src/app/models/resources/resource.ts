import {
  GetResourceSettingsBodyDto,
  MemberDto,
  OrganizationInformationDto,
  ResourceCalendarDto,
  ResourceCalendarRo,
  ResourceDto,
  ResourceRo,
  ResourceStatusDto,
  ResourceTagDto,
  ResourceTagRo,
  UpdateResourceRo,
} from 'generated/models';
import { Infrastructure } from '../infrastructures/infrastructure';
import { GetOrganization } from '../organizations/organization';

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
  organization: GetOrganization;
  id: number;
  managers: Array<MemberDto>;
  name: string;
  resourceClass: string;
  resourceType: string;
  settings: GetResourceSettingsBodyDto;
  status: ResourceStatusDto;
  statusCode: number;
  tags: Array<ResourceTagDto>;
  timezone: string;
  user: number;
  constructor(resource: any) {
    const { active, calendar, description, id, managers, name, resourceClass, resourceType, tags, timezone, user, settings, status } =
      resource || {};
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
      settings,
      status,
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
  managers: Array<MemberDto>;
  name: string;
  organization: OrganizationInformationDto;
  resourceClass: string;
  resourceType: string;
  settings: GetResourceSettingsBodyDto;
  status: ResourceStatusDto;
  statusCode: number;
  tags: Array<ResourceTagDto>;
  timezone: string;
  user: number;

  constructor(resource?: any) {
    const { id, name, resourceClass, resourceType, active, infrastructures, managers, settings, status } = resource || {};
    Object.assign(this, {
      name,
      resourceClass,
      infrastructures,
      resourceType,
      active,
      managers,
      id,
      settings,
      status,
    });
  }
}
