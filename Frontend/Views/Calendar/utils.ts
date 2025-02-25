import React from 'react';

import { DATE_FORMAT_FULL_MONTH_WITH_YEAR } from '@helpers';
import { beautyTheme } from '@theme';
import { EventForm } from '@types';
import dayjs from 'dayjs';

export const handleChange = (
  date: string,
  setCurrentDisplayedDate: React.Dispatch<React.SetStateAction<string>>,
) => {
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
    weekDayShort: 'Nd_Pon_Wt_Śr_Czw_Pt_Sb_'.split('_'),
    more: 'więcej',
    meridiem: { ante: 'przed południem', post: 'po południu' },
  },
};

export const eventEmptyState: EventForm = {
  start: '',
  end: '',
  service: '',
  clientId: '',
  notes: '',
};
const {
  colors: {
    inverseOnSurface,
    primary,
    onSecondary,
    background,
    onSurface,
    outline,
    inverseSurface,
    secondary,
    onSecondaryContainer,
    secondaryContainer,
    tertiary,
    error,
    errorContainer,
    onErrorContainer,
  },
} = beautyTheme;

export const customTheme = {
  colors: {
    primary: primary,
    onPrimary: onSecondary,
    background: background,
    onBackground: onSurface,
    border: outline,
    text: '#333333',
    surface: onSecondary,
    onSurface: onSurface,
    primaryContainer: inverseOnSurface,
    onPrimaryContainer: inverseSurface,
    secondary: secondary,
    onSecondary: onSecondary,
    secondaryContainer: secondaryContainer,
    onSecondaryContainer: onSecondaryContainer,
    tertiary: tertiary,
    onTertiary: inverseSurface,
    error: error,
    onError: onSecondary,
    errorContainer: errorContainer,
    onErrorContainer: onErrorContainer,
    outline: outline,
    outlineVariant: '#D7C2CA',
    white: onSecondary,
    inverseSurface: inverseSurface,
    inverseOnSurface: inverseOnSurface,
    inversePrimary: '#F6B5C0',
    elevation: {
      level0: 'transparent',
      level1: inverseOnSurface,
      level2: '#EAD2D8',
      level3: '#E0C3CA',
      level4: '#D7B5BD',
      level5: primary,
    },
    surfaceDisabled: 'rgba(108, 74, 91, 0.12)',
    onSurfaceDisabled: 'rgba(108, 74, 91, 0.38)',
    backdrop: 'rgba(108, 74, 91, 0.2)',
  },
  textStyle: {
    fontFamily: 'Roboto',
  },
  hourTextStyle: {
    fontSize: 12,
    color: inverseSurface,
  },
  dayName: {
    fontSize: 14,
    color: '#666666',
  },
  dayNumber: {
    fontSize: 16,
    color: inverseSurface,
  },
  todayNumberContainer: {
    backgroundColor: primary,
  },
  todayNumber: {
    color: onSecondary,
  },
  eventContainerStyle: {
    borderRadius: 4,
    borderColor: outline,
    borderWidth: 1,
  },
  eventTitleStyle: {
    fontSize: 12,
    color: inverseSurface,
  },
};

export const calendarContainerConfig = {
  allowPinchToZoom: true,
  useHaptic: true,
  timeZone: 'Europe/Warsaw',
  locale: 'pl',
  initialLocales: plConfig,
  theme: customTheme,
};
