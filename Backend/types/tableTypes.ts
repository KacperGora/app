export type DatabaseTableNames = {
  clients: 'clients'
  services: 'services'
  events: 'events'
}

export type DatabaseTable = keyof DatabaseTableNames