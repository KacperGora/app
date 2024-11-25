interface ErrorDetail {
  status: number
  message: string
  code: string
}

interface Errors {
  [key: string]: ErrorDetail
}

export const errors: Errors = {
  USER_NOT_FOUND: {
    status: 404,
    message: 'User not found',
    code: 'USER_NOT_FOUND',
  },
  USER_ALREADY_EXISTS: {
    status: 400,
    message: 'User already exists',
    code: 'USER_ALREADY_EXISTS',
  },
  USERNAME_AND_PASSWORD_REQUIRED: {
    status: 400,
    message: 'Username and password are required',
    code: 'USERNAME_AND_PASSWORD_REQUIRED',
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
  },
  INVALID_CREDENTIALS: {
    status: 401,
    message: 'Invalid credentials',
    code: 'INVALID_CREDENTIALS',
  },
  TOKEN_REQUIRED: {
    status: 401,
    message: 'Token required',
    code: 'TOKEN_REQUIRED',
  },
}
