import React, { useCallback, useRef, useState } from 'react';

import {
  DATE_FORMAT_FULL_MONTH_WITH_YEAR,
  DATE_FORMAT_YYYY_MM_DD,
  LOCALE_PL,
  SCREEN_NAME_CONFIG,
} from '@helpers';
import { CalendarKitHandle } from '@howljs/calendar-kit';
import { Topbar } from '@modules';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Calendar, today } from '@views';
import dayjs from 'dayjs';
import i18next from 'i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { calendarDrawerConfig, calendarDrawerScreenConfig } from './utils';

const currentMonth = dayjs().locale(LOCALE_PL).format(DATE_FORMAT_FULL_MONTH_WITH_YEAR);
const initialSelectedDate = { start: dayjs().toISOString(), end: dayjs().toISOString() };
const Drawer = createDrawerNavigator();

const renderDrawerIcon =
  (name: string) =>
  ({ size, color }: { size: number; color: string }) => (
    <Icon name={name} size={size} color={color} />
  );

const renderCalendarTopbar = (navigateToToday: () => void, displayedCalendarMonth: string) => (
  <Topbar onPress={navigateToToday} date={today} displayedCalendarMonth={displayedCalendarMonth} />
);

export const CalendarDrawerNavigator = () => {
  const calendarRef = useRef<CalendarKitHandle>(null);

  const [currentBottomSheetIndex, setCurrentBottomSheetIndex] = useState(0);
  const [displayedCalendarMonth, setDisplayedCalendarMonth] = useState<string>(currentMonth);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{ start: string; end: string }>(
    initialSelectedDate,
  );

  const onCurrentIndexChange = useCallback((index: number) => {
    setCurrentBottomSheetIndex(index);
  }, []);

  const handleMonthChange = useCallback((date: string) => {
    setDisplayedCalendarMonth(date);
  }, []);

  const onFormToggle = useCallback((dateSelected: { start: string; end: string }) => {
    setSelectedDate(dateSelected);
    setIsFormVisible((prev) => !prev);
  }, []);

  const navigateToToday = useCallback(() => {
    calendarRef.current?.goToDate({
      date: dayjs().format(DATE_FORMAT_YYYY_MM_DD),
    });
    handleMonthChange(currentMonth);
  }, [handleMonthChange]);

  const handleCloseForm = useCallback(() => {
    setIsFormVisible(false);
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName={SCREEN_NAME_CONFIG.Calendar}
      screenOptions={{
        headerTitle: () => renderCalendarTopbar(navigateToToday, displayedCalendarMonth),
        ...calendarDrawerConfig,
      }}
    >
      {calendarDrawerScreenConfig.map(({ name, icon, mode }) => (
        <Drawer.Screen
          key={name}
          name={i18next.t(name)}
          options={{
            drawerIcon: renderDrawerIcon(icon),
          }}
        >
          {() => (
            <Calendar
              ref={calendarRef}
              params={{ mode, onMonthChange: handleMonthChange }}
              onFormToggle={onFormToggle}
              currentBottomSheetIndex={currentBottomSheetIndex}
            />
          )}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default CalendarDrawerNavigator;
