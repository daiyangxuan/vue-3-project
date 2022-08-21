import { RowItem } from "./user";

export interface RoleItem {
  roleId: string;
  orgId: string;
  mobile?: string;
  name?: string;
  username?: string;
  email?: string;
  orgName?: string;
  depName?: string;
  postName?: string;
  status?: string;
  roleUserList?: RowItem[];
  tag?: string;
}

export interface ICreateInfo {
  create: boolean;
  visible: boolean;
  orgName?: string;
  orgId?: string;
  searchValue?: string;
  roleUserList?: RowItem[];
  checked?: boolean;
  roleId?: string;
  roleName?: string;
}
export interface IUpdateParams {
  menuIds: string[];
  operationIds: string[];
  orgId: string;
  roleName: string;
  userIds: string[];
  roleId?: string;
}
