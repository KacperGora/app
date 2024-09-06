import dayjs from 'dayjs'
import pl from 'dayjs/locale/pl'
export const generateWeekNames = Array.from({ length: 7 }, (_, i) => {
  return dayjs()
    .day(i + 1)
    .locale(pl)
    .format('ddd')
})
