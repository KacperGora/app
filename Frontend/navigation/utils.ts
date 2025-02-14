import { CALENDAR_ENUM } from '@views';

const { day, fullWeek, withoutWeekends } = CALENDAR_ENUM;

export const calendarDrawerScreenConfig = [
  {
    name: 'calendar.fullWeek',
    icon: 'calendar-week',
    mode: fullWeek,
  },
  {
    name: 'calendar.withoutWeekends',
    icon: 'calendar-range',
    mode: withoutWeekends,
  },
  {
    name: 'calendar.dailyCalendar',
    icon: 'calendar',
    mode: day,
  },
];
