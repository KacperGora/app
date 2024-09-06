import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Define the context type
export type AuthContextType = {
  isLoggedIn: boolean | null
  setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>
}

// Create the context with the defined type
export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token')
    setIsLoggedIn(!!token)
  }

  useEffect(() => {
    checkToken()
  }, [])

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>
}
