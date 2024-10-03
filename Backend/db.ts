import mongoose from 'mongoose'

export const connectDb = async (uri: string) => {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1) // Exit the process with failure
  }
}

