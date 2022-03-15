import { UserRO } from 'generated/models';
import { Phone } from '.';
import { Address } from './address';

export class User implements UserRO {
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  firstname: string;
  lastname: string;
  addresses: Array<Address>;
  phones: Array<Phone>;
  dateofbirth: string;
  keycloakId: string;

  constructor(user?: any) {
    const { id, name, email, avatar, status, firstname, lastname, addresses, phones, dateofbirth, keycloakId } = user || {};
    Object.assign(this, { id, name, email, avatar, status, firstname, lastname, addresses, phones, dateofbirth, keycloakId });
  }
}
