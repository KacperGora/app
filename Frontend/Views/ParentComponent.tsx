import React, { useRef } from 'react'
import { View, Button } from 'react-native'
import Calendar from './Calendar'
import { CalendarKitHandle } from '@howljs/calendar-kit'
import dayjs from 'dayjs'
import { DATE_FORMAT_YYYY_MM_DD } from '@helpers/constants'

const ParentComponent = () => {
  const calendarRef = useRef<CalendarKitHandle>(null)

  const navigateToToday = () => {
    calendarRef.current?.goToDate(dayjs().format(DATE_FORMAT_YYYY_MM_DD))
  }

  return (
    <View>
      <Button title="Go to Today" onPress={navigateToToday} />
      <Calendar ref={calendarRef} params={{ mode: 'week', onMonthChange: (date) => console.log(date) }} />
    </View>
  )
}

export default ParentComponent
