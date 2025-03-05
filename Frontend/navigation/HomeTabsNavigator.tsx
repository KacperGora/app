import { SCREEN_NAME_CONFIG } from '@helpers';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { beautyTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CalendarDrawerNavigator from './CalendarDrawerNavigator';
import CompanyDrawerNavigator from './CompanyDrawerNavigator';
import { CustomerListWithDrawer } from './CustomerNavigation';
import { homeTabsScreenConfig } from './utils';

export const renderTabIcon =
  (name: string) =>
  ({ size, focused }: { size: number; focused: boolean }) => (
    <Icon
      name={name}
      color={focused ? beautyTheme.colors.primary : beautyTheme.colors.onSurface}
      size={size}
    />
  );

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={homeTabsScreenConfig}>
      <Tab.Screen
        name={SCREEN_NAME_CONFIG.Calendar}
        component={CalendarDrawerNavigator}
        options={{
          title: t('navigation.appointments'),
          tabBarIcon: renderTabIcon('calendar'),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME_CONFIG.CustomerListDrawer}
        component={CustomerListWithDrawer}
        options={{
          title: t('navigation.clients'),
          tabBarIcon: renderTabIcon('account-group'),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAME_CONFIG.Company}
        component={CompanyDrawerNavigator}
        options={{
          title: t('navigation.company'),
          tabBarIcon: renderTabIcon('domain'),
        }}
      />
    </Tab.Navigator>
  );
};
