import { AddressRo, PhoneRo, UserRo } from 'generated/models';

export class User implements UserRo {
  id?: number | string;
  actionId?: number;
  address: AddressRo;
  dateofbirth: string;
  email: string;
  firstname: string;
  keycloakId: string;
  lastname: string;
  phones: Array<PhoneRo>;
  share?: boolean;
  signature?: string;

  constructor(user: any) {
    const { id, actionId, email, address, dateofbirth, firstname, keycloakId, lastname, phones, share, signature } = user || {};
    Object.assign(this, { actionId, email, address, dateofbirth, firstname, keycloakId, lastname, phones, share, signature });
    if (id) {
      this.id = id;
    }
  }
}
