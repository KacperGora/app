import 'intl-pluralrules'
import React, { useCallback, useContext, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper'
import { I18nextProvider } from 'react-i18next'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import i18n from './i18n/i18n'
import WelcomeScreen from './Views/Welcome'
import LoginScreen from './Views/Login'
import Register from './Views/Register'
import Calendar from './Views/Calendar'
import { AuthProvider, AuthContext, AuthContextType } from './context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()

const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
  })

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync()
      }
    }
    hideSplashScreen()
  }, [fontsLoaded])

  return fontsLoaded
}

const useAuth = () => {
  const { isLoggedIn, setIsLoggedIn, setLogin } = useContext(AuthContext) as AuthContextType

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token')
      const login = await AsyncStorage.getItem('login')
      setIsLoggedIn(!!token)
      if (login) {
        setLogin(login)
      }
    }
    checkToken()
  }, [setIsLoggedIn, setLogin])

  return isLoggedIn
}

const AppNavigator = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isLoggedIn ? 'Calendar' : 'Welcome'}>
      {isLoggedIn ? (
        <Stack.Screen name='Calendar' component={Calendar} />
      ) : (
        <>
          <Stack.Screen name='Welcome' component={WelcomeScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={Register} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
)

const App = () => {
  const fontsLoaded = useLoadFonts()
  const isLoggedIn = useAuth()

  if (!fontsLoaded || isLoggedIn === null) {
    return <ActivityIndicator size='large' />
  }

  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider>
        <AppNavigator isLoggedIn={isLoggedIn} />
      </PaperProvider>
    </I18nextProvider>
  )
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)
