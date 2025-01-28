import 'intl-pluralrules';
import React from 'react';
import { ActivityIndicator, AppRegistry, Keyboard } from 'react-native';
import { name as appName } from './package.json';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import { AuthProvider } from './context/AuthContext';
import { beautyTheme, colors } from './theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppNavigator } from 'navigators/HomeStackNavigator';
import { useAuth, useLoadFonts } from '@helpers';

configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: false,
});

AppRegistry.registerComponent(appName, () => App);

const App: React.FC<{ fontsLoaded: boolean }> = ({ fontsLoaded }) => {
  const { isLoggedIn, loading, userId } = useAuth();

  if (!fontsLoaded || loading) {
    return <ActivityIndicator size='large' color={colors.primary} />;
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
