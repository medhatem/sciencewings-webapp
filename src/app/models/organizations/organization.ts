import { CreateOrganizationRO } from 'generated/models';
import { Address } from './address';
import { Phone } from './phone';

export class Organization implements CreateOrganizationRO {
  id?: string;
  description?: string;
  department?: string;
  sector?: string;
  address: Address[];
  adminContact: number;
  direction: number;
  email: string;
  labels: string[];
  members: number[];
  name: string;
  parentId?: string;
  phones: Phone[];
  socialFacebook?: string;
  socialGithub?: string;
  socialInstagram?: string;
  socialLinkedin?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  type: string;
  dealingType: string;

  constructor(organization?: any) {
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
      address,
      type,
      email = '',
      parentId,
      phones,
      labels,
      dealingType,
    } = organization || {};
    Object.assign(this, {
      id,
      description,
      department,
      sector,
      address,
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
    });
  }
}
