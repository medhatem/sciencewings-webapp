import { AddressDto, AddressRo } from 'generated/models';

export class Address implements AddressRo {
  apartment?: string;
  city: string;
  code: string;
  country: string;
  organization?: number;
  province: string;
  street: string;
  type: 'USER' | 'ORGANIZATION';
  user?: number;

  constructor(address: any) {
    const { appartement, city, code, country = 'Canada', province, street, type = AddressType.user } = address || {};
    Object.assign(this, { appartement, city, code, country, province, street, type });
  }
}

export enum AddressType {
  user = 'USER',
  organization = 'ORGANIZATION',
}

export class GetAddress implements AddressDto {
  apartment?: string;
  city: string;
  code: string;
  country: string;
  id: number;
  province: string;
  street: string;
  type: string;

  constructor(project?: any) {
    const { apartment, city, code, province, id, street, type } = project || {};
    Object.assign(this, {
      apartment,
      city,
      code,
      province,
      id,
      street,
      type,
    });
  }
}
