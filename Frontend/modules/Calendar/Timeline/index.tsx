import React, { useMemo, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Card, Text, Avatar } from 'react-native-paper'

interface TimelineEvent {
  id: number
  title: string
  description: string
  time: string
  icon: string
}

const initialEvents: TimelineEvent[] = [
  {
    id: 1,
    title: 'Event 1',
    description: 'Description for event 1',
    time: '10:00 AM',
    icon: 'calendar',
  },
  {
    id: 2,
    title: 'Event 2',
    description: 'Description for event 2',
    time: '11:00 AM',
    icon: 'calendar',
  },
]

const generateHours = () => {
  const hours = []
  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`
    hours.push(`${hour}:00`)
    hours.push(`${hour}:30`)
  }
  return hours
}

const Timeline = () => {
  const hours = useMemo(() => generateHours(), [])

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.eventsContainer}>
          {hours.map((hour) => (
            <View key={hour} style={styles.timelineContainer}>
              <Text style={styles.hourText}>{hour}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingLeft: 12,
  },
  eventsContainer: {
    width: 50,
    borderRightColor: '#d9d9d975',
    borderRightWidth: 1,
  },
  timelineContainer: {
    flexDirection: 'row',
  },

  hourText: {
    height: 60,
    lineHeight: 40,
    color: 'gray',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
  },
})

export default Timeline
