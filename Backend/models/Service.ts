import mongoose, { Schema } from 'mongoose'

const ServiceSchema: Schema = new Schema({
  id: { type: String },
  serviceName: { type: String, required: true },
  serviceDescription: { type: String, required: false },
  servicePrice: { type: Number, required: true },
  serviceDuration: { type: Number, required: true },
  connectedUser: { type: String, required: true },
})

const Service = mongoose.model('Service', ServiceSchema)

export default Service
