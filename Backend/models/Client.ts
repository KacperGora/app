import db from '../db'

export type Client = {
  name: string
  last_name: string
  phone_number: string
  userId: string
  notes?: string
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

export const getAllClients = async (userId: string) => {
  console.log(userId)
  const query = `
    SELECT * FROM clients
    WHERE user_id = $1
  `
  const clients = await db.manyOrNone(query, [userId])

  return clients
}
