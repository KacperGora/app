import React from 'react';

import { ActivityIndicator, AppRegistry } from 'react-native';

import { useAuth, useLoadFonts } from '@helpers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beautyTheme, colors } from '@theme';
import { NotificationProvider } from 'helpers/notification';
import 'intl-pluralrules';
import { AppNavigator } from 'navigation/HomeStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

import { AuthProvider } from './context/AuthContext';
import { name as appName } from './package.json';

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
    <PaperProvider theme={beautyTheme}>
      <NotificationProvider>
        <AppNavigator isLoggedIn={isLoggedIn} />
      </NotificationProvider>
    </PaperProvider>
  );
};

const Root = () => {
  const fontsLoaded = useLoadFonts();
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App fontsLoaded={fontsLoaded} />
        </QueryClientProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default Root;
