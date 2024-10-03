import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const generateHours = () => {
  const hours = []
  for (let i = 0; i < 24; i++) {
    hours.push(`${i < 10 ? `0${i}` : i}:00`)
    hours.push(`${i < 10 ? `0${i}` : i}:30`)
  }
  return hours
}

const WeekGrid = () => {
  const hours = generateHours()

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {daysOfWeek.map((day, dayIndex) => (
          <View key={dayIndex} style={styles.dayColumn}>
            {hours.map((hour, hourIndex) => (
              <View key={hourIndex} style={styles.cell} />
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dayColumn: {
    flex: 1,
  },
  cell: {
    height: 40,
    borderWidth: 0.5,
    borderColor: 'lightgray',
  },
})

export default WeekGrid
