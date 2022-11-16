import { PermissionDto } from 'generated/models';

export class Permission implements PermissionDto {
  id?: number;
  module: string;
  name: string;
  operation: string;
  statusCode: number;
  constructor(permission?: any) {
    const { id, module, name, operation } = permission || {};

    Object.assign(this, {
      id,
      module,
      name,
      operation,
    });
  }
}
