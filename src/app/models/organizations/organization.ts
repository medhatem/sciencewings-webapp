//import { IOragnization } from './organization.interface';
import { CreateOrganizationRO } from 'generated/models/create-organization-ro';

export class Organization implements CreateOrganizationRO {
  name: string;
  address: any;
  type: any;
  dealingType: any;
  email: any;
  organizationNumber?: string;
  isSubOrganization?: boolean;
  parentId?: string;
  phones: any[];
  description?: string;
  labels: any[];
  department?: any;
  sector?: any;
  socialMedia?: any[];
  adminContact: number;
  direction: number;
  members: number[];

  constructor(organization?: CreateOrganizationRO) {
    const {
      name = '',
      address,
      type,
      email = '',
      parentId,
      phones,
      labels,
    } = organization || {};
    Object.assign(this, {
      name,
      address,
      type,  
      email,
      parentId,
      phones,
      labels,
    });
  }
}
