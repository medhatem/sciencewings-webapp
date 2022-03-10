import { UserRO } from 'generated/models';
import { Phone } from './phone';
import { Address } from './address';

export class User implements UserRO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phones: Array<Phone>;
  address: Array<Address>;
  dateofbirth: string;
  keycloakId: string;

  constructor(user?: any) {
    const { firstname, lastname, email, phones, address, dateofbirth, keycloakId } = user || {};
    Object.assign(this, { firstname, lastname, email, phones, address, dateofbirth, keycloakId });
  }
}
