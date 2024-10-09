import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CustomerDetail: React.FC<any> = ({ route }) => {
  const { customer } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{customer.name}</Text>
      <Text>{`Telefon: ${customer.phone}`}</Text>
      <Text>{`Ostatnia wizyta: ${customer.lastVisit} - nazwa usługi`}</Text>
      <Text>{`Następna wizyta: ${customer.lastVisit} - nazwa usługi`}</Text>
      <Text>{`Dodatkowe informacje: lasda[pwdk akmdl mawld joawd amsdnlkakw diaowjoid axdmnaw dawdi oa]`}</Text>
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
