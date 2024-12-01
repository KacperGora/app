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

export const updateDatabaseEvent = async (event: any) => {
  const { service, start, end, client_id, notes, price, userId, id } = event
  let query = `
    UPDATE events
    SET service = $1, start_time = $2, end_time = $3, client_id = $4, notes = $5, price = $6
    WHERE id = $7 AND user_id = $8
  `
  const values = [service, start, end, client_id, notes, Number(price), id, userId]
  try {
    return await db.none(query, values)
  } catch (error) {
    throw error
  }
}
