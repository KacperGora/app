import dayjs from 'dayjs';

export const initialFormState = {
  start: '',
  end: '',
  clientId: '',
  notes: '',
  service: '',
};

export const isEventDurationLongerThanADay = (start: string, end: string) => {
  return dayjs(start).isValid() && dayjs(end).isValid() && dayjs(start).diff(dayjs(end), 'day') !== 0;
};

export const formatCurrency = (amount: number = 0, currency: string = 'PLN'): string => {
  if (isNaN(amount)) {
    console.warn('Invalid amount provided to formatCurrency:', amount);
    return '';
  }
  try {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(amount).replace(',', '.');
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '';
  }
};

export const handlePriceChange = (text: string) => {
  return text
    .replace(/[^0-9,.]/g, '')
    .replace(',', '.')
    .replace(/(\..*?\.)/g, '$1')
    .replace(/(\.\d{2})\d+/g, '$1');
};
