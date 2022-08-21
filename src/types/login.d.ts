export interface ILogin {
  username: string;
  pwdOrCode: string;
  loginType: "PASSWORD" | "CODE";
}
