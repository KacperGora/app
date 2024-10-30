import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '@views/Login'
import Register from '@views/Register'
import WelcomeScreen from '@views/Welcome'
import { HomeTabs } from './HomeTabsNavigator'

const Stack = createStackNavigator()

export const AppNavigator = ({ isLoggedIn }: { isLoggedIn: boolean | null }) => (
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
