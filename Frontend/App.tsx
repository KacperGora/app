import 'intl-pluralrules'
import React, { useEffect, useMemo } from 'react'
import { ActivityIndicator, AppRegistry } from 'react-native'
import { name as appName } from './package.json'
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'
import { DefaultTheme, PaperProvider } from 'react-native-paper'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18n'
import { AuthProvider } from './context/AuthContext'
import { beautyTheme, colors } from './theme/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth, useLoadFonts } from '@helpers/hooks'
import { AppNavigator } from 'navigators/HomeStackNavigator'
import * as SecureStore from 'expo-secure-store'

configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: false,
})

AppRegistry.registerComponent(appName, () => App)

const App: React.FC<{ queryClient: QueryClient; fontsLoaded: boolean }> = ({ queryClient, fontsLoaded }) => {
  const { isLoggedIn, loading } = useAuth()

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size='large' color={colors.primary} />
  }

  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={beautyTheme}>
        <AppNavigator isLoggedIn={isLoggedIn} />
      </PaperProvider>
    </I18nextProvider>
  )
}

export const queryClient = new QueryClient()
const Root = () => {
  const fontsLoaded = useLoadFonts()

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App queryClient={queryClient} fontsLoaded={fontsLoaded} />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default Root
