import { ContracBaseBodyDto, CreateContractRo, JobBaseBodyGetDto, MemberDto } from 'generated/models';

export class ContractRo implements CreateContractRo {
  contractType?: 'Permanant' | 'Contract base';
  dateEnd?: string;
  dateStart: string;
  description?: string;
  jobLevel?: 'Internship' | 'Junior' | 'Midlle' | 'Mid-senior' | 'Senior';
  name: string;
  organization: number;
  supervisor?: number;
  user: number;
  wage?: number;

  constructor(contract: any) {
    const { contractType, dateEnd, dateStart, description, jobLevel, name, organization, supervisor, user, wage } = contract || {};
    Object.assign(this, {
      contractType,
      dateEnd,
      dateStart,
      description,
      jobLevel,
      name,
      organization,
      supervisor,
      user,
      wage,
    });
  }
}
