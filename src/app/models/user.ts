export class User /* implements UserRO */ {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  firstName: string;
  lastName: string;

  constructor(user?: any) {
    const { id, name, email, avatar, status, firstName, lastName } = user || {};
    Object.assign(this, { id, name, email, avatar, status, firstName, lastName });
  }
}
