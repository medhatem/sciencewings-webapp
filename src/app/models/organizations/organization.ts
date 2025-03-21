import { Address } from '../address';
import {
  AddressDto,
  AddressRo,
  CreateOrganizationRo,
  OrganizationAccessSettingsRo,
  OrganizationInformationDto,
  OrganizationMemberSettingsRo,
  OrganizationReservationSettingsRo,
  OrganizationSettingsBodyDto,
  PhoneInformationDto,
  PhoneRo,
  UpdateOrganizationRo,
  UserDto,
} from 'generated/models';
import { OrganizationType } from './organization-type.enum';
import { Phone } from '../phone';

export class GetOrganization implements OrganizationInformationDto {
  address?: AddressDto;
  description?: string;
  email?: string;
  id: number;
  labels?: Array<OrganizationInformationDto>;
  name?: string;
  owner?: UserDto;
  parent?: OrganizationInformationDto;
  phone?: PhoneInformationDto;
  settings?: OrganizationSettingsBodyDto;
  statusCode: number;
  type?: string;

  constructor(organization: any) {
    const { address, description, email, id, name, owner, phone, statusCode, type, settings, labels, parent } = organization || {};

    Object.assign(this, {
      address,
      description,
      email,
      id,
      name,
      owner,
      phone,
      statusCode,
      type,
      settings,
      labels,
      parent,
    });

    if (id) {
      this.id = id;
    }
  }
}

export class Organization implements CreateOrganizationRo {
  id?: string;
  address: AddressRo;
  email: string;
  labels: Array<string>;
  members: Array<number>;
  name: string;
  parent?: number;
  description: string;
  phone?: PhoneRo;
  socialFacebook?: string;
  socialGithub?: string;
  socialInstagram?: string;
  socialLinkedin?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  type: string;

  constructor(organization: any) {
    const {
      id,
      description,
      department,
      sector,
      adminContact,
      owner,
      members,
      responsible,
      socialFacebook,
      socialGithub,
      socialInstagram,
      socialLinkedin,
      socialTwitter,
      socialYoutube,
      name = '',
      address,
      type = OrganizationType.public,
      email = '',
      phone,
      labels,
      dealingType,
      parent,
      timezone,
    } = organization || {};

    Object.assign(this, {
      description,
      department,
      sector,
      address,
      adminContact,
      owner,
      email,
      labels,
      members,
      name,
      responsible,
      parent,
      phone,
      socialFacebook,
      socialGithub,
      socialInstagram,
      socialLinkedin,
      socialTwitter,
      socialYoutube,
      type,
      dealingType,
      timezone,
    });

    if (id) {
      this.id = id;
    }
  }
}

export class UpdateOrganization implements UpdateOrganizationRo {
  description?: string;
  owner?: number;
  email?: string;
  labels?: Array<string>;
  name?: string;
  parent?: number;
  socialFacebook?: string;
  socialGithub?: string;
  socialInstagram?: string;
  socialLinkedin?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  type?: string;

  constructor(organization: any) {
    const {
      description,
      owner,
      email,
      labels,
      name,
      parent,
      socialFacebook,
      socialGithub,
      socialInstagram,
      socialLinkedin,
      socialTwitter,
      socialYoutube,
      type,
    } = organization || {};

    Object.assign(this, {
      description,
      owner,
      email,
      labels,
      name,
      parent,
      socialFacebook,
      socialGithub,
      socialInstagram,
      socialLinkedin,
      socialTwitter,
      socialYoutube,
      type,
    });
  }
}

export class UpdateOrganizationMemberSettingsRo implements OrganizationMemberSettingsRo {
  acountNumberNote: string;
  allowMembersToSeeAllOtherMembers: boolean;
  membersCanEditAccountNumbers: boolean;
  promptForAccouantNumbers: boolean;

  constructor(settings?: any) {
    const { acountNumberNote, allowMembersToSeeAllOtherMembers, membersCanEditAccountNumbers, promptForAccouantNumbers } = settings || {};
    Object.assign(this, {
      acountNumberNote,
      allowMembersToSeeAllOtherMembers,
      membersCanEditAccountNumbers,
      promptForAccouantNumbers,
    });
  }
}

export class UpdateOrganizationReservationSettingsRo implements OrganizationReservationSettingsRo {
  approversCanEditReservations?: boolean;
  attachedIcsCalendarFeeds?: boolean;
  confirmationEmailWhenMakingReservation?: string;
  emailAddressToReceiveReservationReplyMessages?: Array<string>;
  hideAccountNumberWhenMakingReservation?: 'EVERYONE' | 'MEMBER';
  hideOrganizationCalendar?: boolean;
  requireReasonWhenEditingReservation?: boolean;
  showResourceImagesInReservation?: boolean;

  constructor(settings?: any) {
    const {
      approversCanEditReservations,
      attachedIcsCalendarFeeds,
      confirmationEmailWhenMakingReservation,
      emailAddressToReceiveReservationReplyMessages,
      hideAccountNumberWhenMakingReservation,
      hideOrganizationCalendar,
      requireReasonWhenEditingReservation,
      showResourceImagesInReservation,
    } = settings || {};

    Object.assign(this, {
      approversCanEditReservations,
      attachedIcsCalendarFeeds,
      confirmationEmailWhenMakingReservation,
      emailAddressToReceiveReservationReplyMessages,
      hideAccountNumberWhenMakingReservation,
      hideOrganizationCalendar,
      requireReasonWhenEditingReservation,
      showResourceImagesInReservation,
    });
  }
}

export class UpdateOrganizationAccessSettingsRo implements OrganizationAccessSettingsRo {
  anyMemberCanJoinYourOrganizationAndAccessResourceSchedules?: boolean;
  joinCode?: string;
  listResourceToNonMembers?: boolean;
  messageSentToNewMembers?: string;
  notifyAdministratorsWhenMembersJoinOrganization?: boolean;
  yourOrganizationWillNeverAppearInSearchResults?: boolean;

  constructor(settings?: any) {
    const {
      anyMemberCanJoinYourOrganizationAndAccessResourceSchedules,
      joinCode,
      listResourceToNonMembers,
      messageSentToNewMembers,
      notifyAdministratorsWhenMembersJoinOrganization,
      yourOrganizationWillNeverAppearInSearchResults,
    } = settings || {};

    Object.assign(this, {
      anyMemberCanJoinYourOrganizationAndAccessResourceSchedules,
      joinCode,
      listResourceToNonMembers,
      messageSentToNewMembers,
      notifyAdministratorsWhenMembersJoinOrganization,
      yourOrganizationWillNeverAppearInSearchResults,
    });
  }
}
