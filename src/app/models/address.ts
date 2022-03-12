import { AddressRO } from 'generated/models';

export class Address implements AddressRO {
  id: number;
  apartment: string;
  city: string;
  code: string;
  country: string;
  province: string;
  street: string;
  type: AddressType;

  constructor(address?: any) {
    const { appartement, city, code, country, province, street, type } = address || {};
    Object.assign(this, { appartement, city, code, country, province, street, type });
  }
}

export enum AddressType {
  user = 'USER',
  organization = 'ORGANIZATION',
}
