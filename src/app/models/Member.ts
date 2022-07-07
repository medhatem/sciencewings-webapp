import { Address } from './address';
import { MemberRo } from 'generated/models';
import { Phone } from './phone';

export class Member implements MemberRo {
  active?: boolean;
  additionalNote?: string;
  address?: Address;
  addressHome?: Address;
  birthday?: string;
  certificate?: string;
  children?: number;
  departureDate?: string;
  departureDescription?: string;
  emergencyContact?: string;
  emergencyPhone?: Phone;
  gender?: string;
  id?: number;
  identificationId?: string;
  jobTitle?: string;
  marital?: string;
  memberType?: string;
  membership?: 'accepted' | 'rejected' | 'pending';
  mobilePhone?: Phone;
  name?: string;
  notes?: string;
  organization?: number;
  passportId?: string;
  permitNo?: string;
  placeOfBirth?: string;
  resource?: number;
  spouseBirthdate?: string;
  spouseCompleteName?: string;
  status?: 'INVITATION_PENDING' | 'ACTIVE';
  studyField?: string;
  studySchool?: string;
  visaExpire?: string;
  visaNo?: string;
  workEmail?: string;
  workLocation?: Address;
  workPermitExpirationDate?: string;
  workPermitScheduledActivity?: boolean;
  workPhone?: Phone;

  constructor(member: any) {
    const {
      active,
      additionalNote,
      address,
      addressHome,
      birthday,
      certificate,
      children,
      departureDate,
      departureDescription,
      emergencyContact,
      emergencyPhone,
      gender,
      id,
      identificationId,
      jobTitle,
      marital,
      memberType,
      membership,
      mobilePhone,
      name,
      notes,
      organization,
      passportId,
      permitNo,
      placeOfBirth,
      resource,
      spouseBirthdate,
      spouseCompleteName,
      status,
      studyField,
      studySchool,
      visaExpire,
      visaNo,
      workEmail,
      workLocation,
      workPermitExpirationDate,
      workPermitScheduledActivity,
      workPhone,
    } = member || {};
    Object.assign(this, {
      active,
      additionalNote,
      address,
      addressHome,
      birthday,
      certificate,
      children,
      departureDate,
      departureDescription,
      emergencyContact,
      emergencyPhone,
      gender,
      id,
      identificationId,
      jobTitle,
      marital,
      memberType,
      membership,
      mobilePhone,
      name,
      notes,
      organization,
      passportId,
      permitNo,
      placeOfBirth,
      resource,
      spouseBirthdate,
      spouseCompleteName,
      status,
      studyField,
      studySchool,
      visaExpire,
      visaNo,
      workEmail,
      workLocation,
      workPermitExpirationDate,
      workPermitScheduledActivity,
      workPhone,
    });

    if (id) {
      this.id = id;
    }
  }
}
