import { AddressOrganizationDTO } from 'generated/models';

export class Address implements AddressOrganizationDTO {
  appartement: number;
  city: string;
  code: string;
  country: string;
  province: string;
  street: string;
  type: 'USER' | 'ORGANIZATION';

  constructor(address: any) {
    const { appartement, city, code, country, province, street, type } = address || {};
    Object.assign(this, { appartement, city, code, country, province, street, type });
  }
}
