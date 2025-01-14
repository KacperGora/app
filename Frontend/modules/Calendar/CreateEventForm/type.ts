export type EventForm = {
  start: string
  end: string
  clientId: string
  service: string
  notes?: string
  price?: number
}

export type EventFormOptionType = 'service' | 'customer'
