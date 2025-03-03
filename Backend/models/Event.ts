import db from '../db';
import { calculateCurrentWeek } from '../utils/helpers';

export const createDataBaseEvent = async (event: any) => {
  const { service, start, end, client_id, notes, price, userId } = event;

  const query = `
    INSERT INTO events (service, start_time, end_time, client_id, notes, price, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;

  // Sprawdzenie, czy klient istnieje w tabeli clients
  const clientExists = await db.oneOrNone('SELECT 1 FROM clients WHERE id = $1', [client_id]);
  if (!clientExists) {
    throw new Error('Client not found');
  }

  const values = [service, start, end, client_id, notes, Number(price), userId];

  try {
    // Zwróci wygenerowany event_id
    const result = await db.one(query, values);
    return result.id; // Zwrócenie wygenerowanego ID nowego eventu
  } catch (error) {
    throw error;
  }
};

export const getDatabaseEvents = async (userId: string) => {
  const query = `
    SELECT 
      events.id AS event_id,
      events.service,
      events.start_time,
      events.end_time,
      events.notes,
      events.price,
      events.created_at,
      events.updated_at,
      clients.id AS client_id,
      clients.name,
      clients.last_name,
      clients.phone_number
    FROM events
    JOIN clients ON events.client_id = clients.id
    WHERE events.user_id = $1
  `;

  return db.manyOrNone(query, [userId]);
};

export const updateDatabaseEvent = async (event: any) => {
  const { service, start, end, client_id, notes, price, userId, id } = event;
  let query = `
    UPDATE events
    SET service = $1, start_time = $2, end_time = $3, client_id = $4, notes = $5, price = $6
    WHERE id = $7 AND user_id = $8
  `;
  const values = [service, start, end, client_id, notes, Number(price), id, userId];
  try {
    return await db.none(query, values);
  } catch (error) {
    throw error;
  }
};

export const getDatabaseEventsInPeriod = async (userId: string, start: string, end: string) => {
  const startDate = start ? start : calculateCurrentWeek().start;
  const endDate = end ? end : calculateCurrentWeek().end;

  const query = `
    SELECT * FROM events
    WHERE user_id = $1 AND start_time >= $2 AND end_time <= $3
  `;
  return db.manyOrNone(query, [userId, startDate, endDate]);
};
