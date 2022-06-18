import { Address } from '../address';
import { CreateOrganizationRo } from 'generated/models';
import { Phone } from '../phone';
import { OrganizationType } from './organization-type.enum';

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
  parentId?: number;
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
      type = OrganizationType.PUBLIC,
      email = '',
      parentId,
      phones,
      labels,
      dealingType,
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
      parentId,
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
    Object.assign(id, name);
  }
}
