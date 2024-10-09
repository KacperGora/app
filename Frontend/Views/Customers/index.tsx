import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CustomerList from '../../modules/Customers/CustomerList'
import CustomerDetail from '../../modules/Customers/CustomerDetail'
import CustomerForm from '../../modules/Customers/CustomerForm'

const Stack = createStackNavigator()

const Customers = () => (
  <Stack.Navigator>
    <Stack.Screen name='CustomerList' component={CustomerList} options={{ title: 'Klienci', headerShown: false }} />
    <Stack.Screen name='CustomerDetail' component={CustomerDetail} options={{ title: 'Szczegóły Klienta' }} />
    <Stack.Screen name='CustomerForm' component={CustomerForm} options={{ title: 'Dodaj/Edycja Klienta' }} />
  </Stack.Navigator>
)

export default Customers
