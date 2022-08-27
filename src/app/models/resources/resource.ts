import { CreateOrganizationRo, ResourceRo } from 'generated/models';
import { Infrastructure } from '../infrastructures/infrastructure';
import { Member } from '../members/member';

export class Resource implements ResourceRo {
  id: number;
  name: string;
  resourceClass: string;
  resourceType: string;
  organization: number;
  user?: number;
  timezone: string;
  dateStart?: Date;
  description: string;
  infrastructures: number[];
  constructor(resource: any) {
    const { id, name, resourceClass, resourceType, dateStart, infrastructures, description, organization } = resource || {};
    Object.assign(this, {
      id,
      name,
      resourceClass,
      resourceType,
      dateStart,
      infrastructures,
      organization,
      description,
    });

    if (id) {
      this.id = id;
    }
  }
}

export class ResourceListItem {
  name: string;
  resourceClass: string;
  resourceType: string;
  timezone: string;
  dateStart: string;
  infrastructures: Array<Infrastructure>;

  constructor(resource?: any) {
    const { name, resourceClass, resourceType, infrastructures, dateStart } = resource || {};
    Object.assign(this, {
      name,
      resourceClass,
      infrastructures,
      resourceType,
      dateStart,
    });
  }
}
