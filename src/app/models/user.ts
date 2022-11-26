import { AddressDto, AddressRo, PhoneDto, PhoneInformationDto, PhoneRo, UserDto, UserIdDto, UserRo } from 'generated/models';
import { GetAddress } from './address';
import { Phone } from './phone';

export class UserRequestObject implements UserRo {
  id?: number | string;
  email: string;
  actionId?: number;
  address: AddressRo;
  dateofbirth: string;
  firstname: string;
  keycloakId: string;
  lastname: string;
  phones: PhoneRo[];
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

export class User implements UserDto {
  address: AddressDto;
  email: string;
  firstname: string;
  id: number;
  keycloakId: string;
  lastname: string;
  phones: Array<Phone>;
  statusCode: number;
  dateofbirth: string;

  constructor(user: any) {
    const { id, actionId, email, address, dateofbirth, firstname, keycloakId, lastname, phones, share, signature } = user || {};
    Object.assign(this, { actionId, email, address, dateofbirth, firstname, keycloakId, lastname, phones, share, signature });
    if (id) {
      this.id = id;
    }
  }
}

export class userPhone implements PhoneRo {
  id?: number;
  memberId?: number;
  organizationId?: number;
  phoneCode: string;
  phoneLabel: string;
  phoneNumber: string;
  userId?: number;

  constructor(phone: any) {
    const { id, phoneNumber } = phone || {};
    Object.assign(this, { phoneNumber });
    if (id) {
      this.id = id;
    }
  }
}
