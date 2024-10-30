import dayjs from 'dayjs'
import { DEFAULT_DATE_FORMAT } from './constants'
import pl from 'dayjs/locale/pl'

export const fromDateString = ({ string, format }: { string: string; format: string }) => {
  console.log(string)
  return dayjs(string).locale(pl).format(format)
}
