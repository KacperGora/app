import React, { useCallback, useRef, useState, useEffect, forwardRef, useMemo } from 'react'
import 'intl-pluralrules'
import { View, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { CalendarContainer, CalendarHeader, CalendarBody, CalendarKitHandle, OnCreateEventResponse } from '@howljs/calendar-kit'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import { useModal } from '@helpers/hooks'
import api from '@helpers/api'
import { DATE_FORMAT_FULL_MONTH_WITH_YEAR } from '@helpers/constants'
import CreateEventForm from '@modules/Calendar/CreateEventForm'
import { CALENDAR_ENUM, calendarContainerConfig, handleChange } from './utils'

export interface EventForm {
  start: string
  end: string
  service: string
  notes: string
  clientId: string
}

const { withoutWeekends } = CALENDAR_ENUM

export type CalendarRouteProp = {
  params: {
    mode: number
    onMonthChange: (date: string) => void
  }
}

const Calendar = forwardRef<CalendarKitHandle, CalendarRouteProp>(({ params }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [addEventModal, toggleEventModal] = useModal()
  const [events, setEvents] = useState<any[]>([])
  const [eventForm, setEventForm] = useState<EventForm>({
    start: '',
    end: '',
    service: '',
    clientId: '',
    notes: '',
  })
  const { mode } = useMemo(() => params, [params])
  const handleEventChange = (event: OnCreateEventResponse) => {
    const {
      start: { dateTime: start },
      end: { dateTime: end },
    } = event
    setEventForm((prev) => ({
      ...prev,
      start,
      end,
      service: 'Sukces',
    }))
    toggleEventModal()
  }

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      toggleEventModal()
    }
  }, [])

  const fetchList = async () => {
    try {
      const { data } = await api.get('event/getEvents')
      const parseEvents = data.map((event: any) => ({
        ...event,
        title: `${event.service} - ${event.clientName}`,
        start: { dateTime: event.start },
        end: { dateTime: event.end },
        color: '#4285F4',
      }))
      setEvents(parseEvents)
    } catch (error) {
      console.error('Error fetching events', error)
    }
  }

  const handleDateChange = (date: string) => {
    console.log('date', date);
    const { onMonthChange } = params
    onMonthChange(dayjs(date).locale('pl').format(DATE_FORMAT_FULL_MONTH_WITH_YEAR))
  }

  const handleDragCreateEventEnd = (event: OnCreateEventResponse) => {
    handleEventChange(event)
  }

  const handleRefresh = () => {
    fetchList()
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.wrapper}>
        <CalendarContainer
          ref={ref}
          events={events}
          scrollByDay={false}
          firstDay={0}
          hideWeekDays={mode === withoutWeekends ? [5, 6] : []}
          numberOfDays={mode}
          onDateChanged={handleDateChange}
          onDragCreateEventEnd={handleDragCreateEventEnd}
          onRefresh={handleRefresh}
          {...calendarContainerConfig}
        >
          <CalendarHeader />
          <CalendarBody showNowIndicator />
        </CalendarContainer>
      </View>
      {addEventModal && (
        <BottomSheet enablePanDownToClose ref={bottomSheetRef} onChange={handleSheetChanges} snapPoints={['80%']}>
          <BottomSheetView>
            <CreateEventForm onEventCreateRequest={fetchList} initialState={eventForm} />
          </BottomSheetView>
        </BottomSheet>
      )}
    </GestureHandlerRootView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
})

export default Calendar
