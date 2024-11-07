import 'intl-pluralrules'
import React, { useEffect, useMemo } from 'react'
import { ActivityIndicator, AppRegistry } from 'react-native'
import { name as appName } from './package.json'

import { DefaultTheme, PaperProvider } from 'react-native-paper'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18n'
import { AuthProvider } from './context/AuthContext'
import { colors } from './theme/theme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAuth, useLoadFonts } from '@helpers/hooks'
import { checkTokenExpiration } from '@helpers/utils'
import { AppNavigator } from 'navigators/HomeStackNavigator'

AppRegistry.registerComponent(appName, () => App)

const App: React.FC<{ queryClient: QueryClient; fontsLoaded: boolean }> = ({ queryClient, fontsLoaded }) => {
  const { isLoggedIn, loading } = useAuth()

  const theme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        accent: colors.primary,
        text: colors.textPrimary,
        ...DefaultTheme.colors,
      },
    }),
    [],
  )

  useEffect(() => {
    checkTokenExpiration()
  }, [])

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size='large' color={colors.primary} />
  }

  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={theme}>
        <AppNavigator isLoggedIn={isLoggedIn} />
      </PaperProvider>
    </I18nextProvider>
  )
}

const Root = () => {
  const queryClient = new QueryClient()
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
