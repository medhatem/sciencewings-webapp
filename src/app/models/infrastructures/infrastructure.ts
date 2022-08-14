import { InfrastructureDto, InfrastructureRo } from 'generated/models';
export class Infrastructure implements InfrastructureRo {
  description?: string;
  key: string;
  name: string;
  organization: number;
  parent?: number;
  resources?: Array<number>;
  responsibles?: Array<number>;

  constructor(infrastructure: any) {
    const { description, key, dateEnd, dateStart, responsibles, organization, parent, resources, name } = infrastructure || {};

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
  }
}
