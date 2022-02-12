import { IOragnization } from './organization.interface';

export class Organization implements IOragnization {
  id?: string;
  name: string;
  address: any;
  type: any;
  dealingType: any;
  email: any;
  organizationNumber?: string;
  isSubOrganization?: boolean;
  parentId?: string;
  phones?: any[];
  description?: string;
  labels?: any[];
  department?: any;
  sector?: any;
  socialMedia?: any[];

  constructor(organization?: IOragnization) {
    const {
      id,
      name = '',
      address,
      type,
      dealingType,
      email = '',
      organizationNumber,
      isSubOrganization = false,
      parentId,
      phones,
      description,
      labels,
      department,
      sector,
      socialMedia,
    } = organization || {};
    Object.assign(this, {
      id,
      name,
      address,
      type,
      dealingType,
      email,
      organizationNumber,
      isSubOrganization,
      parentId,
      phones,
      description,
      labels,
      department,
      sector,
      socialMedia,
    });
  }
}
