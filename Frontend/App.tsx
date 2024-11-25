import 'intl-pluralrules'
import React, { useEffect, useMemo } from 'react'
import { ActivityIndicator, AppRegistry } from 'react-native'
import { name as appName } from './package.json'

import { DefaultTheme, PaperProvider } from 'react-native-paper'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/i18n'
import { AuthProvider } from './context/AuthContext'
import { colors } from './theme/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth, useLoadFonts } from '@helpers/hooks'
import { checkTokenExpiration } from '@helpers/utils'
import { AppNavigator } from 'navigators/HomeStackNavigator'

AppRegistry.registerComponent(appName, () => App)

const App: React.FC<{ queryClient: QueryClient; fontsLoaded: boolean }> = ({ queryClient, fontsLoaded }) => {
  const { isLoggedIn, loading } = useAuth()

  const beautyTheme = {
    colors: {
      primary: 'rgb(255, 154, 158)',
      onPrimary: 'rgb(255, 255, 255)',
      primaryContainer: 'rgb(255, 227, 229)',
      onPrimaryContainer: 'rgb(95, 0, 16)',
      secondary: 'rgb(255, 200, 210)',
      onSecondary: 'rgb(58, 28, 34)',
      secondaryContainer: 'rgb(255, 240, 243)',
      onSecondaryContainer: 'rgb(65, 0, 23)',
      tertiary: 'rgb(255, 180, 165)',
      onTertiary: 'rgb(60, 0, 10)',
      tertiaryContainer: 'rgb(255, 220, 213)',
      onTertiaryContainer: 'rgb(70, 15, 20)',

      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',

      background: 'rgb(255, 251, 255)',
      onBackground: 'rgb(51, 43, 47)',
      surface: 'rgb(255, 252, 253)',
      onSurface: 'rgb(58, 47, 50)',
      surfaceVariant: 'rgb(240, 229, 235)',
      onSurfaceVariant: 'rgb(74, 61, 66)',
      outline: 'rgb(190, 174, 180)',
      outlineVariant: 'rgb(224, 215, 220)',
      shadow: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(51, 43, 47)',
      inverseOnSurface: 'rgb(255, 241, 244)',
      inversePrimary: 'rgb(255, 180, 190)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(255, 245, 247)',
        level2: 'rgb(255, 240, 243)',
        level3: 'rgb(255, 235, 239)',
        level4: 'rgb(255, 233, 237)',
        level5: 'rgb(255, 230, 235)',
      },

      surfaceDisabled: 'rgba(51, 43, 47, 0.12)',
      onSurfaceDisabled: 'rgba(51, 43, 47, 0.38)',
      backdrop: 'rgba(51, 47, 55, 0.2)',
    },
  }

  useEffect(() => {
    checkTokenExpiration()
  }, [])

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
