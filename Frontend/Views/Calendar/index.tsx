import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';


import BottomSheet from '@gorhom/bottom-sheet';
import { api, DATE_FORMAT_FULL_MONTH_WITH_YEAR } from '@helpers';
import {
  CalendarBody,
  CalendarContainer,
  CalendarHeader,
  CalendarKitHandle,
  EventItem,
  OnCreateEventResponse,
  OnEventResponse,
} from '@howljs/calendar-kit';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { beautyTheme } from '@theme';
import { EventForm } from '@types';
import dayjs from 'dayjs';
import 'intl-pluralrules';

import { CALENDAR_ENUM, calendarContainerConfig, eventEmptyState } from './utils';

const { withoutWeekends } = CALENDAR_ENUM;

export type CalendarRouteProp = {
  params: {
    mode: number;
    onMonthChange: (date: string) => void;
  };
  onFormToggle: (dateSelected: any) => void;
  currentBottomSheetIndex?: number;
};

const fetchList = async () => {
  console.log('req');
  const { data } = await api.get('event/getEvents');
  const parseEvents = data.map((event: any) => {
    return {
      ...event,
      id: Math.random().toString(),
      title: event.client,
      start: { dateTime: event.startTime },
      end: { dateTime: event.endTime },
      color: beautyTheme.colors.inversePrimary,
    };
  });

  return parseEvents;
};
const Calendar = forwardRef<CalendarKitHandle, CalendarRouteProp>(
  ({ params, onFormToggle, currentBottomSheetIndex }, ref) => {
    const { mode } = useMemo(() => params, [params]);
    const navigation = useNavigation();

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
      onFormToggle({ start, end });
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
      // onFormToggle({ start: start.dateTime, end: end.dateTime });
    };

    const handleDateChange = (date: string) => {
      const { onMonthChange } = params;
      onMonthChange(dayjs(date).locale('pl').format(DATE_FORMAT_FULL_MONTH_WITH_YEAR));
    };
    useEffect(() => {
      const unsubscribe = navigation.addListener('state', () => {
        refetch();
        onFormToggle({});
        bottomSheetRef.current?.close();
      });

      return unsubscribe;
    }, [dataUpdatedAt, refetch, navigation]);

    return (
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
        allowDragToCreate={!Boolean(currentBottomSheetIndex)}
        {...calendarContainerConfig}
      >
        <CalendarHeader />
        <CalendarBody showNowIndicator />
      </CalendarContainer>
    );
  },
);

export default Calendar;
