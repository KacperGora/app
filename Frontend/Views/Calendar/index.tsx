import React, { useCallback, useRef, useState, useEffect, forwardRef, useMemo } from 'react'
import 'intl-pluralrules'
import { View, StyleSheet, Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  CalendarContainer,
  CalendarHeader,
  CalendarBody,
  CalendarKitHandle,
  OnCreateEventResponse,
  ResourceItem,
  HeaderItemProps,
  parseDateTime,
  ResourceHeaderItem,
} from '@howljs/calendar-kit'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import { useModal } from '@helpers/hooks'
import api from '@helpers/api'
import { DATE_FORMAT_FULL_MONTH_WITH_YEAR } from '@helpers/constants'
import CreateEventForm from '@modules/Calendar/CreateEventForm'
import { CALENDAR_ENUM, calendarContainerConfig, handleChange } from './utils'
import { useQuery } from '@tanstack/react-query'
import { colors } from 'theme/theme'
import { Ionicons } from '@expo/vector-icons'
import BottomSheetFormWrapper from '@components/BottomSheetFormWrapper'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface EventForm {
  start: string
  end: string
  service: string
  notes: string
  clientId: string
}

const { withoutWeekends } = CALENDAR_ENUM

const resources: ResourceItem[] = [
  { id: 'room1', title: 'Justyna Góra' },
  { id: 'room2', title: 'Kacper Góra' },
  { id: 'room3', title: 'Blanka Góra' },
]

const events = [
  {
    id: '1',
    title: 'Team Meeting',
    start: { dateTime: '2024-10-31T14:00:00Z' },
    end: { dateTime: '2024-10-31T15:30:00Z' },
    color: colors.primary,
    resourceId: 'room1',
  },
  {
    id: '2',
    title: 'Client Presentation',
    start: { dateTime: '2024-10-31T14:00:00Z' },
    end: { dateTime: '2024-10-31T15:30:00Z' },
    resourceId: 'room2',
    color: colors.primary,
  },
  // ... more events
]
export type CalendarRouteProp = {
  params: {
    mode: number
    onMonthChange: (date: string) => void
  }
}
const fetchList = async () => {
  const { data } = await api.get('event/getEvents')
  const parseEvents = data.map((event: any) => ({
    ...event,
    title: `${event.service} - ${event.clientName}`,
    start: { dateTime: event.startTime },
    end: { dateTime: event.endTime },
    color: '#4285F4',
  }))

  return parseEvents
}

const Calendar = forwardRef<CalendarKitHandle, CalendarRouteProp>(({ params }, ref) => {
  const { mode } = useMemo(() => params, [params])

  const { data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchList,
    enabled: true,
  })
  const bottomSheetRef = useRef<BottomSheet>(null)
  // const [events, setEvents] = useState<any[]>([])
  const [eventForm, setEventForm] = useState<EventForm>({
    start: '',
    end: '',
    service: '',
    clientId: '',
    notes: '',
  })

  const renderResource = useCallback((props: ResourceItem) => {
    return (
      <View style={styles.resourceContainer}>
        <Text>{props.title.charAt(0)}</Text>
        <Text>{props.title}</Text>
      </View>
    )
  }, [])
  

  const renderResourceHeaderItem = useCallback(
    (item: HeaderItemProps) => {
      const start = parseDateTime(item.startUnix)
      const dateStr = dayjs(start).locale('pl').format('dddd, D MMMM')

      return (
        <ResourceHeaderItem
          startUnix={item.startUnix}
          resources={item.extra.resources}
          dateFormat='dddd, D MMMM'
          renderResource={renderResource}
          DateComponent={
            <View style={styles.dateContainer}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' }}>{dateStr}</Text>
            </View>
          }
        />
      )
    },
    [renderResource],
  )
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
    bottomSheetRef.current?.expand()
  }

  const handleDateChange = (date: string) => {
    const { onMonthChange } = params
    onMonthChange(dayjs(date).locale('pl').format(DATE_FORMAT_FULL_MONTH_WITH_YEAR))
  }

  const handleDragCreateEventEnd = (event: OnCreateEventResponse) => {
    handleEventChange(event)
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.wrapper}>
        <CalendarContainer
          ref={ref}
          allowDragToEdit
          // resources={resources}
          events={data}
          scrollByDay={false}
          firstDay={0}
          hideWeekDays={mode === withoutWeekends ? [5, 6] : []}
          numberOfDays={mode}
          
          // isLoading={isLoading}
          onDateChanged={handleDateChange}
          onDragCreateEventEnd={handleDragCreateEventEnd}
          onRefresh={fetchList}
          overlapType='no-overlap'
          {...calendarContainerConfig}
        >
          <CalendarHeader
          // dayBarHeight={100}
          // renderHeaderItem={renderResourceHeaderItem}
          />
          <CalendarBody showNowIndicator />
        </CalendarContainer>
      </View>

      {
        <BottomSheetFormWrapper ref={bottomSheetRef}>
          <CreateEventForm onEventCreateRequest={fetchList} initialState={eventForm} />
        </BottomSheetFormWrapper>
      }
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
  resourceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  dateContainer: {
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
})

export default Calendar
