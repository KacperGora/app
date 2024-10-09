import dayjs from 'dayjs'
import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, SafeAreaView } from 'react-native'
import { DEFAULT_DATE_FORMAT } from '../../../helpers/constants'

const CustomerList: React.FC<any> = ({ navigation }) => {
  const [customers, setCustomers] = useState([
    { id: '1', name: 'Jan Kowalski', phone: '123456789', lastVisit: '2024-09-01' },
    { id: '2', name: 'Anna Nowak', phone: '987654321', lastVisit: '2024-09-10' },
    { id: '3', name: 'Anna Nowak', phone: '987654321', lastVisit: '2024-09-10' },
    { id: '4', name: 'Anna ', phone: '987654321', lastVisit: '2024-09-10' },
  ])

  const handlePress = (customer: any) => {
    navigation.navigate('CustomerDetail', { customer })
  }
  const addCustomer = (newCustomer: any) => {
    setCustomers((prev) => [...prev, { id: Date.now().toString(), ...newCustomer, lastVisit: new Date().toISOString().split('T')[0] }])
  }
  return (
    <SafeAreaView>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.phone}</Text>
              <Text>{`Ostatnia wizyta: ${dayjs(item.lastVisit).locale('pl').format(DEFAULT_DATE_FORMAT)}`}</Text>
              <Text>{`Ostatnia wizyta: ${item.lastVisit}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button title='Dodaj Klienta' onPress={() => navigation.navigate('CustomerForm', { onSubmit: addCustomer })} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
  },
})

export default CustomerList
