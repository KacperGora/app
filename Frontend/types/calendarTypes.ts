export type EventForm = {
  start: string;
  end: string;
  clientId: string;
  service: string;
  notes?: string;
  price?: any;
};

export type EventFormOptionType = 'service' | 'customer';
