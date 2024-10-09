import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

const CustomerForm: React.FC<any> = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = () => {
    onSubmit({ name, phone })
    setName('')
    setPhone('')
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Imię i nazwisko' value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder='Numer telefonu' value={phone} onChangeText={setPhone} />
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
