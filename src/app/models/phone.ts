import { PhoneRO } from 'generated/models';

export class Phone implements PhoneRO {
  phoneCode: string;
  phoneLabel: string;
  value: number;
  organizationId?: number;
  userId?: number;
  phoneNumber: string;

  constructor(phone: any) {
    const { code, label, value, organizationId, userId } = phone || {};
    Object.assign(this, { code, label, value, organizationId, userId });
  }
}
