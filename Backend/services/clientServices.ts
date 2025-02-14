import { errors } from '../config/errors'
import { createClient, deleteDatabaseClient, fetchDatabaseClients, getClientByKey } from '../models/Client'
import { ORDER_DIRECTION } from '../types/queryTypes'
import { SORT_ORDER_ENUM } from '../utils/enums'
import { CustomError } from './userService'

const { ASC, DESC } = SORT_ORDER_ENUM

export const clientService = {
  async getClients(userId: string, query: { search?: string; sortBy?: string; sortOrder?: ORDER_DIRECTION }) {
    const { search = '', sortBy = 'name', sortOrder = ASC } = query

    if (![ASC, DESC].includes(sortOrder)) {
      throw new CustomError('Invalid sortOrder', 400)
    }
    const clients = await fetchDatabaseClients(userId, { search, sortBy, sortOrder }) || []
    return clients || []
  },
  async addClient(client: { name: string; last_name: string; phone_number: string; userId: string; notes?: string }) {
    if (!client.name || !client.last_name || !client.phone_number || !client.userId) {
      throw new CustomError(errors.INVALID_CLIENT_ADD_REQUEST.code, 400)
    }
    const existingClientWithPhoneNumber = await getClientByKey('phone_number')(client.phone_number)
    if (existingClientWithPhoneNumber.length) {
      throw new CustomError(errors.CLIENT_EXISTS.code, 400)
    }
    return await createClient(client)
  },
  async deleteClient(clientId: string) {
    return await deleteDatabaseClient(clientId)
  },
}
