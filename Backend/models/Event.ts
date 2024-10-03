import mongoose, { Schema } from 'mongoose'

interface Event extends Document {
  title: string
  description: string
  start: Date
  end: Date
  userId: string
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  userId: { type: String, required: true },
})

const Event = mongoose.model<Schema>('Event', EventSchema)

export default Event
