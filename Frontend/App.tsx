import 'intl-pluralrules'
import React, { useCallback, useContext, useEffect } from 'react'
import { ActivityIndicator, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
import { t } from 'i18next'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Customers from './Views/Customers'
import Company from './Views/Company'
import { colors } from './theme/theme'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

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

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.secondary,
      tabBarInactiveTintColor: colors.error,
    }}
  >
    <Tab.Screen
      name='Appointments'
      component={Calendar}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name='calendar' color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name='Clients'
      component={Customers}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name='account-group' color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name='Company'
      component={Company}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name='brief-case' color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
)

const AppNavigator = ({ isLoggedIn }: { isLoggedIn: boolean }) => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isLoggedIn ? 'HomeTabs' : 'Welcome'}>
        {isLoggedIn ? (
          <Stack.Screen name='HomeTabs' component={HomeTabs} />
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
  const theme = {
    colors: {
      primary: colors.primary,
      accent: colors.accent,
      background: colors.background,
      surface: colors.background,
      text: colors.textPrimary,
      error: colors.error,
    },
  }
  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={theme}>
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
