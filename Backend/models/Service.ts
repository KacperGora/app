import db from '../db'

export type Service = {
  user_id: string
  service_name: string
  service_description: string
  service_price: number
  service_duration: number
}

export const dbCreateService = async (service: Service) => {
  const { user_id, service_name, service_description, service_price, service_duration } = service

  let query = `
    INSERT INTO services (user_id, name, description, price, duration)`
  const serviceDurationAsInterval = `${service_duration} minutes`
  const values = [user_id, service_name, service_description, service_price, serviceDurationAsInterval]
  query += ` VALUES ($1, $2, $3, $4, $5) RETURNING id, user_id, name, description, price, duration`
  try {
    return await db.one(query, values)
  } catch (error) {
    throw error
  }
}

export const dbGetServices = async (userId: string, query: { search?: string; sortBy?: string; sortOrder?: 'ASC' | 'DESC' }) => {
  let dbQuery = `
    SELECT * FROM services
    WHERE user_id = $1
  `
  const values: any[] = [userId]

  if (query.search) {
    dbQuery += ` AND (name ILIKE $2 OR description ILIKE $2)`
    values.push(`%${query.search}%`)
  }

  if (query.sortBy && query.sortOrder) {
    dbQuery += ` ORDER BY ${query.sortBy} ${query.sortOrder}`
  }

  return await db.manyOrNone(dbQuery, values)
}
