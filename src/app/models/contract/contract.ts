import { ContracBaseBodyDto, CreateContractRo, JobBaseBodyGetDto, MemberDto } from 'generated/models';

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
  contractType?: 'Cdd' | 'Cdi';
  dateEnd?: string;
  dateStart?: string;
  description?: string;
  id: number;
  job?: JobBaseBodyGetDto;
  jobLevel?: 'Intern' | 'Junior' | 'Midlle' | 'Mid-senior' | 'Senior';
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
