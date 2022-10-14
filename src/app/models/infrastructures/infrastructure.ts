import { MemberDto, ResponsableObjectDto, InfrastructureRo, InfrastructureDto, UpdateinfrastructureRo, ResourceDto, SubInfraListLineObjectDto, SubInfraObjectDto } from 'generated/models';

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
  infrastructureDto: InfrastructureDto;

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

export class InfrastructureListItem implements InfrastructureDto {
  id: number;
  description: string;
  key: string;
  resources?: ResourceDto[];
  responsible?: MemberDto;
  resourcesNb: number[];
  dateStart?: Date;
  name: string;
  statusCode: number;
  infrastructureDto: InfrastructureDto;

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

export class SubInfrastructureList implements SubInfraListLineObjectDto {
  resourcesNb: number;
  statusCode: number;
  subInfrastructure: SubInfraObjectDto;

  constructor(infrastructure? : any){
    const { subInfrastructure, resourcesNb, statusCode} = infrastructure || {};

    Object.assign(this, {
      subInfrastructure,
      resourcesNb,
      statusCode 
    });

  }
}

export class ListMember implements MemberDto {
  active: boolean;
  joinDate: string;
  name: string;
  organization?: number;
  status: string;
  statusCode: number;
  user?: number;
  workEmail: string;

  constructor(infrastructure?: any) {
    const { user, name, active, statusCode } = infrastructure || {};

    Object.assign(this, {
      name,
      user,
      active,
      statusCode,
    });
  }
}

export class UpdateInfrastructure implements UpdateinfrastructureRo {
  name?: string;
  key?: any;
  responsible?: number;
  parent?: number;
  resources?: Array<number>;
  description?: string;
  organization?: number;

  constructor(infrastructure: any) {
    const { name, key, responsible, parent, description } = infrastructure || {};

    Object.assign(this, {
      name,
      key,
      responsible,
      parent,
      description,
    });
  }
}
