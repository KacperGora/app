import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TextBase } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import api from '../../../helpers/api'
import { useTranslation } from 'react-i18next'
import { colors } from '../../../theme/theme'
import TextInputWithCounter from '../../../components/TextInputWithCounter'

interface Client {
  name: string
  lastName: string
  phoneNumber?: string
  notes?: string
}

type Props = {
  onSubmit: () => void
}

const CustomerForm: React.FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation()
  console.log('CustomerForm')
  const [clientForm, setClientForm] = useState<Client>({ name: '', lastName: '', phoneNumber: '', notes: '' })

  const handleChange = (key: string) => (value: string) => {
    setClientForm({ ...clientForm, [key]: value })
  }

  const onClientSave = async (client: Client) => {
    try {
      await api.post('/client/addClient', client)
    } catch (error) {
      console.log('Error while saving client:', error)
    }
  }

  const handleSubmit = () => {
    const { name: firstName, lastName, phoneNumber } = clientForm
    onClientSave({ name: firstName, lastName, phoneNumber })
    onSubmit()
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('client.addCustomer')}</Text>
      <View style={styles.formWrapper}>
        <TextInput
          mode='outlined'
          style={styles.input}
          placeholder={t('form.name')}
          value={clientForm.name}
          onChangeText={handleChange('name')}
        />
        <TextInput
          style={styles.input}
          placeholder={t('form.lastName')}
          value={clientForm.lastName}
          onChangeText={handleChange('lastName')}
          mode='outlined'
        />
        <TextInput
          style={styles.input}
          placeholder={t('form.phone')}
          value={clientForm.phoneNumber}
          onChangeText={handleChange('phoneNumber')}
          keyboardType='phone-pad'
          mode='outlined'
        />
        <TextInputWithCounter
          maxLength={500}
          onChangeText={handleChange('notes')}
          placeholder='Notatki'
          value={clientForm.notes || ''}
          multiline
          style={[styles.textArea]}
        />

        <Button mode='elevated' onPress={handleSubmit} style={styles.button}>
          {t('form.save')}
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  formWrapper: {
    gap: 16,
  },
})

export default CustomerForm
