import { UserDetailsRO } from 'generated/models';
import { Phone } from './phone';
import { Address } from './address';

export class User implements UserDetailsRO {
  firstname: string;
  lastname: string;
  email: string;
  phones: Array<Phone>;
  // TODO: ask to replace address with and array of addresses in the backend
  address: string;
  addresses: Array<Address>;
  dateofbirth: string;
  // TODO: ask to add keycloak id in the backend
  keycloakid: string;

  constructor(user?: any) {
    const { firstname, lastname, email, phones, addresses, dateofbirth, keycloakid } = user || {};
    Object.assign(this, { firstname, lastname, email, phones, addresses, dateofbirth, keycloakid });
  }
}
