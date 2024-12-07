import db from '../db'

type UserRecord = {
  id: string
  username: string
  password?: string
  refresh_token?: string
}

export const createUser = async (user: { username: string; password: string }) => {
  const { username, password } = user
  const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username'
  return db.one<UserRecord>(query, [username, password])
}

export const findUserByKey = async (key: string, value: string): Promise<UserRecord | null> => {
  if (!['id', 'username'].includes(key)) {
    throw new Error('Invalid key')
  }

  const query = `
    SELECT * FROM users
    WHERE ${key} = $1
  `
  const user = await db.oneOrNone<UserRecord>(query, [value])
  return user
}

export const updateUserPassword = async (username: string, password: string): Promise<void> => {
  const query = `
    UPDATE users
    SET password = $1
    WHERE username = $2
  `
  await db.none(query, [password, username])
}

export const saveRefreshToken = async (userId: string, token: string): Promise<void> => {
  try {
    const query = `
     UPDATE users
     SET refresh_token = $1
     WHERE id = $2
   `
    await db.none(query, [token, userId])
  } catch (error) {
    throw error
  }
}
