import { MemberDto } from 'generated/models';

export enum ProjectTypeTrasnlation {
  intern = 'ORGANIZATION.PROJECTS.FORM.TYPE_1',
  extern = 'ORGANIZATION.PROJECTS.FORM.TYPE_2',
}

export enum ProjectType {
  intern = 'Intern',
  extern = 'Extern',
}

export class ResponsableObjectDTO {
  id?: number;
  member: MemberDto;
  name: string;
  email: string;
}
