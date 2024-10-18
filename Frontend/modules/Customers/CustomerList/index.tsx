import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, SafeAreaView } from 'react-native'
import { DEFAULT_DATE_FORMAT } from '../../../helpers/constants'
import CustomerDetailListRow, { Customer } from '../CustomerDetailListRow'
import { useModal } from '../../../helpers/hooks'
import BottomSheet from '../../../components/BottomSheet'
import CustomerForm from '../CustomerForm'

const CustomerList: React.FC<any> = ({ navigation }) => {
  const [openAddCustomerForm, toggleAddCustomerForm] = useModal()
  const [customers, setCustomers] = useState([
    { id: '1', name: 'Jan Kowalski', phone: '123456789', lastVisit: '2024-09-01' },
    { id: '2', name: 'Anna Nowak', phone: '987654321', lastVisit: '2024-09-10' },
    { id: '3', name: 'Anna Nowak', phone: '987654321', lastVisit: '2024-09-10' },
    { id: '4', name: 'Anna ', phone: '987654321', lastVisit: '2024-09-10' },
  ])

  const handleSwipeLeft = (customer: Customer) => {
    console.log('Przesunięto w lewo dla klienta:', customer.name)
  }

  const addCustomer = (newCustomer: any) => {
    setCustomers((prev) => [...prev, { id: Date.now().toString(), ...newCustomer, lastVisit: new Date().toISOString().split('T')[0] }])
  }

  const bottomSheetRef = React.useRef<{ openSheet: () => void; closeSheet: () => void }>(null)

  useEffect(() => {
    if (openAddCustomerForm) {
      bottomSheetRef.current?.openSheet()
    } else {
      bottomSheetRef.current?.closeSheet()
    }
  }, [openAddCustomerForm])

  return (
    <>
      <SafeAreaView>
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CustomerDetailListRow navigation={navigation} item={item} onSwipeLeft={handleSwipeLeft} />}
        />
        <Button title='Dodaj Klienta' onPress={toggleAddCustomerForm} />
      </SafeAreaView>
      {/* <BottomSheet ref={bottomSheetRef}> */}
        <CustomerForm />
      {/* </BottomSheet> */}
    </>
  )
}

export default CustomerList
