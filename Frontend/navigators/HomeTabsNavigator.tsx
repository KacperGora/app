import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from 'theme/theme'
import CalendarDrawerNavigator from './CalendarDrawerNavigator'
import i18n from 'i18n/i18n'
import Customers from '@views/Customers'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CompanyDrawerNavigator from './CompanyDrawerNavigator'

const Tab = createBottomTabNavigator()

export const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.textPrimary,
      tabBarInactiveTintColor: colors.textSecondary,
    }}
  >
    <Tab.Screen
      name={i18n.t('navigation.appointments')}
      component={CalendarDrawerNavigator}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name='calendar' color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name={i18n.t('navigation.clients')}
      component={Customers}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name='account-group' color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name={i18n.t('navigation.company')}
      component={CompanyDrawerNavigator}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name='briefcase' color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
)
