import { useFonts } from 'expo-font'
import { useContext, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { AuthContext, AuthContextType } from 'context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import api from './api'
export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleModal = () => {
    setIsVisible((prev) => !prev)
  }
  return [isVisible, toggleModal] as const
}

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('assets/fonts/Lato-Bold.ttf'),
  })

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.preventAutoHideAsync()
        await SplashScreen.hideAsync()
      }
    }
    hideSplashScreen()
  }, [fontsLoaded])

  return fontsLoaded
}

export const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn, setLogin } = useContext(AuthContext) as AuthContextType
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('accessToken')
        console.log(token)
        setIsLoggedIn(Boolean(token))
      } catch (error) {
        console.error('Error getting token', error)
      } finally {
        setLoading(false)
      }
    }
    checkToken()
  }, [setIsLoggedIn, setLogin])

  return { isLoggedIn, loading }
}
