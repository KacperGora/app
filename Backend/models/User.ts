import mongoose, { Schema } from 'mongoose'

export interface IUser extends Document {
  eventsID: any
  id: string
  username: string
  password: string
  clientsID: mongoose.Types.ObjectId[]
  employeesID: string[]
  servicesID: string[]
}

const UserSchema: Schema = new Schema({
  id: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  eventsID: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  clientsID: [{ type: String }],
  employeesID: [{ type: String }],
  servicesID: [{ type: String }],
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User
