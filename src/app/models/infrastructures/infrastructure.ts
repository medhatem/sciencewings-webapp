import { InfrastructureDto, InfrastructureRo } from 'generated/models';
import { Member } from '../members/member';
import { Resource } from '../resources/resource';
export class Infrastructure implements InfrastructureRo {
  id?: string;
  description?: string;
  key: string;
  name: string;
  organization: number;
  parent?: number;
  resources?: number[];
  dateStart?: Date;
  responsibles: number[];

  constructor(infrastructure: any) {
    const { id, description, key, dateEnd, dateStart, responsibles, organization, parent, resources, name } = infrastructure || {};

    Object.assign(this, {
      description,
      key,
      dateEnd,
      dateStart,
      responsibles,
      organization,
      parent,
      resources,
      name,
    });
    if (id) {
      this.id = id;
    }
  }
}
export class InfrastructureListItem {
  id: number;
  description: string;
  key: string;
  responsibles: Array<Member>;
  resources: Array<Resource>;
  dateStart?: Date;
  name: string;

  constructor(infrastructure?: any) {
    const { id, name, key, dateStart, resources, description } = infrastructure || {};
    Object.assign(this, {
      id,
      name,
      key,
      resources,
      dateStart,
      description,
    });
  }
}
