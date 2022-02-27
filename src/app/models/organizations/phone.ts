import { PhoneDTO } from 'generated/models';

export class Phone implements PhoneDTO {
  id: number;
  code: string;
  label: string;
  value: number;
  organizationId?: number;
  userId?: number;
  // To remove once DTO updated
  // eslint-disable-next-line id-blacklist
  number: string;

  constructor(phone: any) {
    const { code, label, value, organizationId, userId } = phone || {};
    Object.assign(this, { code, label, value, organizationId, userId });
  }
}
