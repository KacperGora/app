import React from 'react';

import { ActivityIndicator, AppRegistry } from 'react-native';

import { useAuth, useLoadFonts } from '@helpers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'intl-pluralrules';
import { AppNavigator } from 'navigation/HomeStackNavigator';
import { I18nextProvider } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

import { AuthProvider } from './context/AuthContext';
import i18n from './i18n/i18n';
import { name as appName } from './package.json';
import { beautyTheme, colors } from '@theme';

configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: false,
});

AppRegistry.registerComponent(appName, () => App);

const App: React.FC<{ fontsLoaded: boolean }> = ({ fontsLoaded }) => {
  const { isLoggedIn, loading } = useAuth();

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={beautyTheme}>
        <AppNavigator isLoggedIn={isLoggedIn} />
      </PaperProvider>
    </I18nextProvider>
  );
};

const Root = () => {
  const fontsLoaded = useLoadFonts();
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App fontsLoaded={fontsLoaded} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Root;
