import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type AuthContextType = {
  isLoggedIn: boolean | null
  login: string
  userId: string
  setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>
  setLogin: Dispatch<SetStateAction<string>>
  setUserId: Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false)
  const [login, setLogin] = useState<string>('')
  const [userId, setUserId] = useState<string>('')

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token')
    setIsLoggedIn(!!token)
  }

  useEffect(() => {
    checkToken()
    setIsLoggedIn(false)
  }, [])

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, setLogin, userId, setUserId }}>{children}</AuthContext.Provider>
}
