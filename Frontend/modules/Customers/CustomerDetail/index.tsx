import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../../helpers/api'
import { useQuery } from '@tanstack/react-query'
import { Customer } from '../CustomerList'

// const handleDelete = async (customer: any) => {
//   if (!customer) return
//   try {
//     await api.post('/client/delete', { clientId: customer.id })
//     Alert.alert('Success', 'Customer deleted successfully')
//   } catch (error) {
//     Alert.alert('Error', 'Error deleting customer')
//   }
// }
export type CustomerDetailProps = {
  route?: {
    params: {
      customer: Customer
    }
  }
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ route = { params: { customer: {} as Customer } } }) => {
  const { customer } = route?.params || {}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{customer.name}</Text>
      </View>
      {/* <Icon name='delete' size={30} color='red' onPress={() => handleDelete(customer)} /> */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{`Telefon: ${customer.phoneNumber}`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
})

export default CustomerDetail
