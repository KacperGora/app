import React, { useState, useRef, useMemo } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomerList from '../../modules/Customers/CustomerList'
import CustomerDetail from '../../modules/Customers/CustomerDetail'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Statistics from '../../modules/Customers/Statistics'
import { colors } from '../../theme/theme'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import CustomerForm from '../../modules/Customers/CustomerForm'
import { ToggleButton } from 'react-native-paper'
import { t } from 'i18next'

type ToggleEnum = 'day' | 'week' | 'month'

export type ToggleType = {
  toggle: ToggleEnum
}
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const CustomerListWithDrawer = () => {
  const [toggleForm, setToggleForm] = useState(false)
  const [toggle, setToggle] = useState<ToggleEnum>('day')

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['12%', '75%'], [])

  const onFormToggle = () => {
    setToggleForm(!toggleForm)
    if (!toggleForm) {
      bottomSheetRef.current?.expand()
    } else {
      bottomSheetRef.current?.close()
    }
  }

  return (
    <>
      <Drawer.Navigator
        initialRouteName='CustomerListDrawer'
        screenOptions={{
          headerTintColor: 'black',
          drawerActiveBackgroundColor: 'lightgray',
          drawerInactiveBackgroundColor: 'white',
          drawerType: 'front',
          drawerActiveTintColor: colors.textPrimary,
          drawerInactiveTintColor: 'darkgray',
        }}
      >
        <Drawer.Screen
          name='CustomerListDrawer'
          component={CustomerList}
          options={{
            title: 'Baza klientów',
            headerRight: () => (
              <TouchableOpacity onPress={onFormToggle}>
                <Icon name='plus' size={24} color='#000' style={{ marginRight: 15 }} />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name='CustomerDetailDrawer'
          options={{
            title: 'Statystyki',
            headerRight: () => {
              return (
                <View style={{ flexDirection: 'row', alignContent: 'center', marginRight: 24 }}>
                  <ToggleButton
                    icon='calendar-month'
                    value='month'
                    status={toggle === 'month' ? 'checked' : 'unchecked'}
                    onPress={() => setToggle('month')}
                  />
                  <ToggleButton
                    icon='calendar-today'
                    value='day'
                    status={toggle === 'day' ? 'checked' : 'unchecked'}
                    onPress={() => setToggle('day')}
                  />
                </View>
              )
            },
          }}
        >
          {() => <Statistics toggle={toggle} />}
        </Drawer.Screen>
      </Drawer.Navigator>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
        snapPoints={snapPoints}
        onChange={(index) => setToggleForm(index !== -1)}
        enablePanDownToClose
        backdropComponent={({ animatedIndex, style }) => toggleForm && <View style={[style, backdropStyle.backdrop]} />}
      >
        <BottomSheetView>
          <CustomerForm onSubmit={() => {}} />
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}

const Customers = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='CustomerList'
      component={CustomerListWithDrawer}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name='CustomerDetail' component={CustomerDetail} options={{ title: 'Szczegóły Klienta' }} />
  </Stack.Navigator>
)

export const backdropStyle = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Półprzezroczysty czarny kolor
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    
  },
})
export default Customers
