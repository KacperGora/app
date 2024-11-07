import mongoose, { Schema, Document } from 'mongoose'

export interface IClient extends Document {
  name: string
  lastName: string
  phoneNumber: string
  connectedUser: string
  id: string
}

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  connectedUser: { type: String },
  id: { type: String },
})

const Client = mongoose.model<IClient>('Client', ClientSchema)

export default Client
