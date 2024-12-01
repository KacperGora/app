import { fetchDatabaseClients } from '../models/Client'
import { ORDER_DIRECTION } from '../types/queryTypes'
import { SORT_ORDER_ENUM } from '../utils/enums'

const { ASC, DESC } = SORT_ORDER_ENUM

export const getDatabaseClients = async (userId: string, query: { search?: string; sortBy?: string; sortOrder?: ORDER_DIRECTION }) => {
  const { search = '', sortBy = 'name', sortOrder = SORT_ORDER_ENUM.ASC } = query

  if (![ASC, DESC].includes(sortOrder)) {
    throw new Error('Invalid sortOrder')
  }
  const clients = await fetchDatabaseClients(userId, { search, sortBy, sortOrder })
  return clients
}
