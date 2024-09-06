import React, { ContextType, useCallback, useContext, useEffect } from 'react'
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

const Stack = createStackNavigator()

const App = () => {
  const [fontsLoaded] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
  })

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext) as ContextType<typeof AuthContext> & AuthContextType

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  useEffect(() => {
    onLayoutRootView()
  }, [fontsLoaded])

  if (!fontsLoaded || isLoggedIn === null) {
    return <ActivityIndicator size='large' />
  }

  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={isLoggedIn ? 'Calendar' : 'Welcome'}>
            {isLoggedIn ? (
              <Stack.Screen name='Calendar' component={Calendar} options={{ headerShown: false }} />
            ) : (
              <>
                <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </I18nextProvider>
  )
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)
