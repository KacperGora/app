import dayjs from 'dayjs';
import pl from 'dayjs/locale/pl';

import { DEFAULT_DATE_FORMAT } from './constants';

export const fromDateString = ({ string, format }: { string: string; format: string }) => {
  return dayjs(string).locale(pl).format(format);
};

export const formatPrice = (price: number, currency = 'PLN') => {
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    price,
  );
  return formattedPrice.replace(',', '.');
};
type Duration = {
  hours?: number;
  minutes: number;
};
export const formatDuration = (duration: Duration) => {
  return `${duration.hours ? `${duration.hours}h` : ''} ${duration.minutes ? `${duration.minutes}min ` : ''}`;
};
