import React, { useCallback, useRef, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import i18next from 'i18next'
import Calendar from '@views/Calendar'
import { CALENDAR_ENUM, today } from '@views/Calendar/utils'
import Topbar from '@modules/Calendar/Topbar'
import dayjs from 'dayjs'
import { CalendarKitHandle } from '@howljs/calendar-kit'
import { DATE_FORMAT_FULL_MONTH_WITH_YEAR, DATE_FORMAT_YYYY_MM_DD, HOUR_CELL_WIDTH, LOCALE_PL } from '@helpers/constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Drawer = createDrawerNavigator()
const width = Dimensions.get('window').width - HOUR_CELL_WIDTH
const currentMonth = dayjs().locale(LOCALE_PL).format(DATE_FORMAT_FULL_MONTH_WITH_YEAR)
const { day, fullWeek, withoutWeekends } = CALENDAR_ENUM

export const CalendarDrawerNavigator = () => {
  const calendarRef = useRef<CalendarKitHandle>(null)
  const [displayedCalendarMonth, setDisplayedCalendarMonth] = useState<string>(currentMonth)

  const handleMonthChange = (date: string) => {
    setDisplayedCalendarMonth(date)
  }

  const navigateToToday = () => {
    calendarRef.current?.goToDate({
      date: dayjs().format(DATE_FORMAT_YYYY_MM_DD),
    })
    handleMonthChange(currentMonth)
  }

  return (
    <Drawer.Navigator
      initialRouteName='Calendar'
      screenOptions={() => ({
        headerTitle: () => <Topbar onPress={navigateToToday} date={today} displayedCalendarMonth={displayedCalendarMonth} />,
        drawerType: 'front',
        headerRightContainerStyle: styles.headerRightContainer,
        headerTintColor: '#333',
        drawerActiveBackgroundColor: 'rgba(0, 0, 0, 0.1)',
        drawerActiveTintColor: '#333',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        headerTitleContainerStyle: styles.headerTitleContainer,
        headerLeftContainerStyle: styles.headerLeftContainer,
      })}
    >
      <Drawer.Screen
        name={i18next.t('calendar.fullWeek')}
        options={{
          drawerIcon: () => <Icon name='calendar-week' size={24} />,
        }}
      >
        {() => <Calendar ref={calendarRef} params={{ mode: fullWeek, onMonthChange: handleMonthChange }} />}
      </Drawer.Screen>

      <Drawer.Screen
        name={i18next.t('calendar.withoutWeekends')}
        options={{
          drawerIcon: () => <Icon name='calendar-range' size={24} />,
        }}
      >
        {() => <Calendar ref={calendarRef} params={{ mode: withoutWeekends, onMonthChange: handleMonthChange }} />}
      </Drawer.Screen>
      <Drawer.Screen
        name={i18next.t('calendar.dailyCalendar')}
        options={{
          drawerIcon: () => <Icon name='calendar' size={24} />,
        }}
      >
        {() => <Calendar ref={calendarRef} params={{ mode: day, onMonthChange: handleMonthChange }} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  headerRightContainer: {
    backgroundColor: 'red',
  },
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
  },
})

export default CalendarDrawerNavigator
