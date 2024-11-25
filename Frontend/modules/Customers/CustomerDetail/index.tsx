import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../../helpers/api'
import { useQuery } from '@tanstack/react-query'

const handleDelete = async (customer: any) => {
  if (!customer) return
  try {
    await api.post('/client/delete', { clientId: '1a2b3c4d5e6f7a8b9c0d1e2f' })
  } catch (error) {
    throw new Error('Error deleting client')
  }
}

const CustomerDetail: React.FC<any> = ({ route }) => {
  const { customer } = route.params
  // const { isLoading, status, error } = useQuery('deleteCustomer', handleDelete, { enabled: false })

  return (
    <View style={styles.container}>
      <Icon name='delete' size={30} color='red' onPress={() => handleDelete(customer)} />
      <Text style={styles.name}>{customer.name}</Text>
      <Text>{`Telefon: ${customer.phone}`}</Text>
      <Text>{`Ostatnia wizyta: ${customer.lastVisit} - nazwa usługi`}</Text>
      <Text>{`Następna wizyta: ${customer.lastVisit} - nazwa usługi`}</Text>
      <Text>{`Dodatkowe informacje: `}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F7CAC9',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})

export default CustomerDetail
