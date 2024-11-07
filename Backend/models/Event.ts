import mongoose, { Schema } from 'mongoose'

interface EventDocument extends Document {
  clientId: string
  userId: string
}
interface Event extends Document {
  service: string
  notes: string
  start: Date
  end: Date
  userId: string
  clientId: string
  price: number
}

const EventSchema: Schema = new Schema({
  service: { type: String, required: true },
  notes: { type: String, required: false },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  price: { type: Number, required: true },
  clientId: { type: String, required: true },
  userId: { type: String, required: true },
})

const Event = mongoose.model<EventDocument>('Event', EventSchema)

export default Event
