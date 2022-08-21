export interface RowItem {
  orgId: string;
  depId?: string;
  postId?: string;
  mobile?: string;
  name?: string;
  username?: string;
  email?: string;
  roleIdList?: string[];
  id: string;
  depName?: string;
  orgName?: string;
  postName?: string;
  status?: string;
}

export interface CreateParams {
  orgId: string;
  depId?: string;
  postId?: string;
  mobile?: string;
  name?: string;
  username?: string;
  email?: string;
  roleIdList?: string[];
  id?: string;
  depName?: string;
  orgName?: string;
  postName?: string;
  status?: string;
}

export interface IPwParams {
  confirmPassword?: string;
  newPassword?: string;
  password?: string;
  userId?: string;
}
export interface InfoProp {
  depName?: string;
  email?: string;
  headPic?: string;
  orgName?: string;
  name?: string;
  id?: string;
  mobile?: string,
  changePassword?: boolean;
  sys?: boolean;
  orgId?: string;
}

export interface CreateName {
  orgName?: string;
  depName?: string;
  postName?: string;
}
