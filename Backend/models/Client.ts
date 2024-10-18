import mongoose, { Schema } from 'mongoose'

interface Client extends Document {
  firtName: string
  lastName: string
  phoneNumber?: Date
}

const ClientSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: false },
})

const Client = mongoose.model<Schema>('Client', ClientSchema)

export default Client
