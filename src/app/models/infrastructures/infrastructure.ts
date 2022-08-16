import { InfrastructureDto, InfrastructureRo } from 'generated/models';
import { Member } from '../members/member';
export class Infrastructure implements InfrastructureRo {
  id?: string;
  description?: string;
  key: string;
  name: string;
  organization: number;
  parent?: number;
  resources?: Array<number>;
  responsibles?: Array<number>;

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
  name: string;

  constructor(infrastructure?: any) {
    const { id, description, key, name } = infrastructure || {};
    Object.assign(this, {
      id,
      description,
      key,
      name,
    });
  }
}
