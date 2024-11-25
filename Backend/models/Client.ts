import db from '../db'

type Client = {
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
  const query = `
    SELECT * FROM clients
    WHERE user_id = $1
  `
  const clients = await db.manyOrNone(query, [userId])

  for (const client of clients) {
    const closestFutureEvent = await db.oneOrNone(
      `
      SELECT * FROM events
      WHERE user_id = $1 AND client_id = $2 AND start_time > NOW()
      ORDER BY start_time ASC
      LIMIT 1
    `,
      [userId, client.id],
    )

    const latestPastEvent = await db.oneOrNone(
      `
      SELECT * FROM events
      WHERE user_id = $1 AND client_id = $2 AND start_time < NOW()
      ORDER BY start_time DESC
      LIMIT 1
    `,
      [userId, client.id],
    )

    client.closestFutureEvent = closestFutureEvent
    client.latestPastEvent = latestPastEvent
  }

  return clients
}
