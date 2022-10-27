import { GroupRo } from 'generated/models/group-ro';

export class Group implements GroupRo {
  id?: number;
  active: boolean;
  description?: string;
  members?: number[];
  name: string;
  organization: number;
  parent: number;

  constructor(group: any) {
    const { active, description, members = [], name, organization, parent, id } = group || {};
    Object.assign(this, { id, active, description, members, name, organization, parent });
    if (id) {
      this.id = id;
    }
  }
}
