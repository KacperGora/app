import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import api from '../../../helpers/api'
interface Client {
  firstName: string
  lastName: string
  phoneNumber?: string
}

type Props = {
  onSubmit: (client: Client) => void
}

const CustomerForm: React.FC<Props> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('')

  const [phoneNumber, setPhoneNumber] = useState('')

  console.log('CustomerForm')
  const onClientSave = async (client: Client) => {
    try {
      await api.post('/client', client)
      // addCustomer(client)
    } catch (error) {
      console.log('Error while saving client:', error)
    }
  }
  const handleSubmit = () => {
    console.log('submit')
    // onSubmit({ firstName, lastName: '', phoneNumber })
    setFirstName('')
    setPhoneNumber('')
    onClientSave({ firstName, lastName: '', phoneNumber })
  }
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Imię i ' value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder='Numer telefonu' value={phoneNumber} onChangeText={setPhoneNumber} />
      <Button title='Zapisz' onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
})

export default CustomerForm
