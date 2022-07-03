import { Address } from '../address';
import { CreateOrganizationRo } from 'generated/models';
import { OrganizationType } from './organization-type.enum';
import { Phone } from '../phone';

export class Organization implements CreateOrganizationRo {
  id?: string;
  description: string;
  department?: string;
  sector?: string;
  addresses: Address[];
  adminContact: number;
  direction: number;
  email: string;
  labels: string[];
  members: number[];
  name: string;
  phones: Phone[];
  socialFacebook?: string;
  socialGithub?: string;
  socialInstagram?: string;
  socialLinkedin?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  type: string;
  dealingType: string;
  timezone: string;
  parent?: number;

  constructor(organization: any) {
    const {
      id,
      description,
      department,
      sector,
      adminContact,
      direction,
      members,
      socialFacebook,
      socialGithub,
      socialInstagram,
      socialLinkedin,
      socialTwitter,
      socialYoutube,
      name = '',
      addresses = new Array<Address>(),
      type = OrganizationType.public,
      email = '',
      phones,
      labels,
      dealingType,
      parent,
      timezone,
    } = organization || {};
    Object.assign(this, {
      description,
      department,
      sector,
      addresses,
      adminContact,
      direction,
      email,
      labels,
      members,
      name,
      parent,
      phones,
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

export class UserOrganizations {
  id: number;
  name: string;

  constructor(organizationDto: any) {
    const { id, name } = organizationDto;
    Object.assign(this, { id, name });
  }
}
