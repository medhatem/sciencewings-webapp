import { PhoneRo } from 'generated/models';

export class Phone implements PhoneRo {
  id: number;
  memberId?: number;
  phoneCode: string;
  phoneLabel: string;
  value: number;
  organizationId?: number;
  userId?: number;
  phoneNumber: string;

  constructor(phone: any) {
    const { phoneCode, phoneLabel, value, organizationId, userId, phoneNumber } = phone || {};
    Object.assign(this, { phoneCode, phoneLabel, value, organizationId, userId, phoneNumber });
  }
}
