import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Customers } from '@views';
import i18n from 'i18n/i18n';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from 'theme/theme';

import CalendarDrawerNavigator from './CalendarDrawerNavigator';
import CompanyDrawerNavigator from './CompanyDrawerNavigator';

const Tab = createBottomTabNavigator();



export const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.textPrimary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: {
        backgroundColor: colors.white,
        borderRadius: 15,
        height: 90,
        ...style.shadow,
      },
    }}
  >
    <Tab.Screen
      name={i18n.t('navigation.appointments')}
      component={CalendarDrawerNavigator}
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <Icon name="calendar" color={focused ? colors.black : colors.darkBlue} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={i18n.t('navigation.clients')}
      component={Customers}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="account-group" color={color} size={size} />,
      }}
    />

    <Tab.Screen
      name={i18n.t('navigation.company')}
      component={CompanyDrawerNavigator}
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <Icon name="briefcase" color={focused ? color : 'gray'} size={size} />
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
