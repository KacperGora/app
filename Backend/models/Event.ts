import mongoose, { Schema } from 'mongoose'

interface EventDocument extends Document {
  clientId: string // upewnij się, że clientID ma poprawny typ
  // inne pola modelu Event
}
interface Event extends Document {
  service: string
  notes: string
  start: Date
  end: Date
  userId: string
  clientId: string
}

const EventSchema: Schema = new Schema({
  service: { type: String, required: true },
  notes: { type: String, required: false },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  clientId: { type: String, required: true },
  userId: { type: String, required: true },
})

const Event = mongoose.model<EventDocument>('Event', EventSchema)

export default Event
