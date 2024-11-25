import db from '../db'
import { v4 as uuidv4 } from 'uuid'
import { validate } from 'uuid'

type User = {
  username: string
  password: string
}
export const createUser = async (user: User) => {
  const { username, password } = user
  const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING id, username
  `
  return db.one(query, [username, password])
}

export const findUser = async (username: string) => {
  const query = `
    SELECT * FROM users
    WHERE username = $1
  `
  return db.oneOrNone(query, [username])
}

export const updateUserPassword = async (username: string, password: string) => {
  const query = `
    UPDATE users
    SET password = $1
    WHERE username = $2
  `
  return db.none(query, [password, username])
}

export const findUserById = async (id: string) => {
  const parsedId = id?.trim()
  if (validate(parsedId)) {
    const query = `
    SELECT * FROM users
    WHERE id = $1`
    return db.oneOrNone(query, [parsedId])
  }
}

export const saveRefreshToken = async (userId: string, token: string) => {
  await db.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [token, userId])
}
