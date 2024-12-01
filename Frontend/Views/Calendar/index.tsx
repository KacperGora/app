import React, { useRef, useState, forwardRef, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import 'intl-pluralrules'

import {
  CalendarContainer,
  CalendarHeader,
  CalendarBody,
  CalendarKitHandle,
  OnCreateEventResponse,
  ResourceItem,
  OnEventResponse,
  EventItem,
  PackedEvent,
} from '@howljs/calendar-kit'

import api from '@helpers/api'
import { DATE_FORMAT_FULL_MONTH_WITH_YEAR } from '@helpers/constants'
import { colors } from 'theme/theme'
import { CALENDAR_ENUM, calendarContainerConfig, eventEmptyState } from './utils'
import { EventForm } from '../../types/calendarTypes'

import CreateEventForm from '@modules/Calendar/CreateEventForm'
import BottomSheetFormWrapper from '@components/BottomSheetFormWrapper'

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
    title: `${event.service}`,
    start: { dateTime: event.startTime },
    end: { dateTime: event.endTime },
    color: '#4285F4',
  }))

  return parseEvents
}

const Calendar = forwardRef<CalendarKitHandle, CalendarRouteProp>(({ params }, ref) => {
  const { mode } = useMemo(() => params, [params])
  const { data, isLoading, refetch, dataUpdatedAt } = useQuery<EventItem[]>({
    queryKey: ['events'],
    queryFn: fetchList,
    enabled: true,
  })

  const bottomSheetRef = useRef<BottomSheet>(null)
  const [eventForm, setEventForm] = useState<EventForm>(eventEmptyState)

  const handleEventChange = (event: OnCreateEventResponse) => {
    const {
      start: { dateTime: start },
      end: { dateTime: end },
    } = event
    setEventForm((prev) => ({
      ...prev,
      start,
      end,
    }))
    bottomSheetRef.current?.expand()
  }

  const onDragEventEnd = (event: OnEventResponse) => {
    const { start, end, id } = event
    const eventToUpdate = data?.find(({ id: eventId }) => eventId === id) as EventItem

    if (!eventToUpdate) return
    setEventForm((prev) => ({
      ...prev,
      ...eventToUpdate,
      clientId: eventToUpdate.clientId,
      service: eventToUpdate.service,
      start: start.dateTime || '',
      end: end.dateTime || '',
      notes: eventToUpdate.notes,
    }))

    bottomSheetRef.current?.expand()
  }
  const handleDateChange = (date: string) => {
    const { onMonthChange } = params
    onMonthChange(dayjs(date).locale('pl').format(DATE_FORMAT_FULL_MONTH_WITH_YEAR))
  }

  const refetchOnDemand = async () => {
    await refetch()
    bottomSheetRef.current?.close()
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.wrapper}>
        <CalendarContainer
          ref={ref}
          allowDragToEdit
          events={data}
          firstDay={0}
          hideWeekDays={mode === withoutWeekends ? [5, 6] : []}
          numberOfDays={mode}
          // isLoading={isLoading}
          onDateChanged={handleDateChange}
          onDragEventEnd={onDragEventEnd}
          onDragCreateEventEnd={handleEventChange}
          onDragCreateEventStart={(e) => console.log(e)}
          onRefresh={fetchList}
          overlapType='no-overlap'
          {...calendarContainerConfig}
        >
          <CalendarHeader />
          <CalendarBody
            showNowIndicator
            renderEvent={(event: PackedEvent) => (
              <View>
                <Text>{event.title}</Text>
              </View>
            )}
          />
        </CalendarContainer>
      </View>

      <BottomSheetFormWrapper ref={bottomSheetRef}>
        <CreateEventForm onEventCreateRequest={refetchOnDemand} initialState={eventForm} />
      </BottomSheetFormWrapper>
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
