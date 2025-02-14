export type LoginForm = {
  username: string;
  password: string;
};

export type RootStackParamList = {
  Register: string;
  Login: string;
  RemindPassword: string;
  CustomerDetail: { customer: any };
  CustomerList: string;
};

export type LoginSuccess = {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: { id: string; username: string };
};
