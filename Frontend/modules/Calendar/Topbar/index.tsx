import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { generateWeekNames } from './utils'
import dayjs from 'dayjs'

const Topbar = () => {
  const weekNames = generateWeekNames
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('week'))

  const handleSwipe = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationX > 0) {
        setCurrentWeek(currentWeek.subtract(1, 'week'))
      } else {
        setCurrentWeek(currentWeek.add(1, 'week'))
      }
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text>{dayjs().get('months').toString()}</Text>
      </View>
      <PanGestureHandler onHandlerStateChange={handleSwipe}>
        <View style={styles.topBar}>
          {weekNames.map((day, index) => (
            <View key={index} style={styles.dayWrapper}>
              <View>
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
              <Text style={styles.dayNumber}>{currentWeek.add(index, 'day').format('DD')}</Text>
            </View>
          ))}
        </View>
      </PanGestureHandler>
    </SafeAreaView>
  )
}

export default Topbar

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginLeft: 50,
  },
  dayLabel: {
    fontSize: 12,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  dayWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
  },
})
