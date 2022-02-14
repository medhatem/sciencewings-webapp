export interface IOragnization {
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
}
