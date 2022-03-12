export class UserOrganizations {
  id: number | string;
  name: string;
  parent: UserOrganizations;
  statusCode: number;
  constructor(userOrganizations: any) {
    const { id, name, parent, statusCode } = userOrganizations || {};
    Object.assign(this, { id, name, parent, statusCode });
  }
}
