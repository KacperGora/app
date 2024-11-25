import React, { useState, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomerList from '@modules/Customers/CustomerList'
import CustomerDetail from '@modules/Customers/CustomerDetail'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity, View, StyleSheet, Keyboard } from 'react-native'
import Statistics from '@modules/Customers/Statistics'
import { colors } from '../../theme/theme'
import BottomSheet from '@gorhom/bottom-sheet'
import CustomerForm from '@modules/Customers/CustomerForm'
import { ToggleButton } from 'react-native-paper'
import BottomSheetFormWrapper from '@components/BottomSheetFormWrapper'

type ToggleEnum = 'day' | 'week' | 'month'

export type ToggleType = {
  toggle: ToggleEnum
}
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const CustomerListWithDrawer = () => {
  const [toggle, setToggle] = useState<ToggleEnum>('day')

  const bottomSheetRef = useRef<BottomSheet>(null)

  const onFormToggle = () => {
    bottomSheetRef.current?.expand()
    Keyboard.dismiss()
  }

  const onFormClose = () => {
    bottomSheetRef.current?.close()
    Keyboard.dismiss()
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

      <BottomSheetFormWrapper ref={bottomSheetRef}>
        <CustomerForm onSubmit={onFormClose} />
      </BottomSheetFormWrapper>
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

export default Customers
