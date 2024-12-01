import { DatabaseTable, DatabaseTableNames } from "../types/tableTypes";

export const buildSelectQueryForTable = (table: DatabaseTable) => `SELECT * FROM ${table} WHERE user_id = $1`
