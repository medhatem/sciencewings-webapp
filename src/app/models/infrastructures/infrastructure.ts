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
  dateStart: string;
  responsibles: Array<Member>;
  resources: Array<Member>;
  name: string;

  constructor(infrastructure?: any) {
    const { responsibles, dateStart, resources, name } = infrastructure || {};
    Object.assign(this, {
      responsibles,
      dateStart,
      resources,
      name,
    });
  }
}
