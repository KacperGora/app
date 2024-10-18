import React, { useContext, useEffect, useState } from 'react'
import 'intl-pluralrules'
import { View, StyleSheet, Text } from 'react-native'
import { GestureHandlerRootView, HandlerStateChangeEvent, PanGestureHandlerEventPayload, State } from 'react-native-gesture-handler'
import Topbar from '../../modules/Calendar/Topbar'
import SingleDayBarItem from '@howljs/calendar-kit'
import MonthConfig from '@howljs/calendar-kit'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useModal } from '../../helpers/hooks'
import ModalComponent from '../../components/Modal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../helpers/api'
import { AuthContext, AuthContextType } from '../../context/AuthContext'
import { colors } from '../../theme/theme'
import BottomSheet from '../../components/BottomSheet'

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const { userId } = useContext(AuthContext) as AuthContextType

  const [events, setEvents] = useState<any[]>([])
  const [addEventModal, toggleEventModal] = useModal()
  console.log(userId)
  const _onDragCreateEnd = async () => {
    const token = await AsyncStorage.getItem('token')
    try {
      const response = await api.post(
        'event/create',
        { title: 'new title', start: new Date(), end: new Date(), userId: userId, description: 'new description' },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      console.log(response)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await api.get(`event/getEvents/66da9a5c0e279d7297e322c4`)
        setEvents(response.data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    // fetchList()
  }, [])
  console.log(events)
  return (
    <>
      {addEventModal && <ModalComponent visible={addEventModal} toggleModal={toggleEventModal} />}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheet>
          <View>
            <Text>xds</Text>
          </View>
        </BottomSheet>
        {/* <SafeAreaView> */}
        <View style={styles.wrapper}>
          <Topbar />
          <SingleDayBarItem
            onPressDayNumber={toggleEventModal}
            locale={'pl'}
            onDragCreateEventEnd={_onDragCreateEnd}
            onPressBackground={toggleEventModal}
            allowDragToCreate
            events={events}
            spaceFromBottom={0}
            allowPinchToZoom
            useHaptic
            theme={{
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
            }}
          />
        </View>
        {/* </SafeAreaView> */}
      </GestureHandlerRootView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
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
