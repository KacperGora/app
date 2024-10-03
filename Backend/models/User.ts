import mongoose, { Schema } from 'mongoose'

interface User extends Document {
  username: string
  password: string
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User = mongoose.model<User>('User', UserSchema)

export default User
