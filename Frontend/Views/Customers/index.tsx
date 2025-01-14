import React, { useState, useRef, useEffect } from 'react'
import { TouchableOpacity, View, Keyboard } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ToggleButton } from 'react-native-paper'
import BottomSheet from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import CustomerList, { Customer } from '@modules/Customers/CustomerList'
import CustomerDetail from '@modules/Customers/CustomerDetail'
import Statistics from '@modules/Customers/Statistics'
import CustomerForm from '@modules/Customers/CustomerForm'
import BottomSheetFormWrapper from '@components/BottomSheetFormWrapper'
import { colors } from '../../theme/theme'
import api from '../../helpers/api'
import { drawerScreenOptions } from './utils'
import { apiRoutes } from '@helpers/apiRoutes'

type ToggleEnum = 'day' | 'week' | 'month'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const HeaderRight = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name='plus' size={24} color={colors.textPrimary} style={{ marginRight: 15 }} />
  </TouchableOpacity>
)

const CustomerListWithDrawer = () => {
  const { t } = useTranslation()

  const [toggle, setToggle] = useState<ToggleEnum>('day')
  const bottomSheetRef = useRef<BottomSheet | null>(null)

  const { data: clients = [], refetch } = useQuery<Customer[]>({
    queryKey: ['clientList'],
    queryFn: async () => {
      const { data } = await api.get(apiRoutes.getClientList)
      return data
    },
  })

  const handleFormToggle = () => {
    Keyboard.dismiss()
    bottomSheetRef.current?.expand()
  }

  const handleFormClose = async () => {
    Keyboard.dismiss()
    bottomSheetRef.current?.close()
    await refetch()
  }

  return (
    <>
      <Drawer.Navigator initialRouteName='CustomerListDrawer' screenOptions={{ ...drawerScreenOptions, drawerType: 'front' }}>
        <Drawer.Screen
          name='CustomerListDrawer'
          options={{
            title: t('navigation.clientsBase'),
            headerRight: () => <HeaderRight onPress={handleFormToggle} />,
          }}
        >
          {() => <CustomerList clients={clients} />}
        </Drawer.Screen>
        <Drawer.Screen
          name='CustomerDetailDrawer'
          options={{
            title: t('navigation.statistics'),
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 24 }}>
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
            ),
          }}
        >
          {() => <Statistics toggle={toggle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
      <BottomSheetFormWrapper ref={bottomSheetRef}>
        <CustomerForm onSubmit={handleFormClose} />
      </BottomSheetFormWrapper>
    </>
  )
}

const Customers = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator>
      <Stack.Screen name='CustomerList' component={CustomerListWithDrawer} options={{ headerShown: false }} />
      <Stack.Screen
        name='CustomerDetail'
        component={CustomerDetail}
        options={{
          title: t('navigation.clientDetails'),
          headerTintColor: 'black',
          headerBackTitle: 'Wróć',
        }}
      />
    </Stack.Navigator>
  )
}

export default Customers
