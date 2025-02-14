import React, { useRef, useState } from 'react';

import { Dimensions, StyleSheet } from 'react-native';

import { BottomSheetFormWrapper } from '@components';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  DATE_FORMAT_FULL_MONTH_WITH_YEAR,
  DATE_FORMAT_YYYY_MM_DD,
  HOUR_CELL_WIDTH,
  LOCALE_PL,
  SCREEN_NAME_CONFIG,
} from '@helpers';
import { CalendarKitHandle } from '@howljs/calendar-kit';
import { CreateEventForm, Topbar } from '@modules';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { beautyTheme } from '@theme';
import { Calendar, CALENDAR_ENUM, today } from '@views';
import dayjs from 'dayjs';
import i18next from 'i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { calendarDrawerScreenConfig } from './utils';

const width = Dimensions.get('window').width - HOUR_CELL_WIDTH;
const currentMonth = dayjs().locale(LOCALE_PL).format(DATE_FORMAT_FULL_MONTH_WITH_YEAR);

const Drawer = createDrawerNavigator();

export const CalendarDrawerNavigator = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const calendarRef = useRef<CalendarKitHandle>(null);

  const [displayedCalendarMonth, setDisplayedCalendarMonth] = useState<string>(currentMonth);

  const handleMonthChange = (date: string) => {
    setDisplayedCalendarMonth(date);
  };

  const onFormToggle = () => {
    bottomSheetRef.current?.expand();
  };

  const navigateToToday = () => {
    calendarRef.current?.goToDate({
      date: dayjs().format(DATE_FORMAT_YYYY_MM_DD),
    });
    handleMonthChange(currentMonth);
  };

  return (
    <>
      <Drawer.Navigator
        initialRouteName={SCREEN_NAME_CONFIG.Calendar}
        screenOptions={() => ({
          headerTitle: () => (
            <Topbar
              onPress={navigateToToday}
              date={today}
              displayedCalendarMonth={displayedCalendarMonth}
            />
          ),
          drawerType: 'front',
          headerTintColor: beautyTheme.colors.onBackground,
          drawerActiveBackgroundColor: beautyTheme.colors.tertiary,
          drawerActiveTintColor: beautyTheme.colors.onTertiary,
          overlayColor: beautyTheme.colors.elevation.level1,
          headerTitleContainerStyle: styles.headerTitleContainer,
          headerLeftContainerStyle: styles.headerLeftContainer,
          drawerStyle: { backgroundColor: beautyTheme.colors.background },
        })}
      >
        {calendarDrawerScreenConfig.map(({ name, icon, mode }) => (
          <Drawer.Screen
            key={name}
            name={i18next.t(name)}
            options={{
              drawerIcon: () => (
                <Icon name={icon} size={24} color={beautyTheme.colors.onTertiary} />
              ),
            }}
          >
            {() => (
              <Calendar
                ref={calendarRef}
                params={{ mode, onMonthChange: handleMonthChange }}
                onFormToggle={onFormToggle}
              />
            )}
          </Drawer.Screen>
        ))}
      </Drawer.Navigator>

      <BottomSheetFormWrapper ref={bottomSheetRef}>
        <CreateEventForm />
      </BottomSheetFormWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    minWidth: width,
    maxWidth: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeftContainer: {
    minWidth: 60,
    maxWidth: 60,
    backgroundColor: beautyTheme.colors.background,
  },
});

export default CalendarDrawerNavigator;
