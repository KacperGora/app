const MINIMUM_PASSWORD_LENGTH = 6
const hasCapitalLetter = (password: string) => /[A-Z]/.test(password)
const hasSpecialCharacter = (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password)
const hasNumber = (password: string) => /\d/.test(password)

export const getPasswordStrength = (password: string): number => {
  const criteria = [
    password.length >= MINIMUM_PASSWORD_LENGTH,
    hasCapitalLetter(password),
    hasSpecialCharacter(password),
    hasNumber(password),
  ]
  return criteria.reduce((strength, met) => strength + (met ? 1 : 0), 0)
}

export const getPasswordMessage = (password: string, passwordConfirmation: string): string => {
  if (password.length < MINIMUM_PASSWORD_LENGTH) return 'form.passwordLengthError'
  if (!hasCapitalLetter(password)) return 'form.passwordCapitalLetterError'
  if (!hasSpecialCharacter(password)) return 'form.passwordSpecialCharacterError'
  if (!hasNumber(password)) return 'form.passwordNumberError'
  if (password !== passwordConfirmation) return 'form.passwordMatchError'
  return 'form.passwordMetRequirements'
}

const colors = {
  weak: '#ff0000',
  fair: '#ff7f00',
  good: '#ffff00',
  strong: '#00ff00',
}

export const strengthColors = [colors.weak, colors.fair, colors.good, colors.strong]
export const strengthLabels = ['form.weak', 'form.fair', 'form.good', 'form.strong']
