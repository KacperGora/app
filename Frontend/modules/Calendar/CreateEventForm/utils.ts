import SearchWithList from '@components/SearchWithList'
import dayjs from 'dayjs'

export const initialFormState = {
  start: '',
  end: '',
  clientId: '',
  notes: '',
  service: '',
}

export const isEventDurationLongerThanADay = (start: string, end: string) => {
  return dayjs(start).isValid() && dayjs(end).isValid() && dayjs(start).diff(dayjs(end), 'day') !== 0
}
