import { ContracBaseBodyDto, CreateContractRo, JobBaseBodyGetDto, MemberDto, UpdateContractRo } from 'generated/models';

export class ContractRo implements CreateContractRo {
  contractType: 'Permanant' | 'Contract base';
  dateEnd?: string;
  dateStart: string;
  description?: string;
  jobLevel: 'Internship' | 'Junior' | 'Midlle' | 'Mid-senior' | 'Senior';
  name: string;
  organization: number;
  supervisor?: number;
  user: number;
  wage: number;

  constructor(project: any) {
    const { contractType, dateEnd, dateStart, description, jobLevel, name, organization, supervisor, user, wage } = project || {};
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

export const ContractType = ['Permanant', 'Contract base'];
export const JobLevel = ['Internship', 'Junior', 'Midlle', 'Mid-senior', 'Senior'];

export class GetContract implements ContracBaseBodyDto {
  contractType: 'Permanant' | 'Contract base';
  dateEnd?: string;
  dateStart?: string;
  description?: string;
  id: number;
  job?: JobBaseBodyGetDto;
  jobLevel: 'Internship' | 'Junior' | 'Midlle' | 'Mid-senior' | 'Senior';
  member?: MemberDto;
  organization?: number;
  statusCode: number;
  supervisor?: MemberDto;
  wage?: number;

  constructor(contract: any) {
    const { contractType, dateEnd, dateStart, description, jobLevel, name, organization, job, supervisor, user, wage, id } = contract || {};
    Object.assign(this, {
      contractType,
      dateEnd,
      dateStart,
      description,
      jobLevel,
      name,
      organization,
      job,
      supervisor,
      user,
      wage,
      id,
    });
  }
}

export class UpdateContract implements UpdateContractRo {
  contractType?: 'Permanant' | 'Contract base';
  dateEnd?: string;
  dateStart?: string;
  description?: string;
  jobLevel?: 'Internship' | 'Junior' | 'Midlle' | 'Mid-senior' | 'Senior';
  jobName?: string;
  organization: number;
  state?: 'Working' | 'Banned';
  supervisor?: number;
  user?: number;
  wage?: number;

  constructor(project: any) {
    const { contractType, dateEnd, dateStart, description, jobLevel, jobName, organization, supervisor, user, wage } = project || {};
    Object.assign(this, {
      contractType,
      dateEnd,
      dateStart,
      description,
      jobLevel,
      jobName,
      organization,
      supervisor,
      user,
      wage,
    });
  }
}
