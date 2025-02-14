import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { BottomSheetFormWrapper } from '@components';
import BottomSheet from '@gorhom/bottom-sheet';
import { api, DATE_FORMAT_FULL_MONTH_WITH_YEAR, useAuth } from '@helpers';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  CalendarKitHandle,
  EventItem,
  OnCreateEventResponse,
  OnEventResponse,
  PackedEvent,
} from '@howljs/calendar-kit';
import { CreateEventForm } from '@modules';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { EventForm } from '@types';
import dayjs from 'dayjs';
import 'intl-pluralrules';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import { CALENDAR_ENUM, calendarContainerConfig, customTheme, eventEmptyState } from './utils';

const { withoutWeekends } = CALENDAR_ENUM;

export type CalendarRouteProp = {
  params: {
    mode: number;
    onMonthChange: (date: string) => void;
  };
  onFormToggle: () => void;
};

const fetchList = async () => {
  const { data } = await api.get('event/getEvents');
  const parseEvents = data.map((event: any) => ({
    ...event,
    title: `${event.service}`,
    start: { dateTime: event.startTime },
    end: { dateTime: event.endTime },
    color: '#4285F4',
  }));

  return parseEvents;
};
const Calendar = forwardRef<CalendarKitHandle, CalendarRouteProp>(
  ({ params, onFormToggle }, ref) => {
    const { mode } = useMemo(() => params, [params]);
    const navigation = useNavigation();
    const { userId } = useAuth();

    const { data, isLoading, refetch, dataUpdatedAt } = useQuery<EventItem[]>({
      queryKey: ['events'],
      queryFn: fetchList,
      enabled: true,
    });

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [eventForm, setEventForm] = useState<EventForm>(eventEmptyState);

    const handleEventChange = (event: OnCreateEventResponse) => {
      const {
        start: { dateTime: start },
        end: { dateTime: end },
      } = event;
      setEventForm((prev) => ({
        ...prev,
        start,
        end,
      }));
      onFormToggle();
      bottomSheetRef.current?.expand();
    };

    const onDragEventEnd = (event: OnEventResponse) => {
      const { start, end, id } = event;
      const eventToUpdate = data?.find(({ id: eventId }) => eventId === id) as EventItem;

      if (!eventToUpdate) return;
      setEventForm((prev) => ({
        ...prev,
        ...eventToUpdate,
        clientId: eventToUpdate.clientId,
        service: eventToUpdate.service,
        start: start.dateTime || '',
        end: end.dateTime || '',
        notes: eventToUpdate.notes,
      }));
      onFormToggle();
      bottomSheetRef.current?.expand();
    };

    const handleDateChange = (date: string) => {
      const { onMonthChange } = params;
      onMonthChange(dayjs(date).locale('pl').format(DATE_FORMAT_FULL_MONTH_WITH_YEAR));
    };
    useEffect(() => {
      const unsubscribe = navigation.addListener('state', () => {
        refetch();
        onFormToggle();
        bottomSheetRef.current?.close();
      });

      return unsubscribe;
    }, [dataUpdatedAt, refetch, navigation]);

    return (
      <GestureHandlerRootView>
        <CalendarContainer
          ref={ref}
          allowDragToEdit
          events={data}
          hideWeekDays={mode === withoutWeekends ? [5, 6] : []}
          numberOfDays={mode}
          onDateChanged={handleDateChange}
          onDragEventEnd={onDragEventEnd}
          onDragCreateEventEnd={handleEventChange}
          onRefresh={fetchList}
          overlapType="no-overlap"
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
      </GestureHandlerRootView>
    );
  },
);

export default Calendar;
