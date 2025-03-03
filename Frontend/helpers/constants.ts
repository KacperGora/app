import { CustomerList } from '@modules';
import { Calendar } from '@views';
import i18next from 'i18next';

export const DEFAULT_DATE_FORMAT = 'DD/MM/YY';
export const DATE_FORMAT_YYYY_MM_DD = 'YYYY-MM-DD';
export const DATE_FORMAT_MMM_YYYY = 'MMM YYYY';
export const DATE_FORMAT_FULL_MONTH_WITH_YEAR = 'MMMM YYYY';
export const DEFAULT_DATE_FORMAT_WITH_TIME = 'DD/MM/YY HH:mm';
export const DATE_FORMAT_DATE_DDD_MM_YYYY_HH_MM = 'ddd, DD MMM YYYY HH:mm';

export const LOCALE_PL = 'pl';

export const HOUR_CELL_WIDTH = 60;

export const DEFAULT_CURRENCY = 'PLN';

export const SCREEN_NAME_CONFIG = {
  Login: 'Login' as const,
  Register: 'Register' as const,
  RemindPassword: 'RemindPassword' as const,
  HomeTabs: 'HomeTabs' as const,
  Calendar: 'Calendar' as const,
  CustomerList: 'CustomerList' as const,
  CustomerDetail: 'CustomerDetail' as const,
  CustomerStatistics: 'CustomerStatistics' as const,
  Company: 'Company' as const,
  CustomerListDrawer: 'CustomerListDrawer' as const,
  CompanyDashboard: 'CompanyDashboard' as const,
  CompanyEmployees: 'CompanyEmployees' as const,
  CompanyServices: 'CompanyServices' as const,
};
