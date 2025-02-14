import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { beautyTheme } from '@theme';
import { Customers } from '@views';
import i18n from 'i18n/i18n';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CalendarDrawerNavigator from './CalendarDrawerNavigator';
import CompanyDrawerNavigator from './CompanyDrawerNavigator';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: beautyTheme.colors.primary,
      tabBarInactiveTintColor: beautyTheme.colors.onSurface,
      tabBarStyle: {
        backgroundColor: beautyTheme.colors.background,
        borderRadius: 15,
        ...style.shadow,
      },
    }}
  >
    <Tab.Screen
      name={i18n.t('navigation.appointments')}
      component={CalendarDrawerNavigator}
      options={{
        tabBarIcon: ({ size, focused }) => (
          <Icon
            name="calendar"
            color={focused ? beautyTheme.colors.primary : beautyTheme.colors.onSurface}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name={i18n.t('navigation.clients')}
      component={Customers}
      options={{
        tabBarIcon: ({ size, focused }) => (
          <Icon
            name="account-group"
            color={focused ? beautyTheme.colors.primary : beautyTheme.colors.onSurface}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name={i18n.t('navigation.company')}
      component={CompanyDrawerNavigator}
      options={{
        tabBarIcon: ({ size, focused }) => (
          <Icon
            name="briefcase"
            color={focused ? beautyTheme.colors.primary : beautyTheme.colors.onSurface}
            size={size}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export const style = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
