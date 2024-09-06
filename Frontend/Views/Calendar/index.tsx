import React, { useContext, useEffect, useState } from 'react'
import 'intl-pluralrules'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Appbar, Button, Card } from 'react-native-paper'
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler'
import Topbar from '../../modules/Calendar/Topbar'
import api from '../../helpers/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext, AuthContextType } from '../../context/AuthContext'
import Timeline from '../../modules/Calendar/Timeline'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date())

  const handleSwipe = (event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationX > 0) {
        setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)))
      } else {
        setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)))
      }
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Topbar />
      <Timeline />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeline: {
    flexDirection: 'row',
    flex: 1,
  },
  hourList: {
    width: 60,
  },
  hourCell: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dayColumns: {
    flex: 1,
  },
  dayColumn: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
})

export default Calendar
