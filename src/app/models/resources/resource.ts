import { CreateOrganizationRo, ResourceRo } from 'generated/models';
import { Member } from '../members/member';

export class Resource implements ResourceRo {
  id: number;
  name: string;
  resourceClass: string;
  resourceType: string;
  organization: number;
  user?: number;
  description: string;
  constructor(resource: any) {
    const { id, name, resourceClass, resourceType, description, organization } = resource || {};
    Object.assign(this, {
      id,
      name,
      resourceClass,
      resourceType,
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
  dateStart: string;

  constructor(resource?: any) {
    const { name, resourceClass, resourceType, dateStart } = resource || {};
    Object.assign(this, {
      name,
      resourceClass,
      resourceType,
      dateStart,
    });
  }
}
