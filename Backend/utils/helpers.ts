import dayjs from 'dayjs'
import { DatabaseTable, DatabaseTableNames } from '../types/tableTypes'

export const buildSelectQueryForTable = (table: DatabaseTable) => `SELECT * FROM ${table} WHERE user_id = $1`

export const calculateCurrentWeek = () => ({
  start: dayjs().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
  end: dayjs().subtract(1, 'week').endOf('week').format('YYYY-MM-DD'),
})
