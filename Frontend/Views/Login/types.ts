export type LoginForm = {
  username: string
  password: string
}

export type RootStackParamList = {
  Register: string
  CustomerDetail: { customer: any }
}

export type LoginSuccess = {
  message: string
  accessToken: string
  refreshToken: string
  user: { id: string; username: string }
}
