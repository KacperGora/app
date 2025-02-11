import dayjs from 'dayjs';
import React from 'react';
import { DATE_FORMAT_FULL_MONTH_WITH_YEAR } from '@helpers';
import { EventForm } from '@types';

export const handleChange = (date: string, setCurrentDisplayedDate: React.Dispatch<React.SetStateAction<string>>) => {
  setCurrentDisplayedDate(dayjs(date).locale('pl').format('MMMM YY'));
};

export const currentMonth = dayjs().locale('pl').format(DATE_FORMAT_FULL_MONTH_WITH_YEAR);
export const today = dayjs().format('DD');

export const CALENDAR_ENUM = {
  day: 1,
  fullWeek: 7,
  withoutWeekends: 5,
};

export const plConfig = {
  pl: {
    weekDayShort: 'Pon_Wt_Śr_Czw_Pt_Sb_Nd_'.split('_'),
    more: 'więcej',
    meridiem: { ante: 'przed południem', post: 'po południu' },
  },
};

export const calendarContainerConfig = {
  allowPinchToZoom: true,
  useHaptic: true,
  timeZone: 'Europe/Warsaw',
  locale: 'pl',
  initialLocales: plConfig,
  theme: {
    borderColor: 'red',
    todayNumberContainer: {
      backgroundColor: 'black',
      colors: {
        todayNumber: 'white',
      },
    },
    colors: {
      primary: 'rgba(0, 0, 0, 0.15)',
    },
    nowIndicatorColor: '#FF0000',
    headerContainer: {
      backgroundColor: '#f5f5f5',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      borderBottomWidth: 2,
      borderBottomColor: '#ddd',
    },
  },
  allowDragToCreate: true,
};

export const eventEmptyState: EventForm = {
  start: '',
  end: '',
  service: '',
  clientId: '',
  notes: '',
};
