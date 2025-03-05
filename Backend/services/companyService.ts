import { getDataBaseServices, saveDatabaseService, Service, deleteDatabaseService } from '../models/Service';
import { ORDER_DIRECTION } from '../types/queryTypes';
import { SORT_ORDER_ENUM } from '../utils/enums';

const { ASC, DESC } = SORT_ORDER_ENUM;

export const companyService = {
  async getDatabaseServices(userId: string, query: { search?: string; sortBy?: string; sortOrder?: ORDER_DIRECTION }) {
    const { search = '', sortBy = 'name', sortOrder = SORT_ORDER_ENUM.ASC } = query;

    if (![ASC, DESC].includes(sortOrder)) {
      throw new Error('Invalid sortOrder');
    }
    return await getDataBaseServices(userId, { search, sortBy, sortOrder });
  },

  async createService(newService: Service) {
    const service: Service = {
      ...newService,
      service_price: Number(Number(newService.service_price).toFixed(2)),
      service_duration: Number(newService.service_duration),
    };
    return await saveDatabaseService(service);
  },

  async deleteService(userId: string, serviceId: string) {
    return await deleteDatabaseService(userId, serviceId);
  },
};
