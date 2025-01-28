import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from 'theme/theme';
import CalendarDrawerNavigator from './CalendarDrawerNavigator';
import i18n from 'i18n/i18n';
import Customers from '@views/Customers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CompanyDrawerNavigator from './CompanyDrawerNavigator';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { shadow } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: { children: any; onPress?: any }) => (
  <TouchableOpacity style={{ top: -30, justifyContent: 'center', alignItems: 'center', ...style.shadow }} onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.secondary,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.textPrimary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: {
        // position: 'absolute',
        // bottom: 25,
        // left: 20,
        // right: 20,
        backgroundColor: colors.white,
        borderRadius: 15,
        height: 90,
        ...style.shadow,
      },
    }}
  >
    <Tab.Screen
      name={i18n.t('navigation.clients')}
      component={Customers}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name='account-group' color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name={i18n.t('navigation.appointments')}
      component={CalendarDrawerNavigator}
      options={{
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
        tabBarIcon: ({ color, size }) => <Icon name='calendar' color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name={i18n.t('navigation.company')}
      component={CompanyDrawerNavigator}
      options={{
        tabBarIcon: ({ color, size, focused }) => <Icon name='briefcase' color={focused ? color : 'gray'} size={size} />,
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
