export const fromIntervalToMinutes = (interval: { hours?: number; minutes: number }) => {
  const { hours = 0, minutes = 0 } = interval
  return hours * 60 + minutes
}
