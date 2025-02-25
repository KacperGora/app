import React, { useCallback, useRef, useState } from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { BottomSheetFormWrapper, CustomBottomSheet, KeyboardAvoidingContainer } from '@components';
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
import { Calendar, today } from '@views';
import dayjs from 'dayjs';
import i18next from 'i18next';
import MinimizedFormContent from 'modules/Calendar/MinimizedFormContent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { calendarDrawerScreenConfig } from './utils';

const width = Dimensions.get('window').width - HOUR_CELL_WIDTH;
const currentMonth = dayjs().locale(LOCALE_PL).format(DATE_FORMAT_FULL_MONTH_WITH_YEAR);

const Drawer = createDrawerNavigator();
const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const SNAP_POINTS = [WINDOW_HEIGHT * 0.2, WINDOW_HEIGHT * 0.85] as const;

export const CalendarDrawerNavigator = () => {
  const calendarRef = useRef<CalendarKitHandle>(null);

  const [displayedCalendarMonth, setDisplayedCalendarMonth] = useState<string>(currentMonth);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentBottomSheetIndex, setCurrentBottomSheetIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<{ start: string; end: string }>({
    start: dayjs().toISOString(),
    end: dayjs().toISOString(),
  });
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
  console.log(currentBottomSheetIndex, 'currentBottomSheetIndex');
  return (
    <>
      <Drawer.Navigator
        initialRouteName={SCREEN_NAME_CONFIG.Calendar}
        screenOptions={{
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
        }}
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
                currentBottomSheetIndex={currentBottomSheetIndex}
              />
            )}
          </Drawer.Screen>
        ))}
      </Drawer.Navigator>
      <CustomBottomSheet
        isVisible={isFormVisible}
        onClose={handleCloseForm}
        onCurrentIndexChange={onCurrentIndexChange}
        snapPoints={SNAP_POINTS}
        minimizedContent={
          <MinimizedFormContent
            initialDateState={selectedDate}
            onExpand={() => {}}
            client="Karoina Pajor"
            serviceName="Maniucre Klasyczn"
          />
        }
      >
        <CreateEventForm
          initialDateState={selectedDate}
          onEventCreateRequest={async () => {
            console.log('Event created!');
          }}
        />
      </CustomBottomSheet>
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
