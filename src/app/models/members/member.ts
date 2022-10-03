import {
  AddressDto,
  CreateOrganizationRo,
  MemberBodyDto,
  MemberDto,
  MemberRo,
  OrganizationDto,
  PhoneInformationDto,
  UserDto,
} from 'generated/models';

export class Member implements MemberRo {
  id?: number;
  active?: boolean;
  additionalNote?: string;
  birthday?: string;
  certificate?: string;
  children?: number;
  departureDate?: string;
  departureDescription?: string;
  emergencyContact?: string;
  gender?: string;
  identificationId?: string;
  jobTitle?: string;
  marital?: string;
  memberType?: 'admin' | 'regular';
  membership?: 'accepted' | 'rejected' | 'pending';
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
  workPermitExpirationDate?: string;
  workPermitScheduledActivity?: boolean;

  constructor(member: any) {
    const {
      id,
      active,
      additionalNote,
      birthday,
      certificate,
      children,
      departureDate,
      departureDescription,
      emergencyContact,
      gender,
      identificationId,
      jobTitle,
      marital,
      memberType,
      membership,
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
      workPermitExpirationDate,
      workPermitScheduledActivity,
    } = member || {};
    Object.assign(this, {
      id,
      active,
      additionalNote,
      birthday,
      certificate,
      children,
      departureDate,
      departureDescription,
      emergencyContact,
      gender,
      identificationId,
      jobTitle,
      marital,
      memberType,
      membership,
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
      workPermitExpirationDate,
      workPermitScheduledActivity,
    });

    if (id) {
      this.id = id;
    }
  }
}
export class OrganizationMembers implements MemberDto {
  id: number;
  name: string;
  active: boolean;
  joinDate: string;
  organization: number;
  status: string;
  statusCode: number;
  user: number;
  workEmail: string;

  constructor(memberDto: any) {
    const { id, name, user } = memberDto;
    Object.assign(this, { id, name, user });
  }
}

export class MemberProfile implements MemberProfile {
  address: AddressDto;
  jobTitle: string;
  name: string;
  status: string;
  statusCode: number;
  workEmail: string;
  workPhone: PhoneInformationDto;

  constructor(memberDto: any) {
    const { address, name } = memberDto;
    Object.assign(this, { address, name });
  }
}
