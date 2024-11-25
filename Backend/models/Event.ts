import db from '../db'

export const createDataBaseEvent = async (event: any) => {
  const { service, start, end, client_id, notes, price, userId } = event
  let query = `
    INSERT INTO events (service, start_time, end_time, client_id, notes, price, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `
  const values = [service, start, end, client_id, notes, Number(price), userId]
  try {
    return await db.none(query, values)
  } catch (error) {
    console.error('Error creating event:', error)
    throw error
  }
}

export const getDatabaseEvents = async (userId: string) => {
  const query = `
    SELECT * FROM events
    WHERE user_id = $1
  `
  return db.manyOrNone(query, [userId])
}
