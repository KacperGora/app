import { Dimensions } from 'react-native';

import { HOUR_CELL_WIDTH } from '@helpers';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { CALENDAR_ENUM } from '@views';
import { beautyTheme, colors } from 'theme/theme';

const { day, fullWeek, withoutWeekends } = CALENDAR_ENUM;
const width = Dimensions.get('window').width - HOUR_CELL_WIDTH;

export const calendarDrawerScreenConfig = [
  {
    name: 'calendar.fullWeek',
    icon: 'calendar-week',
    mode: fullWeek,
  },
  {
    name: 'calendar.withoutWeekends',
    icon: 'calendar-range',
    mode: withoutWeekends,
  },
  {
    name: 'calendar.dailyCalendar',
    icon: 'calendar',
    mode: day,
  },
];

export const drawerScreenOptions = {
  headerTintColor: colors.textPrimary,
  drawerActiveBackgroundColor: colors.background,
  drawerInactiveBackgroundColor: colors.background,
  drawerActiveTintColor: colors.textPrimary,
  drawerInactiveTintColor: colors.textSecondary,
};

export const customerDrawerScreenConfig: DrawerNavigationOptions = {
  headerStyle: { backgroundColor: beautyTheme.colors.background },
  drawerType: 'front',
  headerTintColor: beautyTheme.colors.onBackground,
  drawerActiveBackgroundColor: beautyTheme.colors.tertiary,
  drawerActiveTintColor: beautyTheme.colors.onTertiary,
  overlayColor: beautyTheme.colors.elevation.level1,
  drawerStyle: { backgroundColor: beautyTheme.colors.background },
};

export const homeTabsScreenConfig = {
  headerShown: false,
  tabBarActiveTintColor: beautyTheme.colors.primary,
  tabBarInactiveTintColor: beautyTheme.colors.onSurface,
  tabBarStyle: {
    backgroundColor: beautyTheme.colors.background,
    borderRadius: 15,
  },
};

export const calendarDrawerConfig: DrawerNavigationOptions = {
  drawerType: 'front',
  headerTintColor: beautyTheme.colors.onBackground,
  drawerActiveBackgroundColor: beautyTheme.colors.tertiary,
  drawerActiveTintColor: beautyTheme.colors.onTertiary,
  overlayColor: beautyTheme.colors.elevation.level1,
  headerTitleContainerStyle: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    minWidth: width,
    maxWidth: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeftContainerStyle: {
    minWidth: 60,
    maxWidth: 60,
    backgroundColor: beautyTheme.colors.background,
  },
  drawerStyle: { backgroundColor: beautyTheme.colors.background },
};

export const companyDrawerConfig: DrawerNavigationOptions = {
  headerStyle: { backgroundColor: beautyTheme.colors.background },
  drawerType: 'front',
  headerTintColor: beautyTheme.colors.onBackground,
  drawerActiveBackgroundColor: beautyTheme.colors.tertiary,
  drawerActiveTintColor: beautyTheme.colors.onTertiary,
  overlayColor: beautyTheme.colors.elevation.level1,
  drawerStyle: { backgroundColor: beautyTheme.colors.background },
};
