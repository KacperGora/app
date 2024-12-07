export type RegisterForm = {
  username: string
  password: string
  confirmPassword: string
}

export type InputChangeHandler = (key: keyof RegisterForm) => (value: string) => void
