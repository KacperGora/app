import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type AuthContextType = {
  isLoggedIn: boolean | null
  setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>
  login: string
  setLogin: Dispatch<SetStateAction<string>>
  userId: string
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
  }, [])

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, setLogin, userId, setUserId }}>{children}</AuthContext.Provider>
}