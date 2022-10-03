import { PhoneRo } from 'generated/models';

export class Phone implements PhoneRo {
  id?: number;
  memberId?: number;
  organizationId?: number;
  phoneCode: string;
  phoneLabel: string;
  phoneNumber: string;
  userId?: number;

  constructor(phone: any) {
    const { phoneCode = '1', phoneLabel = 'User', organizationId, userId, phoneNumber } = phone || {};
    Object.assign(this, { phoneCode, phoneLabel, organizationId, userId, phoneNumber });
  }
}
