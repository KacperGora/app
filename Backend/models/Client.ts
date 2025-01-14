import db from '../db'
import { buildSelectQueryForTable } from '../utils/helpers'

export type Client = {
  name: string
  last_name: string
  phone_number: string
  userId: string
  notes?: string
}
export const getClientByKey = (key: string) => async (value: string) => {
  return await db.any(`SELECT * FROM clients WHERE ${key} = $1`, [value])
}
export const createClient = async (client: Client) => {
  const { name, last_name, phone_number, notes, userId } = client
  let query = `
    INSERT INTO clients (name, last_name, phone_number, user_id
  `

  const values = [name, last_name, phone_number, userId]
  if (notes) {
    query += `, notes) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, last_name, phone_number, user_id, notes`
    values.push(notes)
  } else {
    query += `) VALUES ($1, $2, $3, $4) RETURNING id, name, last_name, phone_number, user_id`
  }

  try {
    return await db.one(query, values)
  } catch (error) {
    console.error('Error creating client:', error)
    throw error
  }
}

export const fetchDatabaseClients = async (userId: string, query: { search?: string; sortBy?: string; sortOrder?: 'ASC' | 'DESC' }) => {
  let dbQuery = buildSelectQueryForTable('clients')

  const values: any[] = [userId]
  if (query.search) {
    dbQuery += ` AND (name ILIKE $2 OR last_name ILIKE $2 OR phone_number ILIKE $2)`
    values.push(`%${query.search}%`)
  }

  if (query.sortBy && query.sortOrder) {
    dbQuery += ` ORDER BY ${query.sortBy} ${query.sortOrder}`
  }

  return await db.manyOrNone(dbQuery, values)
}

export const deleteDatabaseClient = async (clientId: string) => {
  return await db.none('DELETE FROM clients WHERE id = $1', [clientId])
}
