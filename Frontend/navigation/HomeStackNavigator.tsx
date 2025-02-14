import React from 'react';

import { SCREEN_NAME_CONFIG } from '@helpers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Register, RemindPassword } from '@views';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HomeTabs } from './HomeTabsNavigator';

const {
  Login: login,
  Register: register,
  RemindPassword: remindPassword,
  HomeTabs: homeTabs,
} = SCREEN_NAME_CONFIG;

const Stack = createStackNavigator();

export const AppNavigator = ({ isLoggedIn }: { isLoggedIn: boolean | null }) => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isLoggedIn ? homeTabs : login}
    >
      {isLoggedIn ? (
        <Stack.Screen name={homeTabs} component={HomeTabs} />
      ) : (
        <>
          <Stack.Screen name={login} component={Login} />
          <Stack.Screen name={register} component={Register} />
          <Stack.Screen name={remindPassword} component={RemindPassword} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
