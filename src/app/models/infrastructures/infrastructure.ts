import {
  CreateOrganizationRo,
  MemberDto,
  InfrastructureDto,
  InfrastructureListBodyDto,
  InfrastructureResponsableObjectDto,
  ResponsableObjectDto,
  InfrastructureRo,
} from 'generated/models';
import { Member, OrganizationMembers } from '../members/member';
import { Resource } from '../resources/resource';
export class Infrastructure implements InfrastructureRo {
  id?: string;
  description?: string;
  key: string;
  name: string;
  default?: boolean = false;
  organization: number;
  members: number[];
  parent?: number;
  resources?: number[];
  resourcesNb?: number[];
  dateStart?: Date;
  responsible: number;

  constructor(infrastructure: any) {
    const { id, description, key, dateEnd, dateStart, organization, responsible, members, parent, resources, resourcesNb, name } =
      infrastructure || {};

    Object.assign(this, {
      description,
      key,
      dateEnd,
      dateStart,
      organization,
      members,
      parent,
      resources,
      responsible,
      resourcesNb,
      name,
    });
    if (id) {
      this.id = id;
    }
  }
}

export class ResponsableDto implements ResponsableObjectDto {
  email: string;
  member: MemberDto;
  name: string;
  statusCode: number;

  constructor(responsible?: any) {
    const { email, member, name } = responsible || {};
    Object.assign(this, {
      email,
      member,
      name,
    });
  }
}

export class InfrastructureListItem {
  id: number;
  description: string;
  key: string;
  responsible: ResponsableDto;
  resources: Array<Resource>;
  resourcesNb: number[];
  dateStart?: Date;
  name: string;

  constructor(infrastructure?: any) {
    const { id, name, key, dateStart, resources, resourcesNb, responsible, description } = infrastructure || {};
    Object.assign(this, {
      id,
      name,
      key,
      responsible,
      resources,
      resourcesNb,
      dateStart,
      description,
    });
  }
}
